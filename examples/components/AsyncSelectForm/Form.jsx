// Vendor Imports
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import 'whatwg-fetch';

// Local Imports
import { AsyncSelectField } from '../formFields/AsyncSelectField';

// Async Select Form
class Form extends Component {
  // Static
  static fetchOptions(value) {
    return fetch(`https://api.cdnjs.com/libraries?search=${value}`)
      .then(response => response.json())
      .then(json => json.results.slice(0, 50))
      .catch((ex) => {
        console.log('parsing failed', ex);
      });
  }

  // Render
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="lib" fetchOptions={Form.fetchOptions} component={AsyncSelectField} />
        <button className="btn mt-3" type="button" onClick={() => this.props.reset()}>
          Reset
        </button>
      </form>
    );
  }
}

const ReduxForm = reduxForm({
  // a unique name for the form
  form: 'asyncSelectFrom',
})(Form);

export default ReduxForm;
