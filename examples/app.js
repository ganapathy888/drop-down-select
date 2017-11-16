// Vendor Imports
import React from 'react';

// Local Imports
import DropdownSelect from '../src/DropdownSelect';
import { AsyncDropdownSelect } from '../src/DropdownSelect';

function App(props) {
  const optionsArray = ['first', 'second', 'third', '4', '5'];
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3" />
        <div className="col-lg-3">
          <h5>Simple Dropdown Select</h5>
          <div>
            <DropdownSelect options={[]} inputClassName="form-control"/>
          </div>
        </div>

        <div className="col-lg-3">
          <h5>Async Dropdown Select</h5>
          <div>
            <AsyncDropdownSelect />
          </div>
        </div>
        <div className="col-lg-3" />
      </div>

    </div>
  );
}

// Export
export default App;
