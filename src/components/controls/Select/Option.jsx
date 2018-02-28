// Vendor Imports
import React, { Component } from 'react';

// Local Imports
import classNames from '../../../utils/classNames';

// Option Component
class Option extends Component {
  // Private
  classes() {
    const { isSelected, isFocused, optionClassName } = this.props;
    return classNames(
      {
        'dropdown-select__options__option': !optionClassName,
        'dropdown-select__options__option--focused': isFocused,
        'dropdown-select__options__option--selected': isSelected,
      },
      optionClassName,
    );
  }

  // Render
  render() {
    const {
      option, index, labelKey, isSelected,
    } = this.props;
    return (
      <div
        tabIndex="-1"
        role="option"
        aria-selected={isSelected}
        className={this.classes()}
        onClick={() => this.props.onClick(option)}
        onMouseOver={() => this.props.onMouseOver(index)}
        onFocus={() => undefined}
        onKeyDown={() => undefined}
      >
        {labelKey ? option[labelKey] : option}
      </div>
    );
  }
}

// Export
export default Option;
