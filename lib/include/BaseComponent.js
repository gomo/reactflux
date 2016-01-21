'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = function (_React$Component) {
  _inherits(BaseComponent, _React$Component);

  function BaseComponent(props) {
    _classCallCheck(this, BaseComponent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseComponent).call(this, props));

    _this.store = _this.initStore();
    _this.state = _this.store.getInitialState();

    _this.storeChangeCallback = function (defer) {
      _this.setState(_this.store.bindUpdatedState(), function () {
        defer.resolve();
      });
    };
    return _this;
  }

  _createClass(BaseComponent, [{
    key: 'initStore',
    value: function initStore() {
      throw 'You must implements initStore().';
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.store.addChangeListener(this.storeChangeCallback);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.store.removeChangeListener(this.storeChangeCallback);
    }
  }]);

  return BaseComponent;
}(_react2.default.Component);

exports.default = BaseComponent;