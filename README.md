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
import ReactFlux from 'reactflux';
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
import ReactFlux from 'reactflux';

class TodoStore extends ReactFlux.BaseStore
{
  constructor() {
    super(Dispatcher, {

    });
  }
```

Use [facebook flux](https://facebook.github.io/flux/) dispatcher for `../AppDispatcher.es6`.

You can get the initial state by `getInitialState` method, and reset to the initial state using `clearState` method.

```es6
import Flux from 'flux';

export default new Flux.Dispatcher();
```

### Actions

```es6
import Dispatcher from '../AppDispatcher';
import ReactFlux from 'reactflux';
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
      return new Promise(resolve => {
        $.ajax({url: '/ajax/update'}).done(() => {
          this.dispatch(TodoConst.ActionTypes.OPERATION_AJAX).then(() => resolve());
        });
      });
    })
    .then(() => this.dispatch(TodoConst.ActionTypes.OPERATION_3));
}
```

reactflux require global `Promise` object. If you want to use on browsers that lack the `Promise`, check out [the polyfill](https://github.com/stefanpenner/es6-promise#readme).

### Constants

For make constants object, use `ReactFlux.handlers()`.

```es6
import ReactFlux from 'reactflux';

export default{
  ActionTypes: ReactFlux.handlers([
    "BIND_TODO_TITLE"
  ])
};
```

This make object like this:

```json
{"BIND_TODO_TITLE": "handleBindTodoTitle"}
```

If you make `handleBindTodoTitle` method in a store class, the store handle this event.

```es6
import Dispatcher from '../AppDispatcher';
import ReactFlux from 'reactflux';

class TodoStore extends ReactFlux.BaseStore
{
  constructor() {
    super(Dispatcher, {
      'title': ''
    });
  }

  handleBindTodoTitle(payload){
    var title = payload.data.title;
    this.setState({'title', title});
  }
```

`handler...` method emit the state change event automatically. If you want cancel that, return `false`.
