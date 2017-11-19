// Vendor Imports
import React, { Component } from 'react';

// Arrow Component
class Arrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      inputFoucsed: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    this.setState({ inputFoucsed: this.props.inputFoucsed });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ inputFoucsed: nextProps.inputFoucsed });
  }

  // Handlers
  handleClick(e, flag) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ open: flag })
    this.props.showOptions(flag);
  }

  // Render
  render() {
    if (this.state.open || this.state.inputFoucsed) {
      return (
        <i
          className="options-arrow arrow-up"
          onClick={(e) => this.handleClick(e, false)}
          />
      );
    } else {
      return (
        <i
          className="options-arrow arrow-down"
          onClick={(e) => this.handleClick(e, true)}
          />
      );
    }
  }
}

// Export
export default Arrow;
