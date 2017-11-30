// Vendor Imports
import React, { Component } from 'react';

// Arrow Component
class Arrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionsVisible: false,
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    const { isOptionsVisible } = this.props;
    this.setState({ isOptionsVisible });
  }

  componentWillReceiveProps(nextProps) {
    const { isOptionsVisible } = nextProps;
    this.setState({ isOptionsVisible });
  }

  // Handlers
  handleMouseDown(e, flag) {
    e.stopPropagation();
    e.preventDefault();
    this.props.showOptions(flag);
  }

  // Render
  render() {
    if (this.state.isOptionsVisible) {
      return (
        <i
          className="options-arrow arrow-up"
          onMouseDown={(e) => this.handleMouseDown(e, false)}
          />
      );
    } else {
      return (
        <i
          className="options-arrow arrow-down"
          onMouseDown={(e) => this.handleMouseDown(e, true)}
          />
      );
    }
  }
}

// Export
export default Arrow;
