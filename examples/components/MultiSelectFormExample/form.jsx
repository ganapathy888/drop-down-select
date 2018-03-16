// Vendor Imports
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// Local Imports
import MultiSelectField from '../formFields/MultiSelectField';

// Component
class MultiSelectForm extends Component {
  // Private
  static options() {
    return [
      { id: 'Pizza', label: 'Pizza' },
      { id: 'Chocolate', label: 'Chocolate' },
      { id: 'Ice Cream', label: 'Ice Cream' },
      { id: 'Steak', label: 'Steak' },
      { id: 'French Fries', label: 'French Fries' },
      { id: 'Burgers', label: 'Burgers' },
      { id: 'Taco', label: 'Taco' },
      { id: 'Cake', label: 'Cake' },
    ];
  }

  // Component LifeCycle
  componentDidMount() {
    this.props.initialize({ foods: [] });
  }

  // Render
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="foods" options={MultiSelectForm.options()} component={MultiSelectField} />
        <button className="btn mt-3" type="button" onClick={() => this.props.reset()}>
          Reset
        </button>
      </form>
    );
  }
}

// Redux Form
const ReduxMultiSelectForm = reduxForm({
  // a unique name for the form
  form: 'multiSelectForm',
})(MultiSelectForm);

// Export
export default ReduxMultiSelectForm;
