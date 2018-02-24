import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { MultiSelect } from 'dropdown-select';

class MultiSelectForm extends Component {
  constructor(props) {
    super(props);
    this.renderMultiSelectField = this.renderMultiSelectField.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    this.props.initialize({ foods: [] });
  }

  // Render
  renderMultiSelectField({ input, options }) {
    return (
      <MultiSelect
        {...input}
        options={options}
        labelKey="label"
        valueKey="id"
        placeholderName={['timeslot', 'timeslots']}
      />
    );
  }

  render() {
    const { handleSubmit, foodValues } = this.props;
    const options = [
      { id: 'Pizza', label: 'Pizza' },
      { id: 'Chocolate', label: 'Chocolate' },
      { id: 'Ice Cream', label: 'Ice Cream' },
      { id: 'Steak', label: 'Steak' },
      { id: 'French Fries', label: 'French Fries' },
      { id: 'Burgers', label: 'Burgers' },
      { id: 'Taco', label: 'Taco' },
      { id: 'Cake', label: 'Cake' }
    ];
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="foods"
          options={options}
          component={this.renderMultiSelectField}
        />
        <button
          className="btn mt-3"
          type="button"
          onClick={() => this.props.reset()}
        >
          Reset
        </button>
      </form>
    );
  }
}

// Redux Form
const ReduxMultiSelectForm = reduxForm({
  // a unique name for the form
  form: 'multiSelectForm'
})(MultiSelectForm);

// Export
export default ReduxMultiSelectForm;
