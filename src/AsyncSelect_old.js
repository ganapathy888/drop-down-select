// Vendor Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import classNames from './classNames';
import Option from './Option';
import Arrow from './Arrow';

// Async Dropdown Select
class AsyncSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Search...',
      options: [],
      currentOptions: [],
      showOptions: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      inputFoucsed: false,
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
    const { options, value, labelKey } = this.props;
    if (options) {
      this.setOptions(options);
    }
    const inputValue = typeof(value) == 'object' ? value[labelKey] : value
    if (inputValue) {
      this.input.value = inputValue;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { options, value, labelKey } = nextProps;
    if (options) {
      this.setOptions(options);
    }
    const inputValue = typeof(value) == 'object' ? value[labelKey] : value
    if (inputValue != undefined) {
      this.input.value = inputValue;
    }
  }

  // Handlers
  handleInputChange(newValue) {
    const { labelKey } = this.props;
    const { options } = this.state;
    const value = newValue.target.value;
    let currentOptions = [];

    if (newValue.target.value.length == 0) {
      currentOptions = options;
    } else {
      currentOptions = this.filterOptions(value);
    }

    this.setState({ currentOptions });

    if (this.props.fetchOptions) {
      this.setState({ isLoading: true });
      this.props.fetchOptions(value).then((response) => {
        this.setState({ isLoading: false });
        if (Array.isArray(response)) {
          this.setOptions(response);
        }
      });
    }
  }

  handleInputClick(event) {
    this.showOptions();
  }

  handleInputBlur(event) {
    if (!this.state.isOptionSelected) {
      this.setState({ showOptions: false, isOptionSelected: false });
    }
  }

  handleOptionClick(newValue, index) {
    this.setState({
      showOptions: false,
      isOptionSelected: false,
      focusedOptionIndex: index,
    });
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  }

  handleOptionsMouseDown() {
    if (e.target !== this.optionsContainer) {
      this.setState({ isOptionSelected: true });
    }
  }

  handleKeyPress(e) {
    e.preventDefault();
    e.stopPropagation();
    const { focusedOptionIndex, currentOptions } = this.state;
    let index = focusedOptionIndex;
    switch (e.keyCode) {
      case 40:
        if (focusedOptionIndex < (currentOptions.length - 1)) {
          index += 1
        }
        break;
      case 38:
        if (focusedOptionIndex > 0 ) {
         index -= 1
        }
        break;
      case 13:
        this.handleOptionClick(currentOptions[focusedOptionIndex], focusedOptionIndex);
        break;
      case 8:
        this.showOptions(true);
        break;
    }
    this.setState({ focusedOptionIndex: index }, () => {
      this.focusOption();
    });
  }

  // Private
  focusOption() {
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
    } else {
      this.setState({ showOptions: false });
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

  filterOptions(value) {
    const { options } = this.state;
    return options.filter((option) => {
      if (typeof(option) == 'string') {
        return option.indexOf(value) !== -1
      } else {
        return option[this.props.labelKey].indexOf(value) !== -1
      }
    });
  }

  // Render
  render() {
    const { placeholder, showOptions, inputFoucsed } = this.state;
    const inputClasses = classNames({
      "Dropdown-Select-input": !this.props.inputClassName
    }, this.props.inputClassName);

    return (
      <div className="Dropdown-Select">
        <input
          onBlur={this.handleInputBlur}
          className={inputClasses}
          ref={ (input) => this.input = input }
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onClick={this.handleInputClick}
          type="text"
          onKeyDown={this.handleKeyPress}
        />
        <Arrow
          inputFoucsed={inputFoucsed}
          isOptionsVisible={showOptions}
          showOptions={this.showOptions}
          />
        { this.renderOptionsContainer() }
      </div>
    );
  }

  renderOptionsContainer() {
    const { showOptions, currentOptions } = this.state;
    const styles = classNames('options-container',{
       'show': showOptions,
       'hide': !showOptions
    });
    return (
      <div
        ref={ (el) => this.optionsContainer = el }
        className={styles}
        onMouseDown={this.handleOptionsMouseDown}>
        { this.renderOptions(currentOptions) }
      </div>
    );
  }

  renderOptions(currentOptions) {
    if (currentOptions.length > 0) {
      return currentOptions.map(this.renderOption)
    } else {
      return 'No options found...';
    }
  }

  renderOption(option, index) {
    return (
      <Option
        index={index}
        option={option}
        isFocused={this.state.focusedOptionIndex == index}
        labelKey={this.props.labelKey}
        onClick={this.handleOptionClick}
        ref={ (el) => {
          if (this.state.focusedOptionIndex == index) {
            this.focusedOptionItem = el;
          }
        } }
      />
    );
  }

}

// Export
export default AsyncSelect;
