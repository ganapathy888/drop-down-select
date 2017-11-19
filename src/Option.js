// Vendor Imports
import React, { Component } from 'react';

// Local Imports
import classNames from './classNames';

// Option Component
class Option extends Component {
  // Render
  render() {
    const { option, index, labelKey, isFocused } = this.props;
    const styles = classNames('options-item', {
      "options-item-hovered": isFocused,
    });
    return (
      <div
        className={styles}
        onClick={() => this.props.onClick(option, index)}>
        { labelKey ? option[labelKey] : option }
      </div>
    );
  }
}

// Export
export default Option;
