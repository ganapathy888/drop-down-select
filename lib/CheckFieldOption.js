"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classNames = require("./classNames");

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Vendor Imports


// Local Imports


// Option Component
var CheckFieldOption = function (_Component) {
  _inherits(CheckFieldOption, _Component);

  function CheckFieldOption(props) {
    _classCallCheck(this, CheckFieldOption);

    var _this = _possibleConstructorReturn(this, (CheckFieldOption.__proto__ || Object.getPrototypeOf(CheckFieldOption)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  // Handlers


  _createClass(CheckFieldOption, [{
    key: "handleClick",
    value: function handleClick() {
      var _props = this.props,
          option = _props.option,
          index = _props.index,
          isChecked = _props.isChecked;

      this.props.onClick(option, index, !isChecked);
    }

    // Render

  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          option = _props2.option,
          index = _props2.index,
          labelKey = _props2.labelKey,
          isFocused = _props2.isFocused,
          isChecked = _props2.isChecked;

      var styles = (0, _classNames2.default)("options-item", "checkfield-options-item", {
        "options-item-hovered": isFocused
      });

      return _react2.default.createElement(
        "div",
        { className: styles, onClick: this.handleClick },
        _react2.default.createElement("input", { type: "checkbox", checked: isChecked, readOnly: true }),
        labelKey ? option[labelKey] : option
      );
    }
  }]);

  return CheckFieldOption;
}(_react.Component);

// Export


exports.default = CheckFieldOption;