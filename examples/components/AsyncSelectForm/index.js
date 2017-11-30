import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { AsyncSelect } from '../../../src';
import 'whatwg-fetch';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.renderField = this.renderField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handlers
  fetchOptions(value) {
    return fetch('https://api.cdnjs.com/libraries?search=' + value)
     .then(function(response) {
       return response.json()
     }).then(function(json) {
       return json.results.slice(0, 25);
     }).catch(function(ex) {
       console.log('parsing failed', ex)
     });
  }

  handleSubmit(values) {
    console.log(values);
    alert('Check your browser console for form output');
  }

  renderField(props) {
    return (
      <div>
        <AsyncSelect
          {...props.input}
          fetchOptions={this.fetchOptions}
          labelKey="name"
          valueKey="id"
          />
        <div className="mt-3">
          <h6>
            URL:
            <div className="text-primary">
              { props.input.value['latest'] }
            </div>
          </h6>
        </div>
      </div>
    );
  }

  // Render
  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={ handleSubmit(this.handleSubmit) }>
        <Field
          name="lib"
          component={this.renderField}
          />
        <button className="btn btn-primary mt-2" type="submit">Submit</button>
      </form>
    );
  }
}

const ReduxContactForm = reduxForm({
  // a unique name for the form
  form: 'jsLibFindingForm'
})(ContactForm)

export default ReduxContactForm;
