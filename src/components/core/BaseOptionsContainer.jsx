// Vendor Imports
import React, { Component } from 'react';

// Local Imports
import classNames from '../../utils/classNames';

// Options Container
class BaseOptionsContainer extends Component {
  // Component LifeCycle
  componentDidMount() {
    this.loadProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadProps(nextProps);
  }

  // Private
  setFocusOption() {
    const panelPos = this.panel.offsetHeight + this.panel.scrollTop;
    const nodePos = this.focusedOption.offsetTop + this.focusedOption.offsetHeight;
    if (nodePos < panelPos && this.focusedOption.offsetTop < this.panel.scrollTop) {
      console.log(1);
      this.panel.scrollTop -= Math.abs(this.focusedOption.offsetTop - this.panel.scrollTop);
    } else if (nodePos < panelPos && nodePos > this.panel.scrollTop) {
      console.log(2, this.panel.scrollTop);
    } else if (nodePos === panelPos) {
      console.log(3);
    } else if (nodePos > panelPos && nodePos > this.panel.scrollTop) {
      console.log(4);
      this.panel.scrollTop += Math.abs(nodePos - panelPos);
    } else if (nodePos < panelPos && nodePos === this.panel.scrollTop) {
      console.log(5);
      this.panel.scrollTop -= this.focusedOption.offsetHeight;
    } else if (nodePos < panelPos && nodePos < this.panel.scrollTop) {
      console.log(6);
      this.panel.scrollTop = this.focusedOption.offsetTop;
    }
  }

  loadProps(props) {
    const {
      selectedOptionIndex, focusedOptionIndex, options, isOptionsOpen,
    } = props;
    if (isOptionsOpen) {
      if (options !== this.state.options) {
        this.setState({ options, focusedOptionIndex: 0 });
      }
      if (focusedOptionIndex !== this.state.focusedOptionIndex) {
        this.setState({ focusedOptionIndex }, this.setFocusOption);
      }
      if (selectedOptionIndex !== this.state.selectedOptionIndex) {
        this.setState({ selectedOptionIndex }, this.setFocusOption);
      }
      this.setFocusOption();
    }
  }

  classes() {
    return classNames(
      {
        'dropdown-select__options': !this.props.optionsClassName,
        'dropdown-select__options-open': this.props.isOptionsOpen,
        'dropdown-select__options-close': !this.props.isOptionsOpen,
      },
      this.props.optionsClassName,
    );
  }

  navigateOptions(dir) {
    if (!this.state.isOptionsOpen) {
      this.showOptions(true);
      return;
    }
    let { focusedOptionIndex } = this.state;
    const { currentOptions } = this.state;
    if (dir === 'down') {
      focusedOptionIndex += 1;
    } else if (dir === 'up') {
      focusedOptionIndex -= 1;
    }
    if (focusedOptionIndex < 0) {
      focusedOptionIndex = currentOptions.length - 1;
    } else if (focusedOptionIndex > currentOptions.length - 1) {
      focusedOptionIndex = 0;
    }
    this.setState({ focusedOptionIndex });
  }

  // Handler
  handleOptionRef(node, index) {
    if (this.state.focusedOptionIndex === index) {
      this.focusedOption = node;
    }
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 40: // Down Arrow
        e.preventDefault();
        e.stopPropagation();
        this.navigateOptions('down');
        break;
      case 38: // Up Arrow
        e.preventDefault();
        e.stopPropagation();
        this.navigateOptions('up');
        break;
      case 13: // Enter
        e.preventDefault();
        e.stopPropagation();
        break;
      case 27: // Esc
        this.showOptions(false);
        break;
      case 8: // Backspace
        this.showOptions(true);
        break;
      default:
        break;
    }
  }

  // Render
  renderOptions() {
    const { options } = this.state;
    if (options.length > 0) {
      return options.map(this.renderOption.bind(this));
    }
    return <div className="dropdown-select__options__option">No options found...</div>;
  }
}

// Export
export default BaseOptionsContainer;
