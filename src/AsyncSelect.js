// Vendor Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import classNames from './classNames';
import Option from './Option';
import Arrow from './Arrow';

// Async Dropdown Select
class AsyncSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Search...',
      options: [],
      currentOptions: [],
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
    this.renderSpinnerOrArrow = this.renderSpinnerOrArrow.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    const { options, value, labelKey, placeholder } = this.props;
    if (options) {
      this.setOptions(options);
    }
    const inputValue = typeof value == 'object' ? value[labelKey] : value;
    if (inputValue) {
      this.input.value = inputValue;
    }
    if (placeholder) {
      this.setState({ placeholder });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { options, value, labelKey } = nextProps;
    if (options) {
      this.setOptions(options);
    }
    const inputValue = typeof value == 'object' ? value[labelKey] : value;
    if (inputValue != undefined) {
      this.input.value = inputValue;
    }
  }

  // Handlers
  handleInputChange(newValue) {
    if (this.props.fetchOptions) {
      this.setState({ isLoading: true });
      this.props.fetchOptions(newValue.target.value).then(response => {
        this.setState({ isLoading: false });
        if (Array.isArray(response)) {
          this.setOptions(response);
        }
      });
    }
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

  handleOptionClick(newValue, index) {
    if (newValue == this.props.value) {
      this.input.value = this.props.value[this.props.labelKey];
    } else {
      if (this.props.onChange) {
        this.props.onChange(newValue);
      }
    }
    this.setState({
      showOptions: false,
      isOptionSelected: false,
      focusedOptionIndex: index
    });
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
        this.handleOptionClick(
          currentOptions[focusedOptionIndex],
          focusedOptionIndex
        );
        break;
      case 27: // Esc
        this.showOptions(false);
        break;
    }
  }

  // Private
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
    } else {
      this.setState({ showOptions: false, inputFoucsed: false });
    }
  }

  setOptions(options) {
    let optionsArr = [];
    if (this.props.defaultOption) {
      optionsArr = optionsArr.concat(this.props.defaultOption);
    }
    optionsArr = optionsArr.concat(options);
    this.setState({ options: optionsArr, currentOptions: optionsArr });
  }

  // Render
  render() {
    const { placeholder, inputFoucsed } = this.state;
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
          placeholder={placeholder}
          type="text"
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onClick={this.handleInputClick}
          onKeyDown={this.handleKeyPress}
        />
        {this.renderSpinnerOrArrow()}
        {this.renderOptionsContainer()}
      </div>
    );
  }

  renderSpinnerOrArrow() {
    const { isLoading, showOptions } = this.state;
    if (isLoading) {
      return <div className="spinner input-spinner" />;
    } else {
      return (
        <Arrow isOptionsVisible={showOptions} showOptions={this.showOptions} />
      );
    }
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
      <Option
        key={index}
        index={index}
        option={option}
        isFocused={this.state.focusedOptionIndex == index}
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
export default AsyncSelect;
