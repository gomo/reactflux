export default class BaseActions
{
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  dispatch(handler, data, callback){
    this.dispatcher.dispatch({
      handler: handler,
      data: data,
      callback: callback
    });
  }
}
