// Vendor Imports
import React from 'react';

// Local Imports
import DropdownSelect from '../src/DropdownSelect';
import { AsyncDropdownSelect } from '../src/DropdownSelect';

function App(props) {
  const optionsArray = ['first', 'second', 'third', '4', '5'];
  return (
    <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
      <div style={ {width: '200px'} }>
        <h3>Simple Dropdown Select</h3>
        <div>
          <DropdownSelect options={[]} />
        </div>
      </div>

      <div style={ {width: '200px'} }>
        <h3>Async Dropdown Select</h3>
        <div>
          <AsyncDropdownSelect />
        </div>
      </div>
    </div>
  );
}

// Export
export default App;
