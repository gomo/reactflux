import Events from 'events';

export default class BaseStore extends Events.EventEmitter
{
  constructor(dispatcher, defaultState = {}) {
    super();
    this.dispatchToken = dispatcher.register((payload) => {
      if(!payload.handler){
        throw 'Missing event handler.';
      }

      if(this[payload.handler]){
        var ret = this[payload.handler].call(this, payload);
        // if return `false`, don't emit event.
        if(ret !== false){
          this.emit('change', payload.defer);
        } else {
          payload.defer.resolve();
        }

        //clear updated value
        this.updatedState = {};
      }
    });

    this.state = defaultState;
    this.updatedState = {};
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  setState(values){
    for(var key in values){
      this.updatedState[key] = values[key];
    }
  }

  getState(key){
    if(key === undefined){
      var ret = {};
      for(var key in this.state){
        if(this.updatedState.hasOwnProperty(key)){
          ret[key] = this.updatedState[key];
        } else {
          ret[key] = this.state[key];
        }
      }

      return ret;
    } else {
      if(this.updatedState.hasOwnProperty(key)){
        return this.updatedState[key];
      }

      return this.state[key];
    }
  }

  getInitialState(){
    var state = {};
    for(var key in this.state){
      state[key] = this.state[key];
    }
    return state;
  }

  bindUpdatedState(){
    for(var key in this.updatedState){
      this.state[key] = this.updatedState[key];
    }

    return this.updatedState;
  }
}