import Events from 'events';

export default class BaseStore extends Events.EventEmitter
{
  constructor(dispatcher, initialState = {}) {
    super();
    this.dispatchToken = dispatcher.register((payload) => {
      if(!payload.handler){
        throw 'Missing event handler.';
      }

      if(this[payload.handler]){
        var ret = this[payload.handler].call(this, payload);

        // if return `false`, don't emit event.
        if(ret !== false){
          // if return promise, emit after resolve
          if(ret && typeof ret.then === "function"){
            payload.promises.push(ret);
            ret.then(() => {
              return new Promise(resolve => {
                this.fireChangeEvent(resolve);
              });
            });
          } else {
            payload.promises.push(new Promise(resolve => {
              this.fireChangeEvent(resolve);
            }));
          }
        } else {
          payload.promises.push(new Promise(resolve => {
            resolve();
          }));
        }

        //clear updated value
        this.updatedState = {};
      }
    });
    this.initialState = {};
    for(var key in initialState){
      this.initialState[key] = initialState[key];
    }
    this.state = initialState;
    this.updatedState = {};
  }

  fireChangeEvent(resolve){
    if(this.listenerCount('change')){
      this.emit('change', resolve)
    } else {
      resolve();
    }
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

  clearState(){
    this.setState(this.initialState);
  }

  getInitialState(){
    var state = {};
    for(var key in this.initialState){
      state[key] = this.initialState[key];
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
