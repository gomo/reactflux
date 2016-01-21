'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Defer = require('./Defer');

var _Defer2 = _interopRequireDefault(_Defer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = function () {
  function Promise() {
    _classCallCheck(this, Promise);

    this.callbacks = [];
    this.isResolved = false;
  }

  _createClass(Promise, [{
    key: 'then',
    value: function then(callback) {
      var defer = new _Defer2.default();

      var data = {
        callback: callback,
        defer: defer
      };

      this.callbacks.push(data);

      if (this.isResolved) {
        this._execute(data);
      }

      return defer.promise;
    }
  }, {
    key: '_resolve',
    value: function _resolve() {
      var _this = this;

      this.isResolved = true;
      this.callbacks.map(function (data) {
        _this._execute(data);
      });
    }
  }, {
    key: '_execute',
    value: function _execute(data) {
      setTimeout(function () {
        var res = data.callback();
        if (res instanceof Promise) {
          //for async
          res.then(function () {
            data.defer.resolve();
          });
        } else {
          //for sync
          data.defer.resolve();
        }
      }, 0);
    }
  }]);

  return Promise;
}();

exports.default = Promise;