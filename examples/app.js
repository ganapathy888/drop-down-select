// Vendor Imports
import React, { Component } from 'react';

// Local Imports
import SimpleSelectForm from './components/SimpleSelectForm';
import AsyncSelectForm from './components/AsyncSelectForm';
import BootstrapSimpleSelectForm from './components/BootstrapSimpleSelectForm';

class App extends Component {
  // Render
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
           <a className="navbar-brand" href="#">Dropdown Select</a>
        </nav>
        <div className="container">

        <div className="row mt-5">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <h3>Simple Dropdown Select</h3>
            <p>(Default Styles Applied)</p>
            <div>
              <SimpleSelectForm />
            </div>
          </div>
          <div className="col-lg-4" />
        </div>

        <div className="row mt-5 mb-5">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <h3>Async Dropdown Select</h3>
            <p>(Uses CDNJS Public API to Fetch Options)</p>
            <div>
              <AsyncSelectForm />
            </div>
          </div>
          <div className="col-lg-4" />
        </div>

        <div className="row mt-5 mb-5">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <h3>Simple Dropdown Select</h3>
            <p>(Bootstrap Form Input Style Applied)</p>
            <div>
              <BootstrapSimpleSelectForm />
            </div>
          </div>
          <div className="col-lg-4" />
        </div>

      </div>
      </div>
    );
  }
}

// Export
export default App;
