// Vendor Imports
import React, { Component } from 'react';

// Local Imports
import SimpleSelectForm from './components/SimpleSelectForm';
import AsyncSelectForm from './components/AsyncSelectForm';

class App extends Component {
  // Render
  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Dropdown Select</h1>
        </div>

        <div className="row mt-5">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <h6>Simple Dropdown Select</h6>
            <div>
              <SimpleSelectForm />
            </div>
          </div>
          <div className="col-lg-4" />
        </div>

        <div className="row mt-5 mb-5">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <h6>Async Dropdown Select</h6>
            <div>
              <AsyncSelectForm />
            </div>
          </div>
          <div className="col-lg-4" />
        </div>

      </div>
    );
  }
}

// Export
export default App;
