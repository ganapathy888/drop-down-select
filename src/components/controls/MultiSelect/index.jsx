// Vendor Imports
import React from 'react';

// Local Imports
import BaseSelect from '../../core/BaseSelect';
import OptionsContainer from './OptionsContainer';
import Arrow from '../../core/Arrow';
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
      disabled: false,
    };
    this.handleCheckAllOptions = this.handleCheckAllOptions.bind(this);
  }

  // Handlers
  handleOptionClick(option) {
    this.input.focus();
    this.changeOption(option);
  }

  handleCheckAllOptions(flag) {
    flag ? this.props.onChange(this.state.options) : this.props.onChange([]);
  }

  // Private
  setValue(value) {
    const type = typeof value;
    if (type === 'object' && Array.isArray(value)) {
      this.setState({ value });
    }
  }

  changeOption(newOption) {
    const { value } = this.state;
    const { labelKey, onChange } = this.props;
    let newValues = [];
    const isChecked = !this.findCheckedOption(newOption);
    if (isChecked) {
      newValues = value.concat(newOption);
    } else {
      newValues = value.filter((item) => {
        if (labelKey) {
          return item[labelKey] !== newOption[labelKey];
        }
        return item !== newOption;
      });
    }
    this.setState({
      isOptionSelected: false,
      focusedOptionIndex: this.findOptionIndexFromOptions(newOption),
      inputFoucsed: true,
    });
    if (onChange) {
      this.props.onChange(newValues);
    }
  }

  findCheckedOption(option) {
    return this.findOptionIndexFromValues(option) !== -1;
  }

  findOptionIndexFromValues(option) {
    const { labelKey } = this.props;
    return this.state.value.findIndex((value) => {
      if (labelKey) {
        return value[labelKey] === option[labelKey];
      }
      return value === option;
    });
  }

  // Render
  renderPlaceholder() {
    const { placeholder, value, options } = this.state;
    const itemsCount = value.length;
    let singularName = 'Item';
    let pluralName = 'Items';
    if (typeof placeholder === 'string' && placeholder.length > 0) {
      singularName = placeholder;
      pluralName = placeholder;
    } else if (typeof placeholder === 'object' && Array.isArray(placeholder)) {
      [singularName] = placeholder;
      [pluralName] = placeholder;
    }
    if (itemsCount === options.length) {
      return `All ${pluralName}`;
    } else if (itemsCount === 1) {
      return `${itemsCount} ${singularName}`;
    } else if (itemsCount > 0) {
      return `${itemsCount} ${pluralName}`;
    }
    return `Select ${singularName}`;
  }

  render() {
    const {
      isOptionsOpen,
      currentOptions,
      focusedOptionIndex,
      selectedOptionIndex,
      options,
      value,
      disabled,
    } = this.state;
    return (
      <div className={this.getSelectClassName()}>
        <div className="dropdown-select__container">
          <input
            tabIndex={this.props.tabIndex}
            disabled={disabled}
            className={this.getInputClassName()}
            ref={(node) => {
              this.input = node;
            }}
            placeholder={this.renderPlaceholder()}
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
            checked={options.length > 0 && options.length === value.length}
            onChange={this.handleCheckAllOptions}
          />
          <Arrow
            disabled={disabled}
            isOptionsOpen={isOptionsOpen}
            onShowOptions={this.showOptions}
          />
        </div>
        <OptionsContainer
          ref={(node) => {
            this.optionsContainer = node;
          }}
          options={currentOptions}
          values={value}
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
export default MultiSelect;
