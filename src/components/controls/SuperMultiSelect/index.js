// Vendor Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import BaseSelect from '../../shared/BaseSelect';
import Options from './Options';
import Arrow from '../../shared/Arrow';

// Dropdown Super Multi Select
class SuperMultiSelect extends BaseSelect {
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
      autoComplete: true,
      value: []
    };
    this._renderBadges = this._renderBadges.bind(this);
  }

  // Private
  _setValue(value) {
    const type = typeof value;
    if (type == 'object' && Array.isArray(value)) {
      this.setState({ value });
    }
  }

  _changeOption(newOption) {
    const { value } = this.state;
    const { labelKey, onChange } = this.props;
    let newValues = [];
    newValues = value.concat(newOption);

    this.setState({
      isOptionsOpen: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      selectedOptionIndex: 0
    });
    if (onChange) {
      this.props.onChange(newValues);
    }
    this._updateCurrentOptions(newOption, false);
  }

  _updateCurrentOptions(newOption, add) {
    const { options, currentOptions } = this.state;
    let newOptions = [];
    if (add) {
      newOptions = currentOptions.concat(newOption);
    } else {
      newOptions = this.state.options.filter(option => {
        return this._getOptionLabel(option) != this._getOptionLabel(newOption);
      });
    }
    console.log(newOptions);
    this.setState({ currentOptions: newOptions });
  }

  _renderBadges(badge, index) {
    return (
      <div key={index} className="dropdown-select__badge-block__badge">
        {this._getOptionLabel(badge)}
      </div>
    );
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
      disabled,
      value
    } = this.state;
    return (
      <div className={this._getSelectClassName()}>
        <div>{value && value.length > 0 && value.map(this._renderBadges)}</div>
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
export default SuperMultiSelect;
