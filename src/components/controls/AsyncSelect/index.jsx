// Vendor Imports
import React from 'react';

// Local Imports
import BaseSelect from '../../core/BaseSelect';
import OptionsContainer from '../Select/OptionsContainer';
import Arrow from '../../core/Arrow';
import Spinner from '../../core/Spinner';

// Dropdown Async Select
class AsyncSelect extends BaseSelect {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Search',
      options: [],
      currentOptions: [],
      isOptionsOpen: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      selectedOptionIndex: 0,
      inputFoucsed: false,
      isLoading: false,
      disabled: false,
    };
  }

  // Handlers
  handleInputChange(e) {
    this.loadOptions(e.target.value);
    this.setState({ focusedOptionIndex: 0 });
  }

  // Private
  loadOptions(newValue) {
    const { fetchOptions } = this.props;
    if (fetchOptions) {
      this.setState({ isLoading: true });
      fetchOptions(newValue).then((response) => {
        this.setState({ isLoading: false });
        if (Array.isArray(response)) {
          this.setOptions(response);
        }
      });
    }
  }

  // Render
  renderSpinnerOrArrow() {
    const { isLoading, isOptionsOpen, disabled } = this.state;
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <Arrow disabled={disabled} isOptionsOpen={isOptionsOpen} onShowOptions={this.showOptions} />
    );
  }

  render() {
    const {
      placeholder,
      isOptionsOpen,
      currentOptions,
      focusedOptionIndex,
      selectedOptionIndex,
      disabled,
    } = this.state;
    return (
      <div className={this.getSelectClassName()}>
        <div className="dropdown-select__container">
          <input
            tabIndex={this.props.tabIndex}
            className={this.getInputClassName()}
            disabled={disabled}
            ref={(node) => {
              this.input = node;
            }}
            placeholder={placeholder}
            type="text"
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            onChange={this.handleInputChange}
            onClick={this.handleInputClick}
            onKeyDown={this.handleKeyPress}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {this.renderSpinnerOrArrow()}
        </div>
        <OptionsContainer
          ref={(node) => {
            this.optionsContainer = node;
          }}
          options={currentOptions}
          focusedOptionIndex={focusedOptionIndex}
          selectedOptionIndex={selectedOptionIndex}
          isOptionsOpen={isOptionsOpen}
          labelKey={this.props.labelKey}
          onOptionClick={this.handleOptionClick}
          onMouseDown={this.handleOptionsMouseDown}
          onOptionFoucsed={this.handleOptionFocused}
        />
      </div>
    );
  }
}

// Export
export default AsyncSelect;
