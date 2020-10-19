import React, { Component } from "react";
import Select from "react-select";

const options = [
  { value: "text", label: "טקסט" },
  { value: "choice", label: "בחירה" },
  { value: "image", label: "תמונה" },
  { value: "multi-choice", label: "בחירה מרובה" },
];

class FieldSelection extends Component {
  constructor() {
    super();
    this.state = {
      case: "text",
      name: "",
      type: "",
    };
  }

  // handles choice of field type
  handleChange = (option) => {
    if (option.value === "text") {
      this.setState({ case: "text" });
    } else if (option.value === "image") {
      this.setState({ case: "image" });
    } else if (option.value === "choice") {
      this.setState({ case: "choice" });
    } else {
      this.setState({ case: "multi-choice" });
    }
  };
  // creates field based on state
  fieldCreator() {
    if (this.state.case === "text") {
      return <input onBlur={this.editFieldValue} type="text" />;
    } else if (this.state.case === "image") {
      return <input onBlur={this.editFieldValue} type="file" />;
    } else if (this.state.case === "choice") {
      return <input onBlur={this.editFieldValue} type="text" />;
    } else {
      return <input onBlur={this.editFieldValue} type="text" />;
    }
  }

  editNameValue = (props) => {
    this.setState({ name: props.target.value });
  };

  editFieldValue = (props) => {
    this.setState({ field: props.target.value });
  };

  render() {
    return (
      <>
        <form>
          <input
            className="inputField"
            type="text"
            placeholder="רשום את שם השדה"
            onBlur={this.editNameValue}
          />
        </form>
        <br />
        <Select
          className="select"
          options={options}
          onChange={this.handleChange}
          defaultValue={{ value: "text", label: "טקסט" }}
        />
        <form>{this.fieldCreator()}</form>
      </>
    );
  }
}
export default FieldSelection;
