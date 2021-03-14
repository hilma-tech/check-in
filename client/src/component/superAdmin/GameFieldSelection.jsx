import React, { Component } from "react";
import Select from "react-select";
import SelectStyle from "../../style/superAdmin/select_style";
import "../../style/superAdmin/form_style.scss";
import { FileInput, withFiles } from "@hilma/fileshandler-client";
import "../../style/superAdmin/game_field_selection_style.scss";
import { withContext } from "@hilma/tools";
import { errorMsgContext } from "../../stores/error.store";

class GameFieldSelection extends Component {
  constructor(props) {
    super();
    this.options = [
      { value: "text", label: "טקסט" },
      { value: "choice", label: "בחירה" },
      { value: "image", label: "תמונה" },
      { value: "multi-choice", label: "בחירה מרובה" },
    ];
    this.imageUploader = props.ourImageUploader;
  }

  // creates input based on "type"
  fieldCreator = () => {
    if (this.props.changeInputType === "text") {
      let eek = this.props.originalValue[0].value.trim()
      return (
        <input
          onBlur={this.sendFieldValue}
          className={"fieldSelectionInput"}
          type="text"
          placeholder="רשום את תוכן השדה"
          defaultValue={this.props.originalValue[0].value}
          readOnly={this.props.reading}
        />
      );
    } else if (this.props.changeInputType === "image") {
      return (
        <label className="cameraFieldBorder">
          {this.props.reading ? (
            <></>
          ) : (
            <FileInput
            onError={()=>{
              this.props.errorMsg.setErrorMsg("הייתה שגיאה בהעלאת התמונה. התמונה חייבת להיות באחד מן הפורמטים הבאים: jpg/jpeg/png");
            
          }}
              id="image"
              className="hiddenInput"
              type="image"
              filesUploader={this.imageUploader}
              onChange={this.sendImageFieldValue}
            />
          )}
          <img
            className={
              this.props.originalValue[0].value.length !== 0
              ? "chosenImg"
                : "cameraIcon"
            }
            src={
              this.props.originalValue[0].value
                ? this.props.originalValue[0].value
                : "/icons/camera-icon.svg"
            }
            alt="photography icon"
          />
        </label>
      );
    } else {
      const sixArray = [0, 1, 2, 3, 4, 5];
      // mapping to put in the right values
      return (
        <label className="gridFieldInputs">
          {sixArray.map((inputId, index) => {
            let input = this.props.originalValue.filter(
              (valueArray) => valueArray.id === inputId
            );
            if (input[0]) {
              return (
                <input
                  key={index}
                  defaultValue={input[0].value}
                  onBlur={this.sendFieldValue}
                  className="fieldSelectionInput"
                  type="text"
                  id={inputId}
                  readOnly={this.props.reading}
                />
              );
            } else {
              return (
                <input
                  key={index}
                  onBlur={this.sendFieldValue}
                  className="fieldSelectionInput"
                  type="text"
                  id={inputId}
                  readOnly={this.props.reading}
                />
              );
            }
          })}
        </label>
      );
    }
  };

  //sends name to parent
  sendNameValue = (props) => {
    this.props.name(props.target.value, this.props.fieldI);
  };

  //sends selection to parent
  sendSelection = (props) => {
    this.props.selection(props.value, this.props.fieldI);
  };

  //sends input value ENETERED BY USER to parent
  sendFieldValue = (props) => {
    this.props.fieldValue(
      props.target.value,
      this.props.fieldI,
      props.target.id,
      null
    );
  };

  //sends image field the user entered to parent
  sendImageFieldValue = (value) => {
    this.props.fieldValue(
      value.value,
      this.props.fieldI,
      null,
      value.link,
      value.id
    );
  };

  //triggers the removal of specific field from this game
  removeField = () => {
    this.props.removal(this.props.fieldId);
  };

  render() {
    let errorMess =
      this.props.errorMessage !== undefined
        ? this.props.errorMessage
        : { toShow: "none", mess: "" };
    return (
      <div>
        <p
          className="error gameFieldError"
          style={{ display: errorMess.toShow }}
        >
          {errorMess.mess}
        </p>
        <div className="gameFieldSelection">
          {/* fieldSelection */}
          {this.props.reading ? (
            <></>
          ) : (
            <img
              alt="remove field icon"
              onClick={this.removeField}
              className="removeFieldIcon"
              src="/icons/delete.svg"
            />
          )}

          <div className="fieldSelection">
            {/* name of field */}
            <input
              className="fieldSelectionInput"
              type="text"
              onBlur={this.sendNameValue}
              placeholder="רשום את שם השדה"
              defaultValue={this.props.originalName}
              readOnly={this.props.reading}
            />

            {/* selected field type */}
            <Select
              id="fieldType"
              styles={SelectStyle()}
              isDisabled={this.props.reading}
              options={this.options}
              onChange={this.sendSelection}
              defaultValue={
                this.options.filter((option) => {
                  return this.props.changeInputType === option.value;
                })[0]
              }
            />
            {/* field for user interaction */}
            <div>{this.fieldCreator()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapContextToProps = {
  errorMsg: errorMsgContext,
};

//!מובקס לא מתעדכן
export default  withContext(mapContextToProps)( withFiles(GameFieldSelection))
  
