// Vendor Imports
import { Component } from 'react';

// Local Imports
import classNames from '../../utils/classNames';
import { findSubStringIndex } from '../../utils/string';

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
    this.changeValueIfReq = this.changeValueIfReq.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    this.loadProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadProps(nextProps);
  }

  // Private

  getOptionValue(option) {
    const { valueKey, returnValueOnly } = this.props;
    if (returnValueOnly) {
      return valueKey ? option[valueKey] : option;
    }
    return option;
  }

  setValue(value) {
    this.setState({ value });
  }

  getOptionByLabel(label) {
    const { options } = this.state;
    const index = options.findIndex(option => this.getOptionLabel(option) === label);
    return options[index];
  }

  getOptionLabel(option) {
    return typeof option === 'object' ? option[this.props.labelKey] : option;
  }

  setOptions(options) {
    if (options) {
      this.setState({ options, currentOptions: options });
    }
  }

  getInputClassName() {
    return classNames(
      {
        'dropdown-select__input': !this.props.inputClassName,
      },
      this.props.inputClassName,
    );
  }

  getSelectClassName() {
    return classNames(
      {
        'dropdown-select': !this.props.selectClassName,
        'dropdown-select--focused': this.state.inputFoucsed,
      },
      this.props.selectClassName,
    );
  }

  findOptionIndexFromOptions(option) {
    const { labelKey } = this.props;
    return this.state.options.findIndex((item) => {
      if (labelKey) {
        return item[labelKey] === option[labelKey];
      }
      return item === option;
    });
  }

  loadProps(props) {
    const {
      options, value, autoComplete, placeholder, disabled,
    } = props;
    if (autoComplete === false) {
      this.input.readOnly = true;
    }
    if (placeholder) {
      this.setState({ placeholder });
    }
    if (typeof disabled === 'boolean') {
      this.setState({ disabled });
    }
    this.setValue(value);
    this.setOptions(options);
  }

  filterOptions(newValue) {
    const { options } = this.state;
    let newOptions = [];
    if (newValue.length === 0) {
      newOptions = options;
    } else {
      newOptions = options.filter((option) => {
        const label = this.getOptionLabel(option);
        return findSubStringIndex(label, newValue) !== -1;
      });
    }
    this.setState({ currentOptions: newOptions });
  }

  showOptions(flag) {
    if (flag) {
      this.input.focus();
      this.setState({
        isOptionsOpen: true,
        inputFoucsed: true,
        currentOptions: this.state.options,
        focusedOptionIndex: this.state.selectedOptionIndex,
      });
    } else {
      this.setState({
        isOptionsOpen: false,
        inputFoucsed: false,
        focusedOptionIndex: this.state.selectedOptionIndex,
      });
    }
  }

  restoreInputValue() {
    const { currentOption } = this.state;
    if (currentOption) {
      const label = this.getOptionLabel(currentOption);
      if (label !== this.input.value) {
        this.input.value = label;
      }
    }
  }

  changeOption(newOption) {
    const { onChange } = this.props;
    const index = this.findOptionIndexFromOptions(newOption);
    this.setState({
      isOptionsOpen: false,
      isOptionSelected: false,
      focusedOptionIndex: index,
      selectedOptionIndex: index,
      currentOption: newOption,
    });
    if (onChange) {
      this.props.onChange(this.getOptionValue(newOption));
    }
  }

  // Handlers
  handleInputClick() {
    this.setState({ inputFoucsed: true });
    this.showOptions(true);
  }

  handleInputBlur() {
    this.setState({ inputFoucsed: false });
    if (!this.state.isOptionSelected || this.state.currentOptions.length === 0) {
      this.setState({ isOptionsOpen: false, isOptionSelected: false });
    }
    this.restoreInputValue();
  }

  handleInputFocus() {
    this.setState({ inputFoucsed: true });
    this.showOptions(true);
  }

  handleOptionClick(newOption) {
    this.changeOption(newOption);
  }

  handleOptionsMouseDown(e) {
    if (e.target !== this.optionsContainer) {
      this.setState({ isOptionSelected: true });
    }
  }

  handleOptionFocused(index) {
    this.setState({ focusedOptionIndex: index });
  }

  handleInputChange(newValue) {
    this.filterOptions(newValue.target.value);
  }
}

// Export
export default BaseSelect;
