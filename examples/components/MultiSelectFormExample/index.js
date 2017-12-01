import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./form";
import { formValueSelector } from "redux-form";

class MultiSelectFormExample extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handlers
  handleSubmit(values) {
    console.log(values);
    alert("Check your browser console for form output");
  }

  // Render
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} />
        <h6 className="mt-3">Your Fav Food Items:</h6>
        {this.renderTags()}
      </div>
    );
  }

  renderTags() {
    if (this.props.formValues) {
      const { foods } = this.props.formValues;
      return (
        <div>
          {foods &&
            foods.map((item, i) => (
              <span key={i} className="badge badge-pill badge-info mr-2">
                {typeof item == "object" ? item["id"] : item}
              </span>
            ))}
        </div>
      );
    }
  }
}

const mapStateToProps = ({ form }) => {
  return {
    formValues: form.multiSelectForm ? form.multiSelectForm.values : []
  };
};

// Export
export default connect(mapStateToProps)(MultiSelectFormExample);
