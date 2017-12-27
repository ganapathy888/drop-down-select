// Vendor Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import BaseSelect from '../../shared/BaseSelect';
import Options from './Options';
import Arrow from '../../shared/Arrow';
import SelectDeselectAll from './SelectDeselectAll';

// Dropdown Select
class MultiSelect extends BaseSelect {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: [],
      currentOptions: [],
      isOptionsOpen: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      selectedOptionIndex: 0,
      inputFoucsed: false,
      disabled: false
    };
    this.handleCheckAllOptions = this.handleCheckAllOptions.bind(this);
  }

  // Handlers
  handleOptionClick(option) {
    this.input.focus();
    this._changeOption(option);
  }

  handleCheckAllOptions(flag) {
    flag ? this.props.onChange(this.state.options) : this.props.onChange([]);
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
    const isChecked = !this._findCheckedOption(newOption);
    if (isChecked) {
      newValues = value.concat(newOption);
    } else {
      newValues = value.filter(item => {
        if (labelKey) {
          return item[labelKey] !== newOption[labelKey];
        } else {
          return item !== newOption;
        }
      });
    }
    this.setState({
      isOptionSelected: false,
      focusedOptionIndex: this._findOptionIndexFromOptions(newOption),
      inputFoucsed: true
    });
    if (onChange) {
      this.props.onChange(newValues);
    }
  }

  _findCheckedOption(option) {
    return this._findOptionIndexFromValues(option) != -1;
  }

  _findOptionIndexFromValues(option) {
    const { labelKey } = this.props;
    return this.state.value.findIndex(value => {
      if (labelKey) {
        return value[labelKey] == option[labelKey];
      } else {
        return value == option;
      }
    });
  }

  _renderPlaceholder() {
    const { placeholder, value, options } = this.state;
    let itemsCount = value.length;
    let singularName = 'Item';
    let pluralName = 'Items';
    if (typeof placeholder == 'string' && placeholder.length > 0) {
      singularName = pluralName = placeholder;
    } else if (typeof placeholder == 'object' && Array.isArray(placeholder)) {
      singularName = placeholder[0];
      pluralName = placeholder[1];
    }
    if (itemsCount == options.length) {
      return `All ${pluralName}`;
    } else if (itemsCount == 1) {
      return `${itemsCount} ${singularName}`;
    } else if (itemsCount > 0) {
      return `${itemsCount} ${pluralName}`;
    } else {
      return `Select ${singularName}`;
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
      options,
      value,
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
            placeholder={this._renderPlaceholder()}
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
          <SelectDeselectAll
            disabled={disabled}
            checked={options.length > 0 && options.length == value.length}
            onChange={this.handleCheckAllOptions}
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
          values={value}
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
export default MultiSelect;
