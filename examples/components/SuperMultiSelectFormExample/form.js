import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { SuperMultiSelect } from '../../../src';

class SuperMultiSelectForm extends Component {
  constructor(props) {
    super(props);
    this.renderMultiSelectField = this.renderMultiSelectField.bind(this);
  }

  // Component LifeCycle
  componentDidMount() {
    this.props.initialize({ foods: [] });
  }

  // Render
  renderMultiSelectField({ input, options }) {
    return (
      <SuperMultiSelect
        {...input}
        options={options}
        labelKey="label"
        valueKey="id"
        placeholderName={['timeslot', 'timeslots']}
      />
    );
  }

  render() {
    const { handleSubmit, foodValues } = this.props;
    const options = [
      { id: 'C', label: 'C' },
      { id: 'C++', label: 'C++' },
      { id: 'Java', label: 'Java' },
      { id: 'JavaScript', label: 'JavaScript' },
      { id: 'PHP', label: 'PHP' },
      { id: 'Python', label: 'Python' },
      { id: 'Ruby', label: 'Ruby' },
      { id: 'Swift', label: 'Swift' }
    ];
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="foods"
          options={options}
          component={this.renderMultiSelectField}
        />
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
}

// Redux Form
const ReduxSuperMultiSelectForm = reduxForm({
  // a unique name for the form
  form: 'superMultiSelectForm'
})(SuperMultiSelectForm);

// Export
export default ReduxSuperMultiSelectForm;
