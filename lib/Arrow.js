"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Vendor Imports


// Arrow Component
var Arrow = function (_Component) {
  _inherits(Arrow, _Component);

  function Arrow(props) {
    _classCallCheck(this, Arrow);

    var _this = _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).call(this, props));

    _this.state = {
      open: false,
      inputFoucsed: false
    };
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  // Component LifeCycle


  _createClass(Arrow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({ inputFoucsed: this.props.inputFoucsed });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ inputFoucsed: nextProps.inputFoucsed });
    }

    // Handlers

  }, {
    key: "handleClick",
    value: function handleClick(e, flag) {
      e.stopPropagation();
      e.preventDefault();
      this.setState({ open: flag });
      this.props.showOptions(flag);
    }

    // Render

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.open || this.state.inputFoucsed) {
        return _react2.default.createElement("i", {
          className: "options-arrow arrow-up",
          onClick: function onClick(e) {
            return _this2.handleClick(e, false);
          }
        });
      } else {
        return _react2.default.createElement("i", {
          className: "options-arrow arrow-down",
          onClick: function onClick(e) {
            return _this2.handleClick(e, true);
          }
        });
      }
    }
  }]);

  return Arrow;
}(_react.Component);

// Export


exports.default = Arrow;