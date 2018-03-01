// Vendor Imports
import React from 'react';

// Local Imports
import BaseOptionsContainer from '../../core/BaseOptionsContainer';
import Option from './Option';

// Options
class OptionsContainer extends BaseOptionsContainer {
  constructor(props) {
    super(props);
    this.state = {
      isOptionsOpen: false,
      focusedOptionIndex: 0,
      options: [],
    };
  }

  findCheckedOption(option) {
    return this.findOptionIndexFromValues(option) !== -1;
  }

  findOptionIndexFromValues(option) {
    const { labelKey } = this.props;
    return this.state.values.findIndex((value) => {
      if (labelKey) {
        return value[labelKey] === option[labelKey];
      }
      return value === option;
    });
  }

  // Render
  renderOption(option, index) {
    const { focusedOptionIndex } = this.state;
    const { labelKey, onOptionClick, onOptionFoucsed } = this.props;
    return (
      <Option
        key={index}
        index={index}
        option={option}
        isChecked={this.findCheckedOption(option)}
        isFocused={focusedOptionIndex === index}
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
      <div role="presentation" className={this.classes()} onMouseDown={this.props.onMouseDown}>
        {this.renderOptions()}
      </div>
    );
  }
}

// Export
export default OptionsContainer;
