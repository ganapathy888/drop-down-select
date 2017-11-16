// Vendor Imports
import React from 'react';

// Local Imports
import DropdownSelect from '../src/DropdownSelect';

function App(props) {
  const optionsArray = ['first', 'second', 'third', '4', '5'];
  return (
    <div style={ {width: '300px'} }>
      <DropdownSelect options={optionsArray} />
    </div>
  );
}

// Export
export default App;
