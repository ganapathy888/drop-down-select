import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './form';
import { formValueSelector } from 'redux-form';

class MultiSelectFormExample extends Component {
  // Render
  render() {
    const { foods } = this.props;
    return (
      <div>
        <h5>Multi Select</h5>
        <p className="hint text-info">* Checkboxed Options</p>
        <Form />
        {foods &&
          foods.length > 0 && (
            <div className="mt-5">
              <div className="alert alert-warning" role="alert">
                <pre>{JSON.stringify(foods, null, 4)}</pre>
              </div>
            </div>
          )}
      </div>
    );
  }
}

// Redux Form
const selector = formValueSelector('multiSelectForm');

// Export
export default connect(state => ({
  foods: selector(state, 'foods')
}))(MultiSelectFormExample);
