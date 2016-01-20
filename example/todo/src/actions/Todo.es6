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