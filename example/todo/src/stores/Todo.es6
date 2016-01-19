import Dispatcher from '../AppDispatcher';
import ReactFlux from '../../../../';

class TodoStore extends ReactFlux.BaseStore
{
  constructor() {
    super(Dispatcher, {

    });
  }
}

export default new TodoStore();