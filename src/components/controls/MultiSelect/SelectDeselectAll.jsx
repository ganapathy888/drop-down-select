// Vendor Imports
import React, { Component } from 'react';

// Count Badge
class SelectDeselectAll extends Component {
  // Handlers
  onChange(e) {
    this.props.onChange(e.target.checked);
  }

  // Render
  render() {
    return (
      <div className="dropdown-select__select-deselect-all">
        <input
          disabled={this.props.disabled}
          type="checkbox"
          checked={this.props.checked}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

// Export
export default SelectDeselectAll;
