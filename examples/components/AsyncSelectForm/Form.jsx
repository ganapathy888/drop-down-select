// Vendor Imports
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import 'whatwg-fetch';

// Local Imports
import { AsyncSelect } from 'dropdown-select';

// Async Select Form
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.renderField = this.renderField.bind(this);
  }

  // Handlers
  fetchOptions(value) {
    return fetch('https://api.cdnjs.com/libraries?search=' + value)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return json.results.slice(0, 50);
      })
      .catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }

  // Render
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="lib" component={this.renderField} />
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

  renderField({ input }) {
    return (
      <AsyncSelect
        {...input}
        fetchOptions={this.fetchOptions}
        labelKey="name"
        valueKey="latest"
      />
    );
  }
}

const ReduxForm = reduxForm({
  // a unique name for the form
  form: 'asyncSelectFrom'
})(Form);

export default ReduxForm;
