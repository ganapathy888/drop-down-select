// Vendor Imports
import React, { Component } from 'react';

// Local Imports
import classNames from '../../../utils/classNames';

// Option Component
class Option extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // Private
  _classes() {
    const { isFocused, optionClassName } = this.props;
    return classNames(
      {
        'dropdown-select__options__option': !optionClassName,
        'dropdown-select__options__checkbox-option': !optionClassName,
        'dropdown-select__options__option--focused': isFocused
      },
      optionClassName
    );
  }

  // Handlers
  handleClick() {
    const { option, index, isChecked } = this.props;
    this.props.onClick(option, index, !isChecked);
  }

  // Render
  render() {
    const { option, index, labelKey, isFocused, isChecked } = this.props;

    return (
      <div className={this._classes()} onClick={this.handleClick}>
        <input type="checkbox" checked={isChecked} readOnly />
        {labelKey ? option[labelKey] : option}
      </div>
    );
  }
}

// Export
export default Option;
