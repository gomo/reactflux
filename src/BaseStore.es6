import Events from 'events';

export default class BaseStore extends Events.EventEmitter
{
  constructor(dispatcher, defaultState = {}) {
    super();
    this.dispatchToken = dispatcher.register((payload) => {
      if(!payload.type){
        throw 'Missing event type.';
      }
      var methodName = 'handle' + payload.type;
      this[methodName] && this[methodName].call(this, payload);
    });

    this.state = defaultState;
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  getState(){
    var state = {};
    for(var key in this.state){
      state[key] = this.state[key];
    }
    return state;
  }
}