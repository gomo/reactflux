import Dispatcher from '../AppDispatcher';
import ReactFlux from '../../../../';
import TodoConst from '../constants/TodoConstants';

class TodoActions extends ReactFlux.BaseActions
{
  constructor() {
    super(Dispatcher);
  }

  loadData(){
    $.ajax({
      'url': '/todo/list'
    }).done((data) => {
      this.dispatch(TodoConst.ActionTypes.BIND_TODO_LIST, data);
    });
  }
}

export default new TodoActions()