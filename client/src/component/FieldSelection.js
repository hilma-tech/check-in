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
      // is the type of input user chose
      type: "text",
      // is the name of input user chose
      name: "",
      //is the value user entered into input
      field: "",
      fullInfo: ["text", "", "", 0],
    };
  }

  // handles choice of input type
  //also saves current choice of input to state
  handleChange = (option) => {
    if (option.value === "text") {
      this.setState({ type: "text" });
      this.state.fullInfo[0] = option.value;
      this.sendData();
    } else if (option.value === "image") {
      this.setState({ type: "image" });
      this.state.fullInfo[0] = option.value;
      this.sendData();
    } else if (option.value === "choice") {
      this.setState({ type: "choice" });
      this.state.fullInfo[0] = option.value;
      this.sendData();
    } else {
      this.setState({ type: "multi-choice" });
      this.state.fullInfo[0] = option.value;
      this.sendData();
    }
  };

  // creates input based on "type"
  fieldCreator = () => {
    if (this.state.type === "text") {
      return <input onBlur={this.editFieldValue} type="text" />;
    } else if (this.state.type === "image") {
      return (
        <label className="fieldTitle">
          <input
            onFocusCapture={this.editFieldValue}
            type="file"
            className="hiddenInput"
          />
          <img onFocusCapture={this.editFieldValue} type="file"className="cameraIcon" src="/icons/camera-icon.svg" />
        </label>
      );
    } else if (this.state.type === "choice") {
      return (
        <label className="fieldTitle">
          <input onBlur={this.editFieldValue} type="text" />
          {/* <input onBlur={this.editFieldValue} type="text" />
          <input onBlur={this.editFieldValue} type="text" />
          <input onBlur={this.editFieldValue} type="text" />
          <input onBlur={this.editFieldValue} type="text" />
          <input onBlur={this.editFieldValue} type="text" /> */}
        </label>
      );
    } else {
      return (
        <label className="fieldTitle">
          <input onBlur={this.editFieldValue} type="text" />
          {/* <input onBlur={this.editFieldValue} type="text" />
      <input onBlur={this.editFieldValue} type="text" />
      <input onBlur={this.editFieldValue} type="text" />
      <input onBlur={this.editFieldValue} type="text" />
      <input onBlur={this.editFieldValue} type="text" /> */}
        </label>
      );
    }
  };

  //saves name to state
  editNameValue = (props) => {
    this.setState({ name: props.target.value });
    this.state.fullInfo[1] = props.target.value;
    this.sendData();
  };
  //saves input value ENETERED BY USER to state
  editFieldValue = (props) => {
    this.setState({ field: props.target.value });
    this.state.fullInfo[2] = props.target.value;
    this.sendData();
    console.log("fieldvalue", props.target.value)
  };

  sendData = () => {
    this.props.fieldState(this.state.fullInfo);
    console.log(this.state.fullInfo);
  };

  render() {
    this.state.fullInfo[3] = this.props.fieldId;
    return (
      <>
        <form>
          {/* name of field */}
          <input
            className="inputField"
            type="text"
            placeholder="רשום את שם השדה"
            onBlur={this.editNameValue}
          />
        </form>
        <br />
        {/* selected field type */}
        <Select
          className="select"
          options={options}
          onChange={this.handleChange}
          defaultValue={{ value: "text", label: "טקסט" }}
        />
        {/* field for user interaction */}
        <form>{this.fieldCreator()}</form>
      </>
    );
  }
}
export default FieldSelection;
