// Vendor Imports
import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

// Local Imports
import countriesList from './countriesList';
import Form from './Form';

const SimpleSelectForm = (props) => {
  const { country } = props;
  return (
    <div className="simple-select-form-example">
      <h5>Simple Dropdown Select</h5>
      <p className="hint text-info">(Default Styles Applied)</p>
      <Form options={countriesList} />
      <div className="mt-5">
        {country && (
          <div className="alert alert-warning" role="alert">
            <pre>{JSON.stringify(country, null, 4)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

// Redux Form
const selector = formValueSelector('simpleSelectForm');

// Export
export default connect(state => ({
  country: selector(state, 'country'),
}))(SimpleSelectForm);
