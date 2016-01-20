import React from 'react';
import ReactFlux from '../../../../';
import TodoListStore from '../stores/TodoList';
import TodoListActions from '../actions/TodoList';


export default class Todo extends ReactFlux.BaseComponent
{
  constructor(props) {
    super(props);
  }

  initStore(){
    return TodoListStore;
  }

  onClickDoneButton(e){
    TodoListActions.remove(e.target.getAttribute('data-id'));
  }

  render(){
    return (
      <ul className="list-group">
        {this.state.list.map((todoItem) => {
          return (
            <li className="list-group-item clearfix" key={todoItem.id}>
              {todoItem.title}
              <button data-id={todoItem.id} className="btn btn-warning btn-sm pull-right" onClick={(e) => this.onClickDoneButton(e)}>Done</button>
            </li>
          );
        })}
      </ul>
    );
  }
}
