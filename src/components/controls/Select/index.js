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
    this.handleOptionsContainerRef = this.handleOptionsContainerRef.bind(this);
  }

  // Handlers
  handleOptionsContainerRef(ref) {
    this.optionsContainer = ref;
    this.optionsContainerNode = ReactDOM.findDOMNode(ref);
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
            onKeyDown={e => this.optionsContainer.handleKeyDown(e)}
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
          ref={this.handleOptionsContainerRef}
          options={currentOptions}
          focusedOptionIndex={focusedOptionIndex}
          selectedOptionIndex={selectedOptionIndex}
          isOptionsOpen={isOptionsOpen}
          labelKey={this.props.labelKey}
          onOptionClick={this.handleOptionClick}
          onMouseDown={this.handleOptionsMouseDown}
          onOptionFoucsed={this.handleOptionFocused}
        />
      </div>
    );
  }
}

// Export
export default Select;
