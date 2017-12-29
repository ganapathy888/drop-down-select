// Vendor Imports
import React, { Component } from 'react';

// Local Imports
import Layout from './layout';
import SimpleSelectForm from './components/SimpleSelectForm';
import AsyncSelectForm from './components/AsyncSelectForm';
import MultiSelectFormExample from './components/MultiSelectFormExample';

import { Select } from '../src';

class App extends Component {
  // Render
  render() {
    return (
      <Layout>
        <div style={{ padding: '25px' }}>
          <Select options={['test']} value="" />
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <SimpleSelectForm />
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <AsyncSelectForm />
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <MultiSelectFormExample />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

// Export
export default App;
