// Vendor Imports
import React, { Component } from 'react';

// Local Imports
import Layout from './layout';
import SimpleSelectForm from './components/SimpleSelectForm';
import AsyncSelectForm from './components/AsyncSelectForm';
import MultiSelectFormExample from './components/MultiSelectFormExample';
import SuperMultiSelectFormExample from './components/SuperMultiSelectFormExample';

import { Select } from '../src';

class App extends Component {
  // Render
  render() {
    return (
      <Layout>
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

          <div className="row mt-5">
            <div className="col-lg-3" />
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <SuperMultiSelectFormExample />
                </div>
              </div>
            </div>
            <div className="col-lg-3" />
          </div>
        </div>
      </Layout>
    );
  }
}

// Export
export default App;
