// Vendor Imports
import React from 'react';

// Local Imports
import BaseOptionsContainer from '../../core/BaseOptionsContainer';
import Option from './Option';

// Options Container
class OptionsContainer extends BaseOptionsContainer {
  constructor(props) {
    super(props);
    this.state = {
      focusedOptionIndex: 0,
      options: [],
    };
  }

  // Render

  renderOption(option, index) {
    const { focusedOptionIndex, selectedOptionIndex } = this.state;
    const { labelKey, onOptionClick, onOptionFoucsed } = this.props;
    return (
      <Option
        key={index}
        index={index}
        option={option}
        isFocused={focusedOptionIndex === index}
        isSelected={selectedOptionIndex === index}
        labelKey={labelKey}
        onClick={onOptionClick}
        ref={node => this.handleOptionRef(node, index)}
        onMouseOver={onOptionFoucsed}
        onFocus={() => undefined}
      />
    );
  }

  render() {
    return (
      <div
        ref={(node) => {
          this.panel = node;
        }}
        role="presentation"
        className={this.classes()}
        onMouseDown={this.props.onMouseDown}
      >
        {this.renderOptions()}
      </div>
    );
  }
}

// Export
export default OptionsContainer;
