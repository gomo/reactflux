# reactflux

## What is reactflux

The base classes for Facebook [react](https://facebook.github.io/react/)/[flux](https://facebook.github.io/flux/).

## Install

```
npm install --save-dev reactflux
```

## How to use

Check [sample TODO application](example/todo).

### Component

You must implement `initStore` method.

```es6
import React from 'react';
import ReactFlux from '../../../../';
import TodoStore from '../stores/Todo';

export default class Todo extends ReactFlux.BaseComponent
{
  constructor(props) {
    super(props);
  }

  initStore(){
    return TodoStore;
  }
```

### Store

The second argument of constructor is inital state object.

```es6
import Dispatcher from '../AppDispatcher';
import ReactFlux from '../../../../';

class TodoStore extends ReactFlux.BaseStore
{
  constructor() {
    super(Dispatcher, {

    });
  }
```

Use [facebook flux](https://facebook.github.io/flux/) dispatcher for `../AppDispatcher.es6`.

```es6
import Flux from 'flux';

export default new Flux.Dispatcher();
```

### Actions

```es6
import Dispatcher from '../AppDispatcher';
import ReactFlux from '../../../../';
import TodoConst from '../constants/TodoConstants';

class TodoActions extends ReactFlux.BaseActions
{
  constructor() {
    super(Dispatcher);
  }

  updateTitle(value){
    this.dispatch(TodoConst.ActionTypes.BIND_TODO_TITLE, {title: value});
  }
}

export default new TodoActions()
```

`TodoActions.dispatch` return `Promise` object. You can chain store change events.

```es6
doSomething(){
  this.dispatch(TodoConst.ActionTypes.OPERATION_1)
    .then(() => this.dispatch(TodoConst.ActionTypes.OPERATION_2))
    .then(() => {
      var defer = new ReactFlux.Defer();
      $.ajax({url: '/ajax/update'}).done(() => {
        this.dispatch(TodoConst.ActionTypes.OPERATION_AJAX).then(() => {defer.resolve()});
      });
      return defer.promise;
    })
    .then(() => this.dispatch(TodoConst.ActionTypes.OPERATION_3));
}
```

### Constants

For make constants object, use `ReactFlux.handlers()`.

```es6
import ReactFlux from '../../../../';

export default{
  ActionTypes: ReactFlux.handlers([
    "BIND_TODO_TITLE"
  ])
};
```

This make object like this:

```json
{"BIND_TODO_TITLE": "handlerBindTodoTitle"}
```

`handlerBindTodoTitle` is handler method name in Store object.

```es6
import Dispatcher from '../AppDispatcher';
import ReactFlux from '../../../../';

class TodoStore extends ReactFlux.BaseStore
{
  constructor() {
    super(Dispatcher, {
      'title': ''
    });
  }

  handlerBindTodoTitle(payload){
    var title = payload.data.title;
    this.setState({'title', title});
  }
```

`handler...` method emit state change event automatically. If you want cancel emit, return `false`.

