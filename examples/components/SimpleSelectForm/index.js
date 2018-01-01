// Vendor Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

// Local Imports
import countriesList from './countriesList';
import Form from './Form';

class SimpleSelectForm extends Component {
  // Render
  render() {
    const { country } = this.props;
    return (
      <div className="simple-select-form-example">
        <h5>Simple Dropdown Select</h5>
        <p className="hint text-info">* Default Styles Applied</p>
        <Form options={countriesList} />
        {country && (
          <div className="mt-5">
            <div className="alert alert-warning" role="alert">
              <pre>{JSON.stringify(country, null, 4)}</pre>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Redux Form
const selector = formValueSelector('simpleSelectForm');

// Export
export default connect(state => ({
  country: selector(state, 'country')
}))(SimpleSelectForm);
