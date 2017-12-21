import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Select } from '../../../src';

class Form extends Component {
  // Render
  render() {
    const { handleSubmit, options } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="country" options={options} component={this.renderField} />
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

  renderField({ input, options }) {
    return (
      <Select {...input} options={options} labelKey="name" valueKey="id" />
    );
  }
}

const ReduxForm = reduxForm({
  // a unique name for the form
  form: 'simpleSelectForm'
})(Form);

export default ReduxForm;
