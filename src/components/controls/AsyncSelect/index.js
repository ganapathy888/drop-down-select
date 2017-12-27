// Vendor Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import BaseSelect from '../../shared/BaseSelect';
import Options from '../Select/Options';
import Arrow from '../../shared/Arrow';
import Spinner from '../../shared/Spinner';

// Dropdown Async Select
class AsyncSelect extends BaseSelect {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Search',
      options: [],
      currentOptions: [],
      isOptionsOpen: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      selectedOptionIndex: 0,
      inputFoucsed: false,
      isLoading: false,
      disabled: false
    };
  }

  // Handlers
  handleInputChange(e) {
    this._loadOptions(e.target.value);
    this.setState({ focusedOptionIndex: 0 });
  }

  // Private
  _loadOptions(newValue) {
    const { fetchOptions, labelKey } = this.props;
    if (this.props.fetchOptions) {
      this.setState({ isLoading: true });
      this.props.fetchOptions(newValue).then(response => {
        this.setState({ isLoading: false });
        if (Array.isArray(response)) {
          this._setOptions(response);
        }
      });
    }
  }

  // Render
  render() {
    const {
      placeholder,
      isOptionsOpen,
      inputFoucsed,
      currentOptions,
      focusedOptionIndex,
      selectedOptionIndex,
      disabled
    } = this.state;
    return (
      <div className={this._getSelectClassName()}>
        <div className="dropdown-select__container">
          <input
            tabIndex={this.props.tabIndex}
            className={this._getInputClassName()}
            disabled={disabled}
            ref={input => (this.input = input)}
            placeholder={placeholder}
            type="text"
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            onChange={this.handleInputChange}
            onClick={this.handleInputClick}
            onKeyDown={this.handleKeyPress}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {this.renderSpinnerOrArrow()}
        </div>
        <Options
          ref={el => (this.optionsContainer = ReactDOM.findDOMNode(el))}
          options={currentOptions}
          focusedOptionIndex={focusedOptionIndex}
          selectedOptionIndex={selectedOptionIndex}
          isOptionsOpen={isOptionsOpen}
          labelKey={this.props.labelKey}
          onOptionClick={this.handleOptionClick}
          onMouseDown={this.handleOptionsMouseDown}
        />
      </div>
    );
  }

  renderSpinnerOrArrow() {
    const { isLoading, isOptionsOpen, disabled } = this.state;
    if (isLoading) {
      return <Spinner />;
    } else {
      return (
        <Arrow
          disabled={disabled}
          isOptionsOpen={isOptionsOpen}
          onShowOptions={this.showOptions}
        />
      );
    }
  }
}

// Export
export default AsyncSelect;
