import React from 'react';
import ReactFlux from '../../../../';
import TodoStore from '../stores/Todo';
import TodoActions from '../actions/Todo';
import TodoListActions from '../actions/TodoList';
import TodoList from './TodoList';
import classNames from 'classnames';


export default class Todo extends ReactFlux.BaseComponent
{
  constructor(props) {
    super(props);

    this.titleKeyDown = undefined;
  }

  initStore(){
    return TodoStore;
  }

  componentDidMount(){
    TodoListActions.loadData();
  }

  onClickAddTodo(e){
    TodoListActions.add(TodoStore.getState('title'));
  }

  onChangeTitle(e){
    TodoActions.updateTitle(e.target.value);
  }

  onKeyDownInTitle(e){
    //for checked japanese IME input
    this.titleKeyDown = e.keyCode;
  }

  onKeyUpInTitle(e){
    if(this.titleKeyDown == e.keyCode && e.keyCode == 13){//enter key
      TodoListActions.add(TodoStore.getState('title'));
    }
  }

  render(){
    var loadingClass = classNames({
      'loading': true,
      'pull-right': true,
      'hidden': !this.state.loading
    });

    var inputWrapperClass = classNames({
      'input-group': true,
      'has-error': this.state.missingTitle
    });

    return (
      <div className="panel panel-default">
        <div className="panel-heading"><i className="fa fa-list-ul"></i>&nbsp;TODO <span className={loadingClass}><img src="/loading.gif" /></span></div>
        <div className="panel-body">
          <div className={inputWrapperClass}>
            <input
            　type="text"
              className="form-control"
              value={this.state.title}
              onChange={(e) => this.onChangeTitle(e)}
              onKeyDown={(e) => this.onKeyDownInTitle(e)}
              onKeyUp={(e) => this.onKeyUpInTitle(e)} />
            <span className="input-group-btn">
              <button className="btn btn-primary" type="button" onClick={(e) => this.onClickAddTodo(e)}>ADD</button>
            </span>
          </div>
          {(() => this.state.missingTitle ? (<div className="error"><i className="fa fa-exclamation-triangle"></i>&nbsp; TODO title is required.</div>) : null)()}
        </div>
        <TodoList />
      </div>
    );
  }
}
