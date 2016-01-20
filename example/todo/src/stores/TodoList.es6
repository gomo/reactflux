import Dispatcher from '../AppDispatcher';
import ReactFlux from '../../../../';

class TodoListStore extends ReactFlux.BaseStore
{
  constructor() {
    super(Dispatcher, {
      'list': []
    });
  }


  handleBindTodoList(payload){
    this.setState({'list': payload.data.list});
  }

  handleAddTodo(payload){
    var newList = [];
    newList.push(payload.data);
    this.getState('list').map((item) => {
      newList.push(item);
    });

    this.setState({'list': newList});
  }
}

export default new TodoListStore();