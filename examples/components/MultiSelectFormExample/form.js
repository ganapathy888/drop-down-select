import React from "react";
import { Field, reduxForm } from "redux-form";
import { MultiSelect } from "../../../src";

const renderMultiSelectField = props => {
  return <MultiSelect {...props.input} options={props.options} />;
};

const foodsArray = ["Cake", "Ice Cream", "Burger", "Idly", "Dosai"];

let Form = props => {
  const { handleSubmit, foodValues } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="foods"
        options={foodsArray}
        component={renderMultiSelectField}
      />
      <button className="btn btn-primary mt-3" type="submit">
        Submit
      </button>
    </form>
  );
};

// Redux Form
const ReduxMultiSelectForm = reduxForm({
  // a unique name for the form
  form: "multiSelectForm"
})(Form);

// Export
export default ReduxMultiSelectForm;
