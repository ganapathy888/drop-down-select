// Vendor Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import classNames from './classNames';
import Option from './Option';
import Arrow from './Arrow';

// Dropdown Select
class SimpleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Select',
      options: [],
      currentOptions: [],
      showOptions: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      inputFoucsed: false
    };
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.handleOptionsMouseDown = this.handleOptionsMouseDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderOptionsContainer = this.renderOptionsContainer.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    this._loadProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._loadProps(nextProps);
  }

  // Handlers
  handleInputChange(newValue) {
    this.filterOptions(newValue.target.value);
  }

  handleInputClick(event) {
    this.setState({ inputFoucsed: true });
    this.showOptions(true);
  }

  handleInputBlur(event) {
    this.setState({ inputFoucsed: false });
    if (!this.state.isOptionSelected || this.state.currentOptions.length == 0) {
      this.setState({ showOptions: false, isOptionSelected: false });
    }
  }

  handleOptionClick(newValue, index) {
    this._handleOptionChange(newValue, index);
  }

  handleOptionsMouseDown(e) {
    if (e.target !== this.optionsContainer) {
      this.setState({ isOptionSelected: true });
    }
  }

  handleKeyPress(e) {
    this.showOptions(true);
    const { currentOptions, focusedOptionIndex } = this.state;
    switch (e.keyCode) {
      case 40: // Down Arrow
        e.preventDefault();
        e.stopPropagation();
        this.navigateOptions('down');
        break;
      case 38: // Up Arrow
        e.preventDefault();
        e.stopPropagation();
        this.navigateOptions('up');
        break;
      case 13: // Enter
        e.preventDefault();
        e.stopPropagation();
        this.handleOptionClick(
          currentOptions[focusedOptionIndex],
          focusedOptionIndex
        );
        break;
      case 27: // Esc
        this.showOptions(false);
        break;
    }
  }

  // Private
  _handleOptionChange(option, index) {
    const { onChange, returnValueOnly, valueKey } = this.props;
    if (onChange) {
      const value = returnValueOnly ? option[valueKey] : option;
      this.props.onChange(value);
    }
    this.setState({
      showOptions: false,
      isOptionSelected: false,
      focusedOptionIndex: index
    });
  }

  _loadProps({ options, value, labelKey, autoComplete, placeholder }) {
    if (options) {
      this.setOptions(options);
    }
    if (value) {
      let inputValue = '';
      if (labelKey) {
        inputValue =
          typeof value == 'object'
            ? value[labelKey]
            : this._findLabelByValue(options, value);
      } else {
        inputValue = value;
      }
      this.input.value = inputValue;
    }
    if (autoComplete == false) {
      this.input.readOnly = true;
    }
    if (placeholder) {
      this.setState({ placeholder });
    }
  }

  _findLabelByValue(options, value) {
    const index = options.findIndex(
      option => option[this.props.valueKey].toLowerCase() == value.toLowerCase()
    );
    return options[index][this.props.labelKey];
  }

  filterOptions(newValue) {
    const { labelKey } = this.props;
    const { options } = this.state;
    let newOptions = [];
    if (newValue.length == 0) {
      newOptions = options;
    } else {
      newOptions = options.filter(option => {
        let label = typeof option == 'object' ? option[labelKey] : option;
        return label.toLowerCase().indexOf(newValue.toLowerCase()) !== -1;
      });
    }
    if (this.props.autoComplete == false) {
      const option = newOptions[0];
      const index = options.findIndex(item => item == option);
      this.setState({ focusedOptionIndex: index });
    } else {
      this.setState({ currentOptions: newOptions });
    }
  }

  navigateOptions(dir) {
    if (!this.state.showOptions) {
      return;
    }
    let { focusedOptionIndex, currentOptions } = this.state;
    if (dir == 'down') {
      focusedOptionIndex += 1;
    } else if (dir == 'up') {
      focusedOptionIndex -= 1;
    }
    if (focusedOptionIndex < 0) {
      focusedOptionIndex = currentOptions.length - 1;
    } else if (focusedOptionIndex > currentOptions.length - 1) {
      focusedOptionIndex = 0;
    }
    this.setState({ focusedOptionIndex }, () => {
      this.setFocusOption();
    });
  }

  setFocusOption() {
    let panel, node;
    panel = this.optionsContainer;
    node = ReactDOM.findDOMNode(this.focusedOptionItem);
    if (node) {
      panel.scrollTop = node.offsetTop - panel.offsetTop;
    }
  }

  showOptions(flag) {
    if (flag) {
      this.input.focus();
      this.setState({ showOptions: true, inputFoucsed: true });
      this.filterOptions(this.input.value);
    } else {
      this.setState({ showOptions: false, inputFoucsed: false });
    }
  }

  setOptions(options) {
    let optionsArr = [];
    if (this.props.defaultOption) {
      optionsArr = optionsArr.concat(this.props.defaultOption);
    }
    optionsArr = optionsArr.concat(options);
    this.setState({ options: optionsArr, currentOptions: optionsArr });
  }

  // Render
  render() {
    const { placeholder, showOptions, inputFoucsed } = this.state;
    const inputClasses = classNames(
      {
        'Dropdown-Select-input': !this.props.inputClassName
      },
      this.props.inputClassName
    );

    return (
      <div className="Dropdown-Select">
        <input
          className={inputClasses}
          ref={input => (this.input = input)}
          placeholder={placeholder}
          type="text"
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onClick={this.handleInputClick}
          onKeyDown={this.handleKeyPress}
        />
        <Arrow isOptionsVisible={showOptions} showOptions={this.showOptions} />
        {this.renderOptionsContainer()}
      </div>
    );
  }

  renderOptionsContainer() {
    const { showOptions, currentOptions } = this.state;
    const styles = classNames('options-container', {
      show: showOptions,
      hide: !showOptions
    });
    return (
      <div
        ref={el => (this.optionsContainer = el)}
        className={styles}
        onMouseDown={this.handleOptionsMouseDown}
      >
        {this.renderOptions(currentOptions)}
      </div>
    );
  }

  renderOptions(currentOptions) {
    if (currentOptions.length > 0) {
      return currentOptions.map(this.renderOption);
    } else {
      return <div className="options-item">No options found...</div>;
    }
  }

  renderOption(option, index) {
    return (
      <Option
        key={index}
        index={index}
        option={option}
        isFocused={this.state.focusedOptionIndex == index}
        labelKey={this.props.labelKey}
        onClick={this.handleOptionClick}
        ref={el => {
          if (this.state.focusedOptionIndex == index) {
            this.focusedOptionItem = el;
          }
        }}
      />
    );
  }
}

// Export
export default SimpleSelect;
