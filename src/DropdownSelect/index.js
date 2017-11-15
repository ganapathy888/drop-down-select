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
class DropdownSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      options: [],
      isOpen: false,
    };
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleOptionsBlur = this.handleOptionsBlur.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.renderStringOption = this.renderStringOption.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    const { options } = this.props;
    if (options) {
      this.setState({ options });
    }
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      ReactDOM.findDOMNode(this.dropdown).focus();
    }
  }

  // Handlers
  handleInputClick(event) {
    this.setState({ isOpen: true });
  }

  handleOptionsBlur(event) {
    this.setState({ isOpen: false });
  }

  handleOptionClick(value) {
    this.setState({ inputValue: value, isOpen: false });
  }

  // Render
  render() {
    return (
      <div>
        <input
          onClick={this.handleInputClick}
          style={dropdownStyles.input}
          type="text"
          value={this.state.inputValue}
        />
        { this.renderOptions() }
      </div>
    );
  }

  renderOptions() {
    const { isOpen } = this.state;
    const styles = { ...dropdownStyles.optionsContainer,
                     display: (isOpen)? 'block' : 'none'
                   };
    return (
      <div
        style={styles}
        onBlur={this.handleOptionsBlur}
        tabIndex="1"
        ref={(instance) => { this.dropdown = instance; }}>
        { this.state.options.map(this.renderOption) }
      </div>
    );
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
export default DropdownSelect;
