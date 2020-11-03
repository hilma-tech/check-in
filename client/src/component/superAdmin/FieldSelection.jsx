import React, { Component } from "react";
import Select from "react-select";
import SelectStyle from "../../style/superAdmin/select_style";
import "../../style/superAdmin/form_style.css";

class FieldSelection extends Component {
  constructor(props) {
    super();
    this.state = {
      options: [
        { value: "text", label: "טקסט" },
        { value: "choice", label: "בחירה" },
        { value: "image", label: "תמונה" },
        { value: "multi-choice", label: "בחירה מרובה" },
      ],
      fieldClassSize: ''
    };
  }

getFieldClassSize = (select) => {
  if (select=== "text") {
    return '';
  } else if (select=== "image") {
    return 'photoFildSize ';
  }else {
    return 'selectionsFildSize ';
}}

  // creates input based on "type"
  fieldCreator = () => {
    if (this.props.changeInputType === "text") {
      return (
        <label className="fieldTitle">
          <input
          defaultValue="hi"
            onBlur={this.sendFieldValue}
            className="inputFields"
            type="text"
          />
        </label>
      );
    } else if (this.props.changeInputType === "image") {
      return (
        <label className="fieldTitle">
          <input
            onChange={this.sendFieldValue}
            type="file"
            className="hiddenInput inputFields"
          />
          <div className='borderCameraIcon'>
            <img
              className="cameraIcon"
              src={(this.props.imagePath) ? this.props.imagePath : "/icons/camera-icon.svg"}
              />
          </div>
        </label>
      );
    } else {
      const sixArray = [0, 1, 2, 3, 4, 5];
      return (
        <label className="fieldTitle">
          <div className='gridFieldInputs'>    
            {sixArray.map((inputId) => {
              return (
                <input
                onBlur={this.sendFieldValue}
                className="inputFields"
                type="text"
                id={inputId}
                />
                );
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
    this.setState({fieldClassSize: this.getFieldClassSize(props.value)})
  };

  //sends input value ENETERED BY USER to parent
  sendFieldValue = (props) => {
    this.props.fieldValue(props.target.value, this.props.fieldId, props.target.id, props.target.files);
  };

  removeField = () => {
    this.props.removal(this.props.fieldId);
  };

  render() {
    return (
      <div className={this.state.fieldClassSize + 'fieldSelection'}>
        <img
            onClick={this.removeField}
            className="removeFieldIcon"
            src="/icons/delete.svg"
          />
        <form id='fieldName'>
          {/* name of field */}
          <input
            className="inputFields"
            type="text"
            placeholder="רשום את שם השדה"
            onBlur={this.sendNameValue}
          />
        </form>
        {/* selected field type */}
        <Select
          id="fieldType"
          styles={SelectStyle()}
          options={this.state.options}
          onChange={this.sendSelection}
          defaultValue={{ value: "text", label: "טקסט" }}
          />
        {/* field for user interaction */}
          
        <form id='fieldData'>{this.fieldCreator()}</form>
      </div>
    );
  }
}
export default FieldSelection;
