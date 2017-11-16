import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { AsyncDropdownSelect } from '../../../src/DropdownSelect';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.fetchOptions = this.fetchOptions.bind(this);
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

  // Render
  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={ handleSubmit(this.handleSubmit) }>
        <Field
          name="fruit"
          component={
            (props) => (<AsyncDropdownSelect
                          {...props}
                          fetchOptions={this.fetchOptions}
                          labelKey="name"
                          valueKey="id"
                          />)
          }
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
