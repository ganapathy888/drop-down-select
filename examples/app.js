// Vendor Imports
import React from 'react';

// Local Imports
import DropdownSelect from '../src';

function App(props) {
  return (
    <div style={ {width: '300px'} }>
      <DropdownSelect options={['first', 'second', 'third']} />
    </div>
  );
}

// Export
export default App;
