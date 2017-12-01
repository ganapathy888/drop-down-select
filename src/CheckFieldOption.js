// Vendor Imports
import React, { Component } from "react";

// Local Imports
import classNames from "./classNames";

// Option Component
class CheckFieldOption extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // Handlers
  handleClick() {
    const { option, index, isChecked } = this.props;
    this.props.onClick(option, index, !isChecked);
  }

  // Render
  render() {
    const { option, index, labelKey, isFocused, isChecked } = this.props;
    const styles = classNames("options-item", "checkfield-options-item", {
      "options-item-hovered": isFocused
    });

    return (
      <div className={styles} onClick={this.handleClick}>
        <input type="checkbox" checked={isChecked} readOnly />
        {labelKey ? option[labelKey] : option}
      </div>
    );
  }
}

// Export
export default CheckFieldOption;
