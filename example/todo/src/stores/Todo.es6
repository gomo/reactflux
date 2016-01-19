import Dispatcher from '../AppDispatcher';
import ReactFlux from '../../../../';

class TodoStore extends ReactFlux.BaseStore
{
  constructor() {
    super(Dispatcher, {
      'list': []
    });
  }

  handleBindTodoList(payload){
    this.setState({'list': payload.data.list});
  }
}

export default new TodoStore();