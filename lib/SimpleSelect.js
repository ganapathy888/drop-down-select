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

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

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

    _this.optionsRef = [];
    _this.state = {
      placeholder: 'Select',
      inputValue: '',
      options: [],
      currentOptions: [],
      showOptions: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      inputFoucsed: false
    };
    _this.handleInputClick = _this.handleInputClick.bind(_this);
    _this.handleInputBlur = _this.handleInputBlur.bind(_this);
    _this.handleOptionClick = _this.handleOptionClick.bind(_this);
    _this.renderOptions = _this.renderOptions.bind(_this);
    _this.renderOption = _this.renderOption.bind(_this);
    _this.handleOptionsMouseDown = _this.handleOptionsMouseDown.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.showOptions = _this.showOptions.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.renderOptionsContainer = _this.renderOptionsContainer.bind(_this);
    return _this;
  }

  // Component LifeCycle


  _createClass(SimpleSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          value = _props.value,
          labelKey = _props.labelKey;

      if (options) {
        this.setState({ options: options, currentOptions: options }, function () {
          if (value) {
            var inputValue = labelKey ? value[labelKey] : value;
            _this2.setState({ inputValue: inputValue });
          }
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var options = nextProps.options,
          value = nextProps.value,
          labelKey = nextProps.labelKey;

      if (options) {
        this.setState({ options: options, currentOptions: options }, function () {
          if (value) {
            var inputValue = labelKey ? value[labelKey] : value;
            _this3.setState({ inputValue: inputValue });
          }
        });
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
      this.setState({ inputFoucsed: true });
      this.showOptions(true);
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur(event) {
      this.setState({ inputFoucsed: false });
      if (!this.state.isOptionSelected) {
        this.setState({ showOptions: false, isOptionSelected: false });
      }
    }
  }, {
    key: 'handleOptionClick',
    value: function handleOptionClick(newValue, index) {
      var labelKey = this.props.labelKey;

      var value = (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) == 'object' ? newValue[labelKey] : newValue;
      this.setState({
        inputValue: value,
        showOptions: false,
        isOptionSelected: false,
        focusedOptionIndex: index
      });
      if (this.props.onChange) {
        this.props.onChange(newValue);
      }
    }
  }, {
    key: 'handleOptionsMouseDown',
    value: function handleOptionsMouseDown(e) {
      if (e.target !== this.optionsContainer) {
        this.setState({ isOptionSelected: true });
      }
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      var _this4 = this;

      var _state = this.state,
          focusedOptionIndex = _state.focusedOptionIndex,
          currentOptions = _state.currentOptions;

      var index = focusedOptionIndex;
      switch (e.keyCode) {
        case 40:
          if (focusedOptionIndex < currentOptions.length - 1) {
            index += 1;
          }
          break;
        case 38:
          if (focusedOptionIndex > 0) {
            index -= 1;
          }
          break;
        case 13:
          this.handleOptionClick(currentOptions[focusedOptionIndex], focusedOptionIndex);
          break;
      }
      this.setState({ focusedOptionIndex: index }, function () {
        _this4.focusOption();
      });
    }

    // Private

  }, {
    key: 'focusOption',
    value: function focusOption() {
      var panel = void 0,
          node = void 0;
      panel = this.optionsContainer;
      node = _reactDom2.default.findDOMNode(this.focusedOptionItem);
      if (node) {
        panel.scrollTop = node.offsetTop - panel.offsetTop;
      }
    }
  }, {
    key: 'showOptions',
    value: function showOptions(flag) {
      if (flag) {
        this.input.focus();
        this.setState({ showOptions: true, inputFoucsed: true });
      } else {
        this.setState({ showOptions: false });
      }
    }

    // Render

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state2 = this.state,
          placeholder = _state2.placeholder,
          inputValue = _state2.inputValue,
          showOptions = _state2.showOptions,
          inputFoucsed = _state2.inputFoucsed;

      var inputClasses = (0, _classNames2.default)({
        "Dropdown-Select-input": !this.props.inputClassName
      }, this.props.inputClassName);

      return _react2.default.createElement(
        'div',
        { className: 'Dropdown-Select' },
        _react2.default.createElement('input', {
          className: inputClasses,
          ref: function ref(input) {
            return _this5.input = input;
          },
          placeholder: placeholder,
          type: 'text',
          value: inputValue,
          tabIndex: '1',
          onBlur: this.handleInputBlur,
          onChange: this.handleInputChange,
          onClick: this.handleInputClick,
          onKeyDown: this.handleKeyPress
        }),
        _react2.default.createElement(_Arrow2.default, {
          inputFoucsed: inputFoucsed,
          isOptionsVisible: showOptions,
          showOptions: this.showOptions }),
        this.renderOptionsContainer()
      );
    }
  }, {
    key: 'renderOptionsContainer',
    value: function renderOptionsContainer() {
      var _this6 = this;

      var _state3 = this.state,
          showOptions = _state3.showOptions,
          currentOptions = _state3.currentOptions;

      var styles = (0, _classNames2.default)('options-container', {
        'show': showOptions,
        'hide': !showOptions
      });
      return _react2.default.createElement(
        'div',
        {
          ref: function ref(el) {
            return _this6.optionsContainer = el;
          },
          className: styles,
          onMouseDown: this.handleOptionsMouseDown },
        this.renderOptions(currentOptions)
      );
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions(currentOptions) {
      if (currentOptions.length > 0) {
        return currentOptions.map(this.renderOption);
      } else {
        return 'No options found...';
      }
    }
  }, {
    key: 'renderOption',
    value: function renderOption(option, index) {
      var _this7 = this;

      return _react2.default.createElement(_Option2.default, {
        key: index,
        index: index,
        option: option,
        isFocused: this.state.focusedOptionIndex == index,
        labelKey: this.props.labelKey,
        onClick: this.handleOptionClick,
        ref: function ref(el) {
          if (_this7.state.focusedOptionIndex == index) {
            _this7.focusedOptionItem = el;
          }
        }
      });
    }
  }]);

  return SimpleSelect;
}(_react.Component);

// Export


exports.default = SimpleSelect;