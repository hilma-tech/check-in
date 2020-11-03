import React, { Component } from "react";
import Select from "react-select";
import SelectStyle from "../../style/superAdmin/select_style";
import "../../style/superAdmin/form_style.css";

class GameFieldSelection extends Component {
  constructor() {
    super();
    this.options = [
      { value: "text", label: "טקסט" },
      { value: "choice", label: "בחירה" },
      { value: "image", label: "תמונה" },
      { value: "multi-choice", label: "בחירה מרובה" },
    ];
  }

  getFieldClassSize = (select) => {
    if (select === "text") {
      return "";
    } else if (select === "image") {
      return "photoFildSize ";
    } else {
      return "selectionsFildSize ";
    }
  };

  // creates input based on "type"
  fieldCreator = () => {
    
    if (this.props.changeInputType === "text") {
      return (
        <label className="fieldTitle">
          <input
            onBlur={this.sendFieldValue}
            className="inputFields"
            type="text"
            defaultValue={this.props.originalValue[0].value}
          />
        </label>
      );
    } else if (this.props.changeInputType === "image") {
      return (
        <label className="fieldTitle imageWidth">
          <input
            onChange={this.sendFieldValue}
            type="file"
            className="hiddenInput inputFields"
          />
          <div className="borderCameraIcon">
            <img
              className="cameraIcon"
              src={
                this.props.imagePath
                  ? this.props.imagePath
                  : "/icons/camera-icon.svg"
              }
            />
          </div>
        </label>
      );
    } else {
      const sixArray = [0, 1, 2, 3, 4, 5];
      // mapping to put in the right values
      return (
        <label className="fieldTitle">
          <div className="gridFieldInputs">
            {sixArray.map((inputId) => {
              let input = this.props.originalValue.filter(
                (valueArray) => valueArray.id === inputId
              );
              if (input[0]) {
                return (
                  <input
                    defaultValue={input[0].value}
                    onBlur={this.sendFieldValue}
                    className="inputFields"
                    type="text"
                    id={inputId}
                  />
                );
              } else {
                return (
                  <input
                    onBlur={this.sendFieldValue}
                    className="inputFields"
                    type="text"
                    id={inputId}
                  />
                );
              }
            })}
          </div>
        </label>
      );
    }
  };

  //sends name to parent
  sendNameValue = (props) => {
    this.props.name(props.target.value, this.props.fieldId);
  };

  //sends selection to parent
  sendSelection = (props) => {
    this.props.selection(props.value, this.props.fieldId);
  };

  //sends input value ENETERED BY USER to parent
  sendFieldValue = (props) => {
    this.props.fieldValue(
      props.target.value,
      this.props.fieldId,
      props.target.id,
      props.target.files
    );
  };

  removeField = () => {
    this.props.removal(this.props.fieldId);
  };

  render() {
    let fieldClassSize = this.getFieldClassSize(this.props.changeInputType);
    
    let errorMess =
      this.props.errorMessage !== undefined
        ? this.props.errorMessage
        : { toShow: "none", mess: "" };
    return (
      <div className="gameField">
        <p
          className="error gameFieldError"
          style={{ display: errorMess.toShow }}
        >
          {errorMess.mess}
        </p>
        <div className={fieldClassSize + "fieldSelection"}>
          <img
            onClick={this.removeField}
            className="removeFieldIcon"
            src="/icons/delete.svg"
          />

          <form id="fieldName">
            {/* name of field */}
            <input
              className="inputFields"
              type="text"
              onBlur={this.sendNameValue}
              placeholder="רשום את שם השדה"
              defaultValue={this.props.originalName}
            />
          </form>
          {/* selected field type */}
          <Select
            id="fieldType"
            styles={SelectStyle()}
            options={this.options}
            onChange={this.sendSelection}
            defaultValue={
              this.options.filter((option) => {
                return this.props.changeInputType === option.value;
              })[0]
            }
          />
          {/* field for user interaction */}

          <form id="fieldData">{this.fieldCreator()}</form>
        </div>
      </div>
    );
  }
}
export default GameFieldSelection;
