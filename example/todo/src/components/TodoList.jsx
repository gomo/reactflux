import React from 'react';
import ReactFlux from '../../../../';
import TodoListStore from '../stores/TodoList';


export default class Todo extends ReactFlux.BaseComponent
{
  constructor(props) {
    super(props);
  }

  initStore(){
    return TodoListStore;
  }

  render(){
    return (
      <ul className="list-group">
        {this.state.list.map((todoItem) => {
          return <li className="list-group-item" key={todoItem.id}>{todoItem.title}</li>
        })}
      </ul>
    );
  }
}
