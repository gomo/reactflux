'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Promise = require('./Promise');

var _Promise2 = _interopRequireDefault(_Promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Defer = function () {
  function Defer() {
    _classCallCheck(this, Defer);

    this.promise = new _Promise2.default();
  }

  _createClass(Defer, [{
    key: 'resolve',
    value: function resolve() {
      this.promise._resolve();
    }
  }], [{
    key: 'all',
    value: function all() {
      var defer = new Defer();
      var promises = [];
      for (var key in arguments) {
        promises.push(arguments[key]);
      }

      var remains = promises.length;
      promises.map(function (promise) {
        promise.then(function () {
          --remains;
          if (remains === 0) {
            defer.resolve();
          }
        });
      });

      return defer.promise;
    }
  }]);

  return Defer;
}();

exports.default = Defer;