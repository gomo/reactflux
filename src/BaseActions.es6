export default class BaseActions
{
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  dispatch(handler, data){
    if(handler === undefined){
      throw new Error('Missing handler. Check your constants');
    }

    const payload = {
      handler: handler,
      data: data,
      promises: []
    };

    this.dispatcher.dispatch(payload);

    return Promise.all(payload.promises);
  }
}
