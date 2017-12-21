// Vendor Imports
import React, { Component } from 'react';

// Local Imports
import classNames from '../../../utils/classNames';

// Option Component
class Option extends Component {
  // Private
  _classes() {
    const { isFocused, optionClassName } = this.props;
    return classNames(
      {
        'dropdown-select__options__option': !optionClassName,
        'dropdown-select__options__option--focused': isFocused
      },
      optionClassName
    );
  }

  // Render
  render() {
    const { option, index, labelKey } = this.props;
    return (
      <div
        className={this._classes()}
        onClick={() => this.props.onClick(option)}
      >
        {labelKey ? option[labelKey] : option}
      </div>
    );
  }
}

// Export
export default Option;
