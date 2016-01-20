import Dispatcher from '../AppDispatcher';
import ReactFlux from '../../../../';

class TodoStore extends ReactFlux.BaseStore
{
  constructor() {
    super(Dispatcher, {
      'loading': false,
      'missingTitle': false,
      'title': ''
    });
  }

  handleShowLoading(payload){
    this.setState({'loading': true});
  }

  handleHideLoading(payload){
    this.setState({'loading': false});
  }

  handleShowMissingTitleError(payload){
    this.setState({'missingTitle': true});
  }

  handleHideMissingTitleError(payload){
    this.setState({'missingTitle': false});
  }

  handleBindTodoTitle(payload){
    this.setState({'title': payload.data.title});
  }
}

export default new TodoStore();