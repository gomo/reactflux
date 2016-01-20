import Promise from './Promise';

export default class Defer
{
  constructor() {
    this.promise = new Promise();
  }

  resolve(){
    this.promise._resolve();
  }

  static all(){
    var defer = new Defer();
    var promises = [];
    for(var key in arguments){
      promises.push(arguments[key]);
    }

    var remains = promises.length;
    promises.map((promise) => {
      promise.then(() => {
        --remains;
        if(remains === 0){
          defer.resolve()
        }
      });
    });


    return defer.promise;
  }
}