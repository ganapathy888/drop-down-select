import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { SimpleSelect  } from '../../../src';

class SimpleSelectForm extends Component {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handlers
  handleSubmit(values) {
    console.log(values);
    alert('Check your browser console for form output');
  }

  renderField(props) {
    return (
      <div>
        <SimpleSelect
          {...props.input}
          options={props.options}
          inputClassName="form-control"
          labelKey="name"
          valueKey="id"
          />
      </div>
    );
  }

  // Render
  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={ handleSubmit(this.handleSubmit) }>
        <Field
          name="capital"
          component={this.renderField}
          />
      </form>
    );
  }
}

const ReduxSimpleSelectForm = reduxForm({
  // a unique name for the form
  form: 'bootstrapSimpleSelectForm'
})(SimpleSelectForm)

export default ReduxSimpleSelectForm;
