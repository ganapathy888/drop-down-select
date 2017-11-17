'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classNames = require('./classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Vendor Imports


// Local Imports


// Dropdown Select
var SimpleSelect = function (_Component) {
  _inherits(SimpleSelect, _Component);

  function SimpleSelect(props) {
    _classCallCheck(this, SimpleSelect);

    var _this = _possibleConstructorReturn(this, (SimpleSelect.__proto__ || Object.getPrototypeOf(SimpleSelect)).call(this, props));

    _this.state = {
      placeholder: 'Select',
      inputValue: '',
      options: [],
      currentOptions: [],
      isOpen: false,
      isOptionSelected: false
    };
    _this.handleInputClick = _this.handleInputClick.bind(_this);
    _this.handleInputBlur = _this.handleInputBlur.bind(_this);
    _this.handleOptionClick = _this.handleOptionClick.bind(_this);
    _this.renderOptions = _this.renderOptions.bind(_this);
    _this.renderOption = _this.renderOption.bind(_this);
    _this.renderStringOption = _this.renderStringOption.bind(_this);
    _this.handleOptionsMouseDown = _this.handleOptionsMouseDown.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.showOptions = _this.showOptions.bind(_this);
    _this.hideOptions = _this.hideOptions.bind(_this);
    _this.renderArrow = _this.renderArrow.bind(_this);
    return _this;
  }

  // Component LifeCycle


  _createClass(SimpleSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var options = this.props.options;

      if (options) {
        this.setState({ options: options, currentOptions: options });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var options = nextProps.options;

      if (options) {
        this.setState({ options: options, currentOptions: options });
      }
    }

    // Handlers

  }, {
    key: 'handleInputChange',
    value: function handleInputChange(newValue) {
      var options = this.state.options.filter(function (option) {
        return option.indexOf(newValue.target.value) !== -1;
      });
      this.setState({ inputValue: newValue.target.value, currentOptions: options });
    }
  }, {
    key: 'handleInputClick',
    value: function handleInputClick(event) {
      this.showOptions();
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur(event) {
      if (!this.state.isOptionSelected) {
        this.setState({ isOpen: false, isOptionSelected: false });
      }
    }
  }, {
    key: 'handleOptionClick',
    value: function handleOptionClick(newValue) {
      var labelKey = this.props.labelKey;

      var value = (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) == 'object' ? newValue[labelKey] : newValue;
      this.setState({ inputValue: value, isOpen: false, isOptionSelected: false });
      this.props.onChange(newValue);
    }
  }, {
    key: 'handleOptionsMouseDown',
    value: function handleOptionsMouseDown() {
      this.setState({ isOptionSelected: true });
    }

    // Private

  }, {
    key: 'showOptions',
    value: function showOptions() {
      this.input.focus();
      this.setState({ isOpen: true });
    }
  }, {
    key: 'hideOptions',
    value: function hideOptions() {
      this.setState({ isOpen: false });
    }

    // Render

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          placeholder = _state.placeholder,
          inputValue = _state.inputValue;

      var inputClasses = (0, _classNames2.default)({
        "Dropdown-Select-input": !this.props.inputClassName
      }, this.props.inputClassName);

      return _react2.default.createElement(
        'div',
        { className: 'Dropdown-Select', onBlur: this.handleInputBlur },
        _react2.default.createElement('input', {
          className: inputClasses,
          ref: function ref(input) {
            return _this2.input = input;
          },
          placeholder: placeholder,
          onChange: this.handleInputChange,
          onClick: this.handleInputClick,
          type: 'text',
          value: inputValue,
          tabIndex: '1'
        }),
        this.renderArrow(),
        this.renderOptions()
      );
    }
  }, {
    key: 'renderArrow',
    value: function renderArrow() {
      return this.state.isOpen ? _react2.default.createElement('i', { className: 'arrow-up options-arrow', onClick: this.hideOptions }) : _react2.default.createElement('i', { className: 'arrow-down options-arrow', onClick: this.showOptions });
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var _state2 = this.state,
          isOpen = _state2.isOpen,
          currentOptions = _state2.currentOptions;

      var styles = { display: isOpen ? 'block' : 'none' };
      if (currentOptions.length > 0) {
        return _react2.default.createElement(
          'div',
          {
            className: 'options-container',
            style: styles,
            onMouseDown: this.handleOptionsMouseDown },
          currentOptions.map(this.renderOption)
        );
      } else {
        return _react2.default.createElement(
          'div',
          {
            className: 'options-container',
            style: styles },
          _react2.default.createElement(
            'div',
            { className: 'options-item' },
            'No options found...'
          )
        );
      }
    }
  }, {
    key: 'renderOption',
    value: function renderOption(option, index) {
      return (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' ? this.renderObjectOption(option, index) : this.renderStringOption(option, index);
    }
  }, {
    key: 'renderStringOption',
    value: function renderStringOption(option, index) {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'options-item',
          key: index,
          onClick: function onClick() {
            return _this3.handleOptionClick(option);
          } },
        option
      );
    }
  }, {
    key: 'renderObjectOption',
    value: function renderObjectOption(option, index) {
      var _this4 = this;

      var labelKey = this.props.labelKey;


      return _react2.default.createElement(
        'div',
        {
          className: 'options-item',
          key: index,
          onClick: function onClick() {
            return _this4.handleOptionClick(option);
          } },
        option[labelKey]
      );
    }
  }]);

  return SimpleSelect;
}(_react.Component);

// Export


exports.default = SimpleSelect;