import Defer from './Defer';

export default class BaseActions
{
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  dispatch(handler, data){
    var defer = new Defer();
    this.dispatcher.dispatch({
      handler: handler,
      data: data,
      defer: defer
    });

    return defer.promise;
  }
}
