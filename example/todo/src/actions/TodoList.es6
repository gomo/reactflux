import Dispatcher from '../AppDispatcher';
import ReactFlux from '../../../../';
import TodoConst from '../constants/TodoConstants';

class TodoListActions extends ReactFlux.BaseActions
{
  constructor() {
    super(Dispatcher);
  }

  loadData(){
    this.dispatch(TodoConst.ActionTypes.SHOW_LOADING);
    $.ajax({
      'url': '/todo/list'
    }).done((data) => {
      this.dispatch(TodoConst.ActionTypes.BIND_TODO_LIST, data);
      this.dispatch(TodoConst.ActionTypes.HIDE_LOADING);
    });
  }

  add(title){
    if(!title){
      this.dispatch(TodoConst.ActionTypes.SHOW_MISSING_TITLE_ERROR);
    } else {
      this.dispatch(TodoConst.ActionTypes.HIDE_MISSING_TITLE_ERROR);
      this.dispatch(TodoConst.ActionTypes.SHOW_LOADING);
      $.ajax({
        url: '/todo/save',
        method: "POST",
        data: {
          'title': title,
          'status': 'ready'
        }
      }).done((data) => {
        this.dispatch(TodoConst.ActionTypes.ADD_TODO, data);
        this.dispatch(TodoConst.ActionTypes.BIND_TODO_TITLE, {title: ''});
        this.dispatch(TodoConst.ActionTypes.HIDE_LOADING);
      });
    }
  }
}

export default new TodoListActions()