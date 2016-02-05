import Defer from './Defer';

export default class BaseActions
{
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  dispatch(handler, data){
    if(handler === undefined){
      throw new Error('Missing handler. Check your constants');
    }
    var defer = new Defer();
    this.dispatcher.dispatch({
      handler: handler,
      data: data,
      defer: defer
    });

    return defer.promise;
  }
}
