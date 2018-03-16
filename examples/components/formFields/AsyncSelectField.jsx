// Vendor Imports
import React from 'react';
import { AsyncSelect } from 'dropdown-select';

function AsyncSelectField(props) {
  const {
    input, options, labelKey, valueKey, fetchOptions,
  } = props;
  return (
    <AsyncSelect
      {...input}
      options={options}
      fetchOptions={fetchOptions}
      labelKey={labelKey}
      valueKey={valueKey}
    />
  );
}

// Export
export default AsyncSelectField;
