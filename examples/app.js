// Vendor Imports
import React, { Component } from 'react';

// Local Imports
import DropdownSelect from '../src/DropdownSelect';
import { AsyncDropdownSelect } from '../src/DropdownSelect';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchOptions = this.fetchOptions.bind(this);
  }

  // Handlers
  fetchOptions(value) {
    return new Promise((resolve, reject) => (
      setTimeout(function() {
        const arr = [
          { id: 'one', name: 'One' },
          { id: 'two', name: 'Two' }
        ];
        resolve(arr);
      }, 1000)
    ));
  }

  // Render
  render() {
    const optionsArray = ['first', 'second', 'third', '4', '5'];
    const optionsObjectArray = [{ name: "test", id: 1 }, { name: "test2", id: 2 }];

    return (
      <div className="container">
        <div className="row">
          <h1>Dropdown Select</h1>
        </div>

        <div className="row mt-5">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <h6>Simple Dropdown Select (Array of Strings)</h6>
            <div>
              <DropdownSelect
                options={optionsArray}
                inputClassName="form-control"/>
            </div>
          </div>
          <div className="col-lg-4" />
        </div>

        <div className="row mt-5">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <h6>Simple Dropdown Select (Array of Objects)</h6>
            <div>
              <DropdownSelect
                options={optionsObjectArray}
                inputClassName="form-control"
                labelKey="name"
                valueKey="id"
                />
            </div>
          </div>
          <div className="col-lg-4" />
        </div>

        <div className="row mt-5 mb-5">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <h6>Async Dropdown Select</h6>
            <div>
              <AsyncDropdownSelect
                fetchOptions={this.fetchOptions}
                labelKey="name"
                valueKey="id"
                />
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
