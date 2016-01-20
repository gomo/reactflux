var assert = require("assert");
var Defer = require('../lib/Defer').default;

describe('Defer', function(){
  it('simple', function(done){
    var var1 = 'pendding';
    function method1(){
      var defer = new Defer();

      setTimeout(function(){
        var1 = 'resolved';
        defer.resolve();
      }, 10);

      return defer.promise;
    }

    assert.equal('pendding', var1);
    method1().then(function(){
      assert.equal('resolved', var1);
      done();
    });
    assert.equal('pendding', var1);
  });

  it('all', function(done){
    var var1 = 'pendding';
    function method1(){
      var defer = new Defer();

      setTimeout(function(){
        var1 = 'resolved';
        defer.resolve();
      }, 10);

      return defer.promise;
    }

    var var2 = 'pendding';
    function method2(){
      var defer = new Defer();

      setTimeout(function(){
        var2 = 'resolved';
        defer.resolve();
      }, 100);

      return defer.promise;
    }

    assert.equal('pendding', var1);
    assert.equal('pendding', var2);
    var promise1 = method1();
    var promise2 = method2();

    assert.equal('pendding', var1);
    assert.equal('pendding', var2);
    promise1.then(function(){
      assert.equal('resolved', var1);
      assert.equal('pendding', var2);
    });

    Defer.all(promise1, promise2).then(function(){
      assert.equal('resolved', var1);
      assert.equal('resolved', var2);
      done();
    });
    assert.equal('pendding', var1);
    assert.equal('pendding', var2);
  });

  it('chain', function(done){
    var var1 = 'pendding';
    var var2 = 'pendding';
    assert.equal('pendding', var1);
    function method1(){
      var defer = new Defer();

      setTimeout(function(){
        var1 = 'resolved';
        defer.resolve();
      }, 10);

      return defer.promise;
    }

    method1()
      .then(function(){
        assert.equal('resolved', var1);
        assert.equal('pendding', var2);
      }).then(function(){
        var defer = new Defer();
        setTimeout(function(){
          var2 = 'resolved';
          defer.resolve();
        }, 500);

        return defer.promise;
      }).then(function(){
        assert.equal('resolved', var1);
        assert.equal('resolved', var2);
        done();
      });
  });
});

