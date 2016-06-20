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
      data: data
    };

    this.dispatcher.dispatch(payload);

    payload.promise.catch(err => console.log(err));

    return payload.promise;
  }
}
