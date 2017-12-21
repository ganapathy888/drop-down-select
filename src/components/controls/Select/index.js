// Vendor Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import BaseSelect from '../../shared/BaseSelect';
import Options from './Options';
import Arrow from '../../shared/Arrow';

// Dropdown Select
class Select extends BaseSelect {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Select',
      options: [],
      currentOptions: [],
      isOptionsOpen: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      selectedOptionIndex: 0,
      inputFoucsed: false,
      disabled: false,
      autoComplete: true
    };
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
            disabled={disabled}
            className={this._getInputClassName()}
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
          <Arrow
            disabled={disabled}
            isOptionsOpen={isOptionsOpen}
            onShowOptions={this.showOptions}
          />
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
}

// Export
export default Select;
