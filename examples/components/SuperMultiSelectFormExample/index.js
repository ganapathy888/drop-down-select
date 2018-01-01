import React, { Component } from 'react';
import Form from './form';

class MultiSelectFormExample extends Component {
  // Render
  render() {
    return (
      <div>
        <h5>Super Multi Select</h5>
        <p className="text-info hint">* Badged Options</p>
        <Form />
      </div>
    );
  }
}

// Export
export default MultiSelectFormExample;
