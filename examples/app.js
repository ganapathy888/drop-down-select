// Vendor Imports
import React, { Component } from 'react';

// Local Imports
import SimpleSelectForm from './components/SimpleSelectForm';
import AsyncSelectForm from './components/AsyncSelectForm';
import MultiSelectFormExample from './components/MultiSelectFormExample';

class App extends Component {
  // Render
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
          <a className="navbar-brand" href="#">
            DROPDOWN SELECT <span className="text-success">(3.0.0)</span>
            <span className="text-warning"> (DEMO)</span>
          </a>
          <ul className="nav">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="https://github.com/ganapathy888/dropdown-select/"
              >
                Github
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.npmjs.com/package/dropdown-select"
              >
                Npm
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://yarnpkg.com/en/package/dropdown-select"
              >
                Yarn
              </a>
            </li>
          </ul>
        </nav>
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
      </div>
    );
  }
}

// Export
export default App;
