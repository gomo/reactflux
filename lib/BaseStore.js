'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseStore = function (_Events$EventEmitter) {
  _inherits(BaseStore, _Events$EventEmitter);

  function BaseStore(dispatcher) {
    var initialState = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, BaseStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseStore).call(this));

    _this.dispatchToken = dispatcher.register(function (payload) {
      if (!payload.handler) {
        throw 'Missing event handler.';
      }

      if (_this[payload.handler]) {
        var ret = _this[payload.handler].call(_this, payload);

        // if return `false`, don't emit event.
        if (ret !== false) {
          // if return promise, emit after resolve
          if (ret && typeof ret.then === "function") {
            payload.promises.push(ret);
            ret.then(function () {
              return new Promise(function (resolve) {
                _this.fireChangeEvent(resolve);
              });
            });
          } else {
            payload.promises.push(new Promise(function (resolve) {
              _this.fireChangeEvent(resolve);
            }));
          }
        } else {
          payload.promises.push(new Promise(function (resolve) {
            resolve();
          }));
        }

        //clear updated value
        _this.updatedState = {};
      }
    });
    _this.initialState = {};
    for (var key in initialState) {
      _this.initialState[key] = initialState[key];
    }
    _this.state = initialState;
    _this.updatedState = {};
    return _this;
  }

  _createClass(BaseStore, [{
    key: 'fireChangeEvent',
    value: function fireChangeEvent(resolve) {
      if (this.listenerCount('change')) {
        this.emit('change', resolve);
      } else {
        resolve();
      }
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(callback) {
      this.on('change', callback);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(callback) {
      this.removeListener('change', callback);
    }
  }, {
    key: 'setState',
    value: function setState(values) {
      for (var key in values) {
        this.updatedState[key] = values[key];
      }
    }
  }, {
    key: 'getState',
    value: function getState(key) {
      if (key === undefined) {
        var ret = {};
        for (var key in this.state) {
          if (this.updatedState.hasOwnProperty(key)) {
            ret[key] = this.updatedState[key];
          } else {
            ret[key] = this.state[key];
          }
        }

        return ret;
      } else {
        if (this.updatedState.hasOwnProperty(key)) {
          return this.updatedState[key];
        }

        return this.state[key];
      }
    }
  }, {
    key: 'clearState',
    value: function clearState() {
      this.setState(this.initialState);
    }
  }, {
    key: 'getInitialState',
    value: function getInitialState() {
      var state = {};
      for (var key in this.initialState) {
        state[key] = this.initialState[key];
      }
      return state;
    }
  }, {
    key: 'bindUpdatedState',
    value: function bindUpdatedState() {
      for (var key in this.updatedState) {
        this.state[key] = this.updatedState[key];
      }

      return this.updatedState;
    }
  }]);

  return BaseStore;
}(_events2.default.EventEmitter);

exports.default = BaseStore;