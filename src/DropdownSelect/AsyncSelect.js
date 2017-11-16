// Vendor Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Styles
const dropdownStyles = {
  input: {
    height: '30px',
    width: '100%',
  },
  optionsContainer: {
    outline: 'none',
    border: '1px solid #ccc',
  },
  optionsItem: {
    padding: '10px',
  }
};

// Dropdown Select
class AsyncSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      inputPlaceHolder: 'Search here...',
      options: [],
      currentOptions: [],
      isOpen: false,
      isOptionSelected: false,
    };
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.renderStringOption = this.renderStringOption.bind(this);
    this.handleOptionsMouseDown = this.handleOptionsMouseDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    const { options } = this.props;
    if (options) {
      this.setState({ options, currentOptions: options });
    }
  }

  // Handlers
  handleInputChange(newValue) {

    this.setState({ inputValue: newValue.target.value });
  }

  handleInputClick(event) {
    this.setState({ isOpen: true });
  }

  handleInputBlur(event) {
    if (!this.state.isOptionSelected) {
      this.setState({ isOpen: false, isOptionSelected: false });
    }
  }

  handleOptionClick(value) {
    this.setState({ inputValue: value, isOpen: false, isOptionSelected: false });
  }

  handleOptionsMouseDown() {
    this.setState({ isOptionSelected: true });
  }

  // Render
  render() {
    const { inputValue, inputPlaceHolder } = this.state;

    return (
      <div onBlur={this.handleInputBlur}>
        <input
          onChange={this.handleInputChange}
          onClick={this.handleInputClick}
          style={dropdownStyles.input}
          type="text"
          value={inputValue}
          tabIndex="1"
          placeholder={inputPlaceHolder}
        />
        { this.renderOptions() }
      </div>
    );
  }

  renderOptions() {
    const { isOpen, currentOptions } = this.state;
    const styles = { ...dropdownStyles.optionsContainer,
                     display: (isOpen)? 'block' : 'none'
                   };
    if (currentOptions.length > 0) {
      return (
        <div style={styles} onMouseDown={this.handleOptionsMouseDown}>
          { currentOptions.map(this.renderOption) }
        </div>
      );
    } else {
      return (
        <div style={styles} >
          No Options Found
        </div>
      )
    }
  }

  renderOption(option, index) {
    return (typeof(option) == 'object') ? (
      this.renderObjectOption(option, index)) : (
        this.renderStringOption(option, index));
  }

  renderStringOption(option, index) {
    return (
      <div
        style={ dropdownStyles.optionsItem }
        key={index}
        onClick={() => this.handleOptionClick(option)}>
        { option }
      </div>
    );
  }

  renderObjectOption(option, index) {
    const { labelKey, valueKey } = this.props;

    return (
      <div key={index} onClick={() => this.handleOptionClick(option[valueKey])}>
        { option[labelKey] }
      </div>
    );
  }
}

// Export
export default AsyncSelect;
