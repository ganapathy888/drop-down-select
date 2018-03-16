// Vendor Imports
import React from 'react';
import { Select } from 'dropdown-select';

function SelectField(props) {
  const {
    input, options, labelKey, valueKey,
  } = props;
  return <Select {...input} options={options} labelKey={labelKey} valueKey={valueKey} />;
}

// Export
export default SelectField;
