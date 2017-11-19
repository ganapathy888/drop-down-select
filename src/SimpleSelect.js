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
    this.optionsRef = [];
    this.state = {
      placeholder: 'Select',
      inputValue: '',
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
    const { options } = this.props;
    if (options) {
      this.setState({ options, currentOptions: options });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { options } = nextProps;
    if (options) {
      this.setState({ options, currentOptions: options });
    }
  }

  // Handlers
  handleInputChange(newValue) {
    const options = this.state.options.filter((option) => {
      return option.indexOf(newValue.target.value) !== -1
    });
    this.setState({ inputValue: newValue.target.value, currentOptions: options });
  }

  handleInputClick(event) {
    this.setState({ inputFoucsed: true });
    this.showOptions(true);
  }

  handleInputBlur(event) {
    this.setState({ inputFoucsed: false });
    if (!this.state.isOptionSelected) {
      this.setState({ showOptions: false, isOptionSelected: false });
    }
  }

  handleOptionClick(newValue, index) {
    const { labelKey } = this.props;
    const value = typeof(newValue) == 'object' ? newValue[labelKey] : newValue
    this.setState({
      inputValue: value,
      showOptions: false,
      isOptionSelected: false,
      focusedOptionIndex: index,
    });
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  }

  handleOptionsMouseDown(e) {
    if (e.target !== this.optionsContainer) {
      this.setState({ isOptionSelected: true });
    }
  }

  handleKeyPress(e) {
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

  // Render
  render() {
    const { placeholder, inputValue, showOptions, inputFoucsed } = this.state;
    const inputClasses = classNames({
      "Dropdown-Select-input": !this.props.inputClassName
    }, this.props.inputClassName);

    return (
      <div className="Dropdown-Select">
        <input
          className={inputClasses}
          ref={ (input) => this.input = input }
          placeholder={placeholder}
          type="text"
          value={inputValue}
          tabIndex="1"
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onClick={this.handleInputClick}
          onKeyDown={this.handleKeyPress}
        />
      <Arrow
        inputFoucsed={inputFoucsed}
        isOptionsVisible={showOptions}
        showOptions={this.showOptions}/>
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
        key={index}
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
export default SimpleSelect;
