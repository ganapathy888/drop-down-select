// Vendor Imports
import React from 'react';
import { MultiSelect } from 'dropdown-select';

function MultiSelectField(props) {
  const {
    input, options, labelKey, valueKey,
  } = props;
  return <MultiSelect {...input} options={options} labelKey={labelKey} valueKey={valueKey} />;
}

// Export
export default MultiSelectField;
