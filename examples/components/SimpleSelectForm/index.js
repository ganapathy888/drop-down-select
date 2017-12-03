import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { SimpleSelect } from '../../../src';
import countriesList from '../countriesList';

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
          labelKey="name"
          valueKey="id"
        />
        <div className="mt-3">
          <h5>
            Country Code:{' '}
            <span className="text-success">{props.input.value['id']}</span>
          </h5>
        </div>
      </div>
    );
  }

  // Render
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          name="country"
          options={countriesList}
          component={this.renderField}
        />
        <button className="btn btn-primary mt-2" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const ReduxSimpleSelectForm = reduxForm({
  // a unique name for the form
  form: 'countriesSelectForm'
})(SimpleSelectForm);

export default ReduxSimpleSelectForm;
