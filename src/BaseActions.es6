export default class BaseActions
{
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  dispatch(type, data, callback){
    var handler = "handle" + type.replace(/_?([^_]+)/g, (m, p1) => p1[0].toUpperCase() + p1.substr(1).toLowerCase());

    this.dispatcher.dispatch({
      handler: handler,
      data: data,
      callback: callback
    });
  }
}
