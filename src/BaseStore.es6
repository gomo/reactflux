export default class BaseStore extends Events.EventEmitter
{
  constructor(dispatcher, defaultState = {}) {
    super();
    this.dispatchToken = dispatcher.register((payload) => {
      if(!payload.type){
        throw 'Missing event type.';
      }

      var methodName = 'handle' + payload.type;
      if(this[methodName]){
        var ret = this[methodName].call(this, payload);
        if(ret !== false){
          var foo = this.emit('change', payload.callback);
        }

        //handlerで処理が行われたらthis.updatedStateはクリアする
        //ハンドラー内でreturn falseした時もthis.updatedStateをクリアする
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

  getUpdatedState(){
    for(var key in this.updatedState){
      this.state[key] = this.updatedState[key];
    }
    var updated = this.updatedState;
    return updated;
  }
}