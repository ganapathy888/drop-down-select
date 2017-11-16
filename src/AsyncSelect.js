// Vendor Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import classNames from './classNames';

// Dropdown Select
class AsyncSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Search...',
      inputValue: '',
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
    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.renderArrow = this.renderArrow.bind(this);
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
    const value = newValue.target.value;
    const options = this.filterOptions(value);
    this.setState({ inputValue: value, currentOptions: options });
    if (this.props.fetchOptions) {
      this.setState({ isLoading: true });
      this.props.fetchOptions(value).then((response) => {
        if (Array.isArray(response)) {
          this.setState({
            options: response,
            currentOptions: response,
            isLoading: false,
           });
        }
      });
    }
  }

  handleInputClick(event) {
    this.showOptions();
  }

  handleInputBlur(event) {
    if (!this.state.isOptionSelected) {
      this.setState({ isOpen: false, isOptionSelected: false });
    }
  }

  handleOptionClick(newValue) {
    const { labelKey, valueKey } = this.props;
    const label = typeof(newValue) == 'object' ? newValue[labelKey] : newValue
    this.setState({ inputValue: label, isOpen: false, isOptionSelected: false });
    const value = typeof(newValue) == 'object' ? newValue[valueKey] : newValue
    this.props.onChange(value);
  }

  handleOptionsMouseDown() {
    this.setState({ isOptionSelected: true });
  }

  // Private
  showOptions() {
    this.input.focus();
    this.setState({ isOpen: true });
  }

  hideOptions() {
    this.setState({ isOpen: false });
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
    const { placeholder, inputValue } = this.state;
    const inputClasses = classNames({
      "Dropdown-Select-input": !this.props.inputClassName
    }, this.props.inputClassName);

    return (
      <div className="Dropdown-Select" onBlur={this.handleInputBlur}>
        <input
          className={inputClasses}
          ref={ (input) => this.input = input }
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onClick={this.handleInputClick}
          type="text"
          value={inputValue}
          tabIndex="1"
        />
        { this.renderSpinner() }
        { this.renderArrow() }
        { this.renderOptions() }
      </div>
    );
  }

  renderSpinner() {
    if (this.state.isLoading) {
      return (
        <div className="spinner input-spinner" />
      );
    }
  }

  renderArrow() {
    if (this.state.isLoading) {
      return;
    }
    return (this.state.isOpen) ?
    (<i className="arrow-up options-arrow" onClick={this.hideOptions} />) :
    (<i className="arrow-down options-arrow" onClick={this.showOptions} />)
  }

  renderOptions() {
    const { isOpen, currentOptions } = this.state;
    const styles = { display: (isOpen)? 'block' : 'none' };
    if (currentOptions.length > 0) {
      return (
        <div
          className="options-container"
          style={styles}
          onMouseDown={this.handleOptionsMouseDown}>
          { currentOptions.map(this.renderOption) }
        </div>
      );
    } else {
      return (
        <div
          className="options-container"
          style={styles}>
          <div className="options-item">
            No options found...
          </div>
        </div>
      );
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
        className="options-item"
        key={index}
        onClick={() => this.handleOptionClick(option)}>
        { option }
      </div>
    );
  }

  renderObjectOption(option, index) {
    const { labelKey } = this.props;

    return (
      <div
        className="options-item"
        key={index}
        onClick={() => this.handleOptionClick(option)}>
        { option[labelKey] }
      </div>
    );
  }
}

// Export
export default AsyncSelect;
