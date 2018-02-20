// Vendor Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import Option from './Option';
import classNames from '../../../utils/classNames';

// Options
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedOptionIndex: 0,
      options: []
    };
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
    const {
      selectedOptionIndex,
      focusedOptionIndex,
      options,
      isOptionsOpen
    } = props;
    if (isOptionsOpen) {
      if (options !== this.state.options) {
        this.setState({ options, focusedOptionIndex: 0 });
      }
      if (focusedOptionIndex !== this.state.focusedOptionIndex) {
        this.setState({ focusedOptionIndex }, this._setFocusOption);
      }
      if (selectedOptionIndex !== this.state.selectedOptionIndex) {
        this.setState({ selectedOptionIndex }, this._setFocusOption);
      }
      this._setFocusOption();
    }
  }

  _setFocusOption() {
    let panel, node;
    panel = ReactDOM.findDOMNode(this);
    node = ReactDOM.findDOMNode(this.focusedOptionItem);
    if (node) {
      let nodePos = node.offsetTop + node.offsetHeight;
      let panelPos = panel.offsetHeight + panel.scrollTop;
      if (nodePos < panelPos && node.offsetTop < panel.scrollTop) {
        console.log(1);
        panel.scrollTop -= Math.abs(node.offsetTop - panel.scrollTop);
      } else if (nodePos < panelPos && nodePos > panel.scrollTop) {
        console.log(2, panel.scrollTop);
        return;
      } else if (nodePos == panelPos) {
        console.log(3);
        return;
      } else if (nodePos > panelPos && nodePos > panel.scrollTop) {
        console.log(4);
        panel.scrollTop += Math.abs(nodePos - panelPos);
      } else if (nodePos < panelPos && nodePos == panel.scrollTop) {
        console.log(5);
        panel.scrollTop -= node.offsetHeight;
      } else if (nodePos < panelPos && nodePos < panel.scrollTop) {
        console.log(6);
        panel.scrollTop = node.offsetTop;
      }
    }
  }

  _classes() {
    return classNames(
      {
        'dropdown-select__options': !this.props.optionsClassName,
        'dropdown-select__options-open': this.props.isOptionsOpen,
        'dropdown-select__options-close': !this.props.isOptionsOpen
      },
      this.props.optionsClassName
    );
  }

  _navigateOptions(dir) {
    if (!this.state.isOptionsOpen) {
      this.showOptions(true);
      return;
    }
    let { focusedOptionIndex, currentOptions } = this.state;
    if (dir == 'down') {
      focusedOptionIndex += 1;
    } else if (dir == 'up') {
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
    if (this.state.focusedOptionIndex == index) {
      this.focusedOptionItem = node;
    }
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 40: // Down Arrow
        e.preventDefault();
        e.stopPropagation();
        this._navigateOptions('down');
        break;
      case 38: // Up Arrow
        e.preventDefault();
        e.stopPropagation();
        this._navigateOptions('up');
        break;
      case 13: // Enter
        e.preventDefault();
        e.stopPropagation();
        this._changeOption(currentOptions[focusedOptionIndex]);
        break;
      case 27: // Esc
        this.showOptions(false);
        break;
      case 8: // Backspace
        this.showOptions(true);
        break;
    }
  }

  // Render
  render() {
    const { options } = this.props;
    return (
      <div className={this._classes()} onMouseDown={this.props.onMouseDown}>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions() {
    const { options } = this.state;
    if (options.length > 0) {
      return options.map(this.renderOption.bind(this));
    } else {
      return (
        <div className="dropdown-select__options__option">
          No options found...
        </div>
      );
    }
  }

  renderOption(option, index) {
    const { focusedOptionIndex, selectedOptionIndex } = this.state;
    const { labelKey, onOptionClick, onOptionFoucsed } = this.props;
    return (
      <Option
        key={index}
        index={index}
        option={option}
        isFocused={focusedOptionIndex == index}
        isSelected={selectedOptionIndex == index}
        labelKey={labelKey}
        onClick={onOptionClick}
        ref={node => this.handleOptionRef(node, index)}
        onMouseOver={onOptionFoucsed}
      />
    );
  }
}

// Export
export default Options;
