// Vendor Imports
import React, { Component } from 'react';

// Count Badge
class SelectAllControl extends Component {
  // Handlers
  onChange(e) {
    this.props.onChange(e.target.checked);
  }

  // Render
  render() {
    return (
      <div className="select-all-control">
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}

// Export
export default SelectAllControl;
