import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { MultiSelect } from '../../../src';

class MultiSelectForm extends Component {
  // Render
  renderMultiSelectField({ input, options }) {
    return (
      <MultiSelect
        {...input}
        options={options}
        labelKey="label"
        valueKey="id"
      />
    );
  }

  render() {
    const { handleSubmit, foodValues } = this.props;
    const options = [
      { id: 'Cake', label: 'Cake' },
      { id: 'Ice Cream', label: 'Ice Cream' },
      { id: 'Burger', label: 'Burger' },
      { id: 'Idly', label: 'Idly' },
      { id: 'Dosai', label: 'Dosai' }
    ];
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="foods"
          options={options}
          component={this.renderMultiSelectField}
        />
        <button className="btn btn-primary mt-3" type="submit">
          Submit
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
