// Vendor Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

// Local Imports
import Form from './Form';

// Async Select Form Example
class AsyncSelectForm extends Component {
  // Render
  render() {
    const { lib } = this.props;
    return (
      <div className="async-select-form-example">
        <h5>Async Dropdown Select</h5>
        <p className="hint text-info">
          * Uses CDNJS Public API to Fetch Options
        </p>
        <Form onSubmit={this.handleSubmit} />
        {lib && (
          <div className="mt-5">
            <div className="alert alert-warning" role="alert">
              <pre>{JSON.stringify(lib, null, 4)}</pre>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Redux Form
const selector = formValueSelector('asyncSelectFrom');

// Export
export default connect(state => ({
  lib: selector(state, 'lib')
}))(AsyncSelectForm);
