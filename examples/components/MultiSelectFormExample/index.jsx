// Vendor Imports
import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

// Local Imports
import Form from './form';

function MultiSelectFormExample(props) {
  const { foods } = props;
  return (
    <div>
      <h5>Multi Select</h5>
      <p className="hint text-info">(Checkboxed Options)</p>
      <Form />
      <div className="mt-5">
        {foods &&
          foods.length > 0 && (
            <div className="alert alert-warning" role="alert">
              <pre>{JSON.stringify(foods, null, 4)}</pre>
            </div>
          )}
      </div>
    </div>
  );
}

// Redux Form
const selector = formValueSelector('multiSelectForm');

// Export
export default connect(state => ({
  foods: selector(state, 'foods'),
}))(MultiSelectFormExample);
