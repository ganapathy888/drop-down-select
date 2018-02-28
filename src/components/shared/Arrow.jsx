// Vendor Imports
import React, { Component } from 'react';

// Arrow Component
class Arrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionsOpen: false,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    this.loadProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadProps(nextProps);
  }

  // Private
  loadProps(props) {
    const { isOptionsOpen } = props;
    this.setState({ isOptionsOpen });
  }

  // Handlers
  handleMouseDown(e) {
    e.preventDefault();
    const { onShowOptions, disabled } = this.props;
    if (!disabled) {
      onShowOptions(!this.state.isOptionsOpen);
    }
  }

  // Render
  renderArrow() {
    if (this.state.isOptionsOpen) {
      return <i className="dropdown-select__arrow-icon arrow-up" />;
    }
    return <i className="dropdown-select__arrow-icon arrow-down" />;
  }

  render() {
    return (
      <div
        role="button"
        tabIndex="-1"
        className="dropdown-select__arrow"
        onMouseDown={this.handleMouseDown}
      >
        {this.renderArrow()}
      </div>
    );
  }
}

// Export
export default Arrow;
