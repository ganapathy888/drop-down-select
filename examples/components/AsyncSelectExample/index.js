import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { SimpleSelect, AsyncSelect } from '../../../src';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.renderField = this.renderField.bind(this);
    this.renderSimpleSelectField = this.renderSimpleSelectField.bind(this);
  }

  // Handlers
  fetchOptions(value) {
    return new Promise((resolve, reject) => (
      setTimeout(function() {
        const arr = [
          { id: 'Yello', name: 'Banana' },
          { id: 'Red', name: 'Apple' },
          { id: 'Orange', name: 'Orange' },
        ];
        resolve(arr);
      }, 1000)
    ));
  }

  handleSubmit(values) {
    console.log(values);
  }

  renderField(field) {
    return (
      <AsyncSelect
        value={field.input.value}
        onChange={(value) => field.input.onChange(value)}
        fetchOptions={this.fetchOptions}
        labelKey="name"
        valueKey="id"
        />
    );
  }

  renderSimpleSelectField(field) {
    return (
      <SimpleSelect
        value={field.input.value}
        onChange={(value) => field.input.onChange(value)}
        options={field.options}
        labelKey="name"
        valueKey="id"
        value={field.options[0]}
        />
    );
  }

  // Render
  render() {
    const capitalOptions = [{
      id: "Chennai", name: "Tamilnadu",
    },
    {
      id: "Mumbai", name: "Maharashtra",
    },
    {
      id: "Bangalore", name: "Karnataka",
    }]
    const { handleSubmit } = this.props
    return (
      <form onSubmit={ handleSubmit(this.handleSubmit) }>
        <Field
          name="fruit"
          component={this.renderField}
          />
        <Field
          name="capital"
          options={ capitalOptions }
          component={this.renderSimpleSelectField}
          />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const ReduxContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)

export default ReduxContactForm;
