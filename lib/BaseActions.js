'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseActions = function () {
  function BaseActions(dispatcher) {
    _classCallCheck(this, BaseActions);

    this.dispatcher = dispatcher;
  }

  _createClass(BaseActions, [{
    key: 'dispatch',
    value: function dispatch(handler, data) {
      if (handler === undefined) {
        throw new Error('Missing handler. Check your constants');
      }

      var payload = {
        handler: handler,
        data: data
      };

      this.dispatcher.dispatch(payload);

      payload.promise.catch(function (err) {
        return console.log(err);
      });

      return payload.promise;
    }
  }]);

  return BaseActions;
}();

exports.default = BaseActions;