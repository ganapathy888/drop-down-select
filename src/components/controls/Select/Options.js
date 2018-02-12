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
    const { focusedOptionIndex, options, isOptionsOpen } = props;
    if (isOptionsOpen) {
      if (focusedOptionIndex !== this.state.focusedOptionIndex) {
        this.setState({ focusedOptionIndex }, this._setFocusOption);
      }
      this.setState({ options });
    } else {
      this._setFocusOption();
    }
  }

  _setFocusOption() {
    let panel, node;
    panel = ReactDOM.findDOMNode(this);
    node = ReactDOM.findDOMNode(this.focusedOptionItem);
    if (node) {
      let nodePos = node.offsetHeight + node.offsetTop;
      let panelPos = panel.offsetHeight + panel.scrollTop;
      if (nodePos < panelPos && nodePos <= panel.offsetHeight) {
        panel.scrollTop = 0;
      } else if (
        nodePos <= panelPos &&
        nodePos + panel.offsetHeight <= panelPos
      ) {
        panel.scrollTop = panel.scrollTop - node.offsetHeight;
      } else if (
        nodePos <= panelPos &&
        nodePos + panel.offsetHeight > panelPos
      ) {
        return;
      } else {
        let diff = Math.abs(nodePos - panelPos);
        panel.scrollTop += diff;
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

  // Handler
  handleOptionRef(node, index) {
    if (this.state.focusedOptionIndex == index) {
      this.focusedOptionItem = node;
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
    const { focusedOptionIndex } = this.state;
    const { labelKey, onOptionClick, onOptionFoucsed } = this.props;
    return (
      <Option
        key={index}
        index={index}
        option={option}
        isFocused={focusedOptionIndex == index}
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
