export default class BaseActions
{
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  dispatch(handler, data){
    if(handler === undefined){
      throw new Error('Missing handler. Check your constants');
    }
    return new Promise((resolve, reject) => {
      this.dispatcher.dispatch({
        handler: handler,
        data: data,
        promise: {resolve: resolve, reject: reject}
      });
    });
  }
}
