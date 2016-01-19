import React from 'react';
import ReactFlux from '../../../../';
import TodoStore from '../stores/Todo';
import TodoActions from '../actions/Todo';

export default class Todo extends ReactFlux.BaseComponent
{
  constructor(props) {
    super(props);
  }

  initStore(){
    return TodoStore;
  }

  componentDidMount(){
    TodoActions.loadData();
  }

  render(){
    return (
      <div className="panel panel-default">
        <div className="panel-heading"><i className="fa fa-list-ul"></i>&nbsp;TODO</div>
        <div className="panel-body">
          <div className="input-group">
            <input type="text" className="form-control" />
            <span className="input-group-btn">
              <button className="btn btn-primary" type="button">ADD</button>
            </span>
          </div>
        </div>
        <ul className="list-group">
          {this.state.list.map((todoItem) => {
            return <li className="list-group-item" key={todoItem.id}>{todoItem.title}</li>
          })}
        </ul>
      </div>
    );
  }
}
