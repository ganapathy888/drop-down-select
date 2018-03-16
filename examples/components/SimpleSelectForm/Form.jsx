// Vendor Imports
import React from 'react';
import { Field, reduxForm } from 'redux-form';

// Local Imports
import SelectField from '../formFields/SelectField';

const Form = (props) => {
  const { handleSubmit, options } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="country"
        options={options}
        component={SelectField}
        labelKey="name"
        valueKey="id"
      />
      <button className="btn mt-3" type="button" onClick={() => this.props.reset()}>
        Reset
      </button>
    </form>
  );
};

const ReduxForm = reduxForm({
  // a unique name for the form
  form: 'simpleSelectForm',
})(Form);

export default ReduxForm;
