// Vendor Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import classNames from './classNames';
import CheckFieldOption from './CheckFieldOption';
import Arrow from './Arrow';
import SelectAllControl from './SelectAllControl';

// Dropdown Select
class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Select',
      options: [],
      currentOptions: [],
      values: [],
      showOptions: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      inputFoucsed: false
    };
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.handleOptionsMouseDown = this.handleOptionsMouseDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderOptionsContainer = this.renderOptionsContainer.bind(this);
    this.checkAllOptions = this.checkAllOptions.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    const { options, value, placeholder } = this.props;
    if (value) {
      this.setState({ values: value });
    }
    this.setOptions(options);
    if (placeholder) {
      this.setState({ placeholder });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { options, value } = nextProps;
    if (value) {
      this.setState({ values: value });
    }
    this.setOptions(options);
  }

  // Handlers
  handleInputChange(newValue) {
    this.filterOptions(newValue.target.value);
  }

  handleInputClick(event) {
    this.setState({ inputFoucsed: true });
    this.showOptions(true);
  }

  handleInputBlur(event) {
    this.setState({ inputFoucsed: false });
    if (!this.state.isOptionSelected || this.state.currentOptions.length == 0) {
      this.setState({ showOptions: false, isOptionSelected: false });
    }
  }

  handleOptionClick(option, index, isChecked) {
    this.input.focus();
    const { values } = this.state;
    const { labelKey } = this.props;
    let newValues = [];
    if (isChecked) {
      newValues = values.concat(option);
    } else {
      newValues = values.filter(item => {
        if (labelKey) {
          return item[labelKey] !== option[labelKey];
        } else {
          return item !== option;
        }
      });
    }
    this.setState({
      isOptionSelected: false,
      focusedOptionIndex: index,
      inputFoucsed: true
    });
    this.props.onChange(newValues);
  }

  handleOptionsMouseDown(e) {
    if (e.target !== this.optionsContainer) {
      this.setState({ isOptionSelected: true });
    }
  }

  handleKeyPress(e) {
    this.showOptions(true);
    const { currentOptions, focusedOptionIndex } = this.state;
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
        const option = currentOptions[focusedOptionIndex];
        this.handleOptionClick(
          option,
          focusedOptionIndex,
          !this.findCheckedOption(option)
        );
        break;
      case 27: // Esc
        this.showOptions(false);
        break;
    }
  }

  checkAllOptions(flag) {
    flag ? this.props.onChange(this.state.options) : this.props.onChange([]);
  }

  // Private
  filterOptions(newValue) {
    const { labelKey } = this.props;
    const { options } = this.state;
    let newOptions = [];
    if (newValue.length == 0) {
      newOptions = options;
    } else {
      newOptions = options.filter(option => {
        let label = typeof option == 'object' ? option[labelKey] : option;
        return label.toLowerCase().indexOf(newValue.toLowerCase()) !== -1;
      });
    }
    this.setState({ currentOptions: newOptions });
  }

  navigateOptions(dir) {
    if (!this.state.showOptions) {
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
    this.setState({ focusedOptionIndex }, () => {
      this.setFocusOption();
    });
  }

  setFocusOption() {
    let panel, node;
    panel = this.optionsContainer;
    node = ReactDOM.findDOMNode(this.focusedOptionItem);
    if (node) {
      panel.scrollTop = node.offsetTop - panel.offsetTop;
    }
  }

  showOptions(flag) {
    if (flag) {
      this.input.focus();
      this.setState({ showOptions: true, inputFoucsed: true });
      this.filterOptions(this.input.value);
    } else {
      this.setState({ showOptions: false, inputFoucsed: false });
    }
  }

  setOptions(options) {
    this.setState({ options, currentOptions: options });
  }

  findCheckedOption(option) {
    return this.findOptionIndexFromValues(option) != -1;
  }

  findOptionIndexFromValues(option) {
    const { labelKey } = this.props;
    return this.state.values.findIndex(value => {
      if (labelKey) {
        return value[labelKey] == option[labelKey];
      } else {
        return value == option;
      }
    });
  }

  // Render
  render() {
    const { options, values, showOptions, inputFoucsed } = this.state;
    const inputClasses = classNames(
      {
        'Dropdown-Select-input': !this.props.inputClassName
      },
      this.props.inputClassName
    );

    return (
      <div className="Dropdown-Select">
        <input
          className={inputClasses}
          ref={input => (this.input = input)}
          placeholder={this.renderPlaceholder()}
          type="text"
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onClick={this.handleInputClick}
          onKeyDown={this.handleKeyPress}
        />
        <SelectAllControl
          checked={options.length == values.length}
          onChange={this.checkAllOptions}
        />
        <Arrow isOptionsVisible={showOptions} showOptions={this.showOptions} />
        {this.renderOptionsContainer()}
      </div>
    );
  }

  renderPlaceholder() {
    const { placeholder, values, options } = this.state;
    let itemsCount = values.length;
    if (itemsCount == options.length) {
      return 'All Items';
    }
    return itemsCount > 0 ? `${itemsCount} Item(s)` : 'Select';
  }

  renderOptionsContainer() {
    const { showOptions, currentOptions } = this.state;
    const styles = classNames('options-container', {
      show: showOptions,
      hide: !showOptions
    });
    return (
      <div
        ref={el => (this.optionsContainer = el)}
        className={styles}
        onMouseDown={this.handleOptionsMouseDown}
      >
        {this.renderOptions(currentOptions)}
      </div>
    );
  }

  renderOptions(currentOptions) {
    if (currentOptions.length > 0) {
      return currentOptions.map(this.renderOption);
    } else {
      return <div className="options-item">No options found...</div>;
    }
  }

  renderOption(option, index) {
    return (
      <CheckFieldOption
        key={index}
        index={index}
        option={option}
        isFocused={this.state.focusedOptionIndex == index}
        isChecked={this.findCheckedOption(option)}
        labelKey={this.props.labelKey}
        onClick={this.handleOptionClick}
        ref={el => {
          if (this.state.focusedOptionIndex == index) {
            this.focusedOptionItem = el;
          }
        }}
      />
    );
  }
}

// Export
export default MultiSelect;
