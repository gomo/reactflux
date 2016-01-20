import Defer from './Defer';

export default class Promise
{
  constructor() {
    this.callbacks = [];
    this.isResolved = false;
  }

  then(callback) {
    var defer = new Defer();


    var data = {
      callback: callback,
      defer: defer
    };

    this.callbacks.push(data);

    if(this.isResolved){
      this._execute(data);
    }

    return defer.promise;
  }

  _resolve(){
    this.isResolved = true;
    this.callbacks.map((data) => {
      this._execute(data);
    });
  }

  _execute(data){
    setTimeout(() => {
      var res = data.callback();
      if(res instanceof Promise){
        //for async
        res.then(() => {
          data.defer.resolve()
        });
      } else {
        //for sync
        data.defer.resolve();
      }
    }, 0);
  }
}