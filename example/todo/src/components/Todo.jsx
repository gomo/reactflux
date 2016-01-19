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

  render(){
    return (
      <div>aaa</div>
    );
  }
}
