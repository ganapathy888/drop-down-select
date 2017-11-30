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


// Async Dropdown Select
var AsyncSelect = function (_Component) {
  _inherits(AsyncSelect, _Component);

  function AsyncSelect(props) {
    _classCallCheck(this, AsyncSelect);

    var _this = _possibleConstructorReturn(this, (AsyncSelect.__proto__ || Object.getPrototypeOf(AsyncSelect)).call(this, props));

    _this.state = {
      placeholder: 'Search...',
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


  _createClass(AsyncSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          options = _props.options,
          value = _props.value,
          labelKey = _props.labelKey;

      if (options) {
        this.setOptions(options);
      }
      var inputValue = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' ? value[labelKey] : value;
      if (inputValue) {
        this.input.value = inputValue;
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var options = nextProps.options,
          value = nextProps.value,
          labelKey = nextProps.labelKey;

      if (options) {
        this.setOptions(options);
      }
      var inputValue = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' ? value[labelKey] : value;
      if (inputValue != undefined) {
        this.input.value = inputValue;
      }
    }

    // Handlers

  }, {
    key: 'handleInputChange',
    value: function handleInputChange(newValue) {
      var _this2 = this;

      var labelKey = this.props.labelKey;
      var options = this.state.options;

      var value = newValue.target.value;
      var currentOptions = [];

      if (newValue.target.value.length == 0) {
        currentOptions = options;
      } else {
        currentOptions = this.filterOptions(value);
      }

      this.setState({ currentOptions: currentOptions });

      if (this.props.fetchOptions) {
        this.setState({ isLoading: true });
        this.props.fetchOptions(value).then(function (response) {
          _this2.setState({ isLoading: false });
          if (Array.isArray(response)) {
            _this2.setOptions(response);
          }
        });
      }
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
        this.setState({ showOptions: false, isOptionSelected: false });
      }
    }
  }, {
    key: 'handleOptionClick',
    value: function handleOptionClick(newValue, index) {
      this.setState({
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
    value: function handleOptionsMouseDown() {
      if (e.target !== this.optionsContainer) {
        this.setState({ isOptionSelected: true });
      }
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      var _this3 = this;

      e.preventDefault();
      e.stopPropagation();
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
        case 8:
          this.showOptions(true);
          break;
      }
      this.setState({ focusedOptionIndex: index }, function () {
        _this3.focusOption();
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
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      var optionsArr = [];
      if (this.props.defaultOption) {
        optionsArr = optionsArr.concat(this.props.defaultOption);
      }
      optionsArr = optionsArr.concat(options);
      this.setState({ options: optionsArr, currentOptions: optionsArr });
    }
  }, {
    key: 'filterOptions',
    value: function filterOptions(value) {
      var _this4 = this;

      var options = this.state.options;

      return options.filter(function (option) {
        if (typeof option == 'string') {
          return option.indexOf(value) !== -1;
        } else {
          return option[_this4.props.labelKey].indexOf(value) !== -1;
        }
      });
    }

    // Render

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state2 = this.state,
          placeholder = _state2.placeholder,
          showOptions = _state2.showOptions,
          inputFoucsed = _state2.inputFoucsed;

      var inputClasses = (0, _classNames2.default)({
        "Dropdown-Select-input": !this.props.inputClassName
      }, this.props.inputClassName);

      return _react2.default.createElement(
        'div',
        { className: 'Dropdown-Select' },
        _react2.default.createElement('input', {
          onBlur: this.handleInputBlur,
          className: inputClasses,
          ref: function ref(input) {
            return _this5.input = input;
          },
          placeholder: placeholder,
          onChange: this.handleInputChange,
          onClick: this.handleInputClick,
          type: 'text',
          onKeyDown: this.handleKeyPress
        }),
        _react2.default.createElement(_Arrow2.default, {
          inputFoucsed: inputFoucsed,
          isOptionsVisible: showOptions,
          showOptions: this.showOptions
        }),
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

  return AsyncSelect;
}(_react.Component);

// Export


exports.default = AsyncSelect;