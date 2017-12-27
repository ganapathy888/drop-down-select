// Vendor Imports
import React, { Component } from 'react';

// Arrow Component
class Arrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionsOpen: false
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    this._loadProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._loadProps(nextProps);
  }

  // Private
  _loadProps(props) {
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
  render() {
    return (
      <div
        className="dropdown-select__arrow"
        onMouseDown={this.handleMouseDown}
      >
        {this.renderArrow()}
      </div>
    );
  }

  renderArrow() {
    if (this.state.isOptionsOpen) {
      return <i className="dropdown-select__arrow-icon arrow-up" />;
    } else {
      return <i className="dropdown-select__arrow-icon arrow-down" />;
    }
  }
}

// Export
export default Arrow;
