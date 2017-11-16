// Vendor Imports
import React from 'react';

// Local Imports
import DropdownSelect from '../src/DropdownSelect';
import { AsyncDropdownSelect } from '../src/DropdownSelect';

function App(props) {
  const optionsArray = ['first', 'second', 'third', '4', '5'];
  return (
    <div style={ {width: '300px'} }>
      <div>
        <DropdownSelect options={optionsArray} />
      </div>

      <div>
        <AsyncDropdownSelect />
      </div>
    </div>

  );
}

// Export
export default App;
