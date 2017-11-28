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
    this.props.reset();
  }

  renderField(props) {
    return (
      <SimpleSelect
        {...props.input}
        options={props.options}
        labelKey="name"
        valueKey="id"
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
          name="capital"
          options={ capitalOptions }
          component={this.renderField}
          />
        <button className="btn btn-primary mt-2" type="submit">Submit</button>
      </form>
    );
  }
}

const ReduxSimpleSelectForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(SimpleSelectForm)

export default ReduxSimpleSelectForm;
