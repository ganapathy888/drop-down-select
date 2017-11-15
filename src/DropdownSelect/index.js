// Vendor Imports
import React, { Component } from 'react';

// Dropdown Select
class DropdownSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      options: [],
    };
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

  // Handlers
  handleOptionClick(value) {
    this.setState({ inputValue: value });
  }

  // Render
  render() {
    return (
      <div>
        <input type="text" value={this.state.inputValue} />
        <div>
          { this.renderOptions() }
        </div>
      </div>
    );
  }

  renderOptions() {
    return this.state.options.map(this.renderOption);
  }

  renderOption(option, index) {
    return (typeof(option) == 'object') ? (
      this.renderObjectOption(option, index)) : (
        this.renderStringOption(option, index));
  }

  renderStringOption(option, index) {
    return (
      <div key={index} onClick={() => this.handleOptionClick(option)}>
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
