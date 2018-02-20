// Vendor Imports
import { Component } from 'react';

// Local Imports
import classNames from '../../utils/classNames';

// Dropdown Select
class BaseSelect extends Component {
  constructor(props) {
    super(props);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleOptionsMouseDown = this.handleOptionsMouseDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOptionFocused = this.handleOptionFocused.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this._changeValueIfReq = this._changeValueIfReq.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    this._loadProps(this.props, this._changeValueIfReq);
  }

  componentWillReceiveProps(nextProps) {
    this._loadProps(nextProps, this._changeValueIfReq);
  }

  // Handlers
  handleInputChange(newValue) {
    this._filterOptions(newValue.target.value);
  }

  handleInputClick(event) {
    this.setState({ inputFoucsed: true });
    this.showOptions(true);
  }

  handleInputBlur(event) {
    this.setState({ inputFoucsed: false });
    if (!this.state.isOptionSelected || this.state.currentOptions.length == 0) {
      this.setState({ isOptionsOpen: false, isOptionSelected: false });
    }
    this._restoreInputValue();
  }

  handleInputFocus(e) {
    this.setState({ inputFoucsed: true });
    this.showOptions(true);
  }

  handleOptionClick(newOption) {
    this._changeOption(newOption);
  }

  handleOptionsMouseDown(e) {
    if (e.target !== this.optionsContainer) {
      this.setState({ isOptionSelected: true });
    }
  }

  handleKeyPress(e) {
    const { currentOptions, focusedOptionIndex } = this.state;
  }

  handleOptionFocused(index) {
    this.setState({ focusedOptionIndex: index });
  }

  // Private
  _restoreInputValue() {
    const { currentOption } = this.state;
    if (currentOption) {
      const label = this._getOptionLabel(currentOption);
      if (label != this.input.value) {
        this.input.value = label;
      }
    }
  }

  _changeValueIfReq() {
    const { value, returnValueOnly } = this.props;
    if (!value || value.length == 0) {
      return;
    }
    if (typeof value == 'string') {
      const option = this._getOptionByLabel(this._findLabelByValue(value));
      if (!option) {
        return;
      } else if (!returnValueOnly) {
        this._changeOption(option);
      } else if (returnValueOnly) {
        const index = this._findOptionIndexFromOptions(option);
        this.setState({
          focusedOptionIndex: index,
          selectedOptionIndex: index
        });
      }
    }
  }

  _changeOption(newOption) {
    const { onChange } = this.props;
    const index = this._findOptionIndexFromOptions(newOption);
    this.setState({
      isOptionsOpen: false,
      isOptionSelected: false,
      focusedOptionIndex: index,
      selectedOptionIndex: index,
      currentOption: newOption
    });
    if (onChange) {
      this.props.onChange(this._getOptionValue(newOption));
    }
  }

  _getOptionValue(option) {
    const { valueKey, returnValueOnly } = this.props;
    if (returnValueOnly) {
      return valueKey ? option[valueKey] : option;
    } else {
      return option;
    }
  }

  _findOptionIndexFromOptions(option) {
    const { labelKey } = this.props;
    return this.state.options.findIndex(item => {
      if (labelKey) {
        return item[labelKey] == option[labelKey];
      } else {
        return item == option;
      }
    });
  }

  _loadProps(props, callback) {
    const {
      options,
      value,
      labelKey,
      autoComplete,
      placeholder,
      disabled
    } = props;
    if (autoComplete == false) {
      this.input.readOnly = true;
    }
    if (placeholder) {
      this.setState({ placeholder });
    }
    if (typeof disabled == 'boolean') {
      this.setState({ disabled });
    }
    this._setValue(value);
    this._setOptions(options, () => {
      this._setInputValue(value, labelKey);
      if (callback) {
        callback();
      }
    });
  }

  _setValue(value) {
    this.setState({ value });
  }

  _setInputValue(newValue, labelKey) {
    const { options } = this.state;
    const type = typeof newValue;
    let inputValue = '';
    if (options.length == 0) {
      inputValue = '';
    } else if (type == 'string' && newValue.length == 0) {
      inputValue = '';
    } else if (type == 'string') {
      inputValue = this._findLabelByValue(newValue);
    } else if (type == 'object' && !Array.isArray(newValue)) {
      inputValue = newValue[labelKey];
    }
    this.input.value = inputValue;
  }

  _getOptionByLabel(label) {
    const { options } = this.state;
    const index = options.findIndex(option => {
      return this._getOptionLabel(option) == label;
    });
    return options[index];
  }

  _findLabelByValue(value) {
    const { options } = this.state;
    const index = options.findIndex(
      option => option[this.props.valueKey].toLowerCase() == value.toLowerCase()
    );
    return options[index][this.props.labelKey];
  }

  _filterOptions(newValue) {
    const { options } = this.state;
    let newOptions = [];
    if (newValue.length == 0) {
      newOptions = options;
    } else {
      newOptions = options.filter(option => {
        const label = this._getOptionLabel(option);
        return this._findSubStringIndex(label, newValue) !== -1;
      });
    }
    this.setState({ currentOptions: newOptions });
  }

  _getOptionLabel(option) {
    return typeof option == 'object' ? option[this.props.labelKey] : option;
  }

  _findSubStringIndex(str, sub) {
    return str.toLowerCase().indexOf(sub.toLowerCase());
  }

  showOptions(flag) {
    if (flag) {
      this.input.focus();
      this.setState({
        isOptionsOpen: true,
        inputFoucsed: true,
        currentOptions: this.state.options,
        focusedOptionIndex: this.state.selectedOptionIndex
      });
    } else {
      this.setState({
        isOptionsOpen: false,
        inputFoucsed: false,
        focusedOptionIndex: this.state.selectedOptionIndex
      });
    }
  }

  _setOptions(options, callback) {
    if (!options) {
      return callback();
    }
    let optionsArr = [];
    if (this.props.defaultOption) {
      optionsArr = optionsArr.concat(this.props.defaultOption);
    }
    optionsArr = optionsArr.concat(options);
    this.setState(
      { options: optionsArr, currentOptions: optionsArr },
      callback
    );
  }

  _getInputClassName() {
    return classNames(
      {
        'dropdown-select__input': !this.props.inputClassName
      },
      this.props.inputClassName
    );
  }

  _getSelectClassName() {
    return classNames(
      {
        'dropdown-select': !this.props.selectClassName,
        'dropdown-select--focused': this.state.inputFoucsed
      },
      this.props.selectClassName
    );
  }
}

// Export
export default BaseSelect;
