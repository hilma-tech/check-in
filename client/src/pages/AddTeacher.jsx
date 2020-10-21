import React, { Component } from "react";
import Select from "react-select";
import WhiteBar from "../component/ArrowNavBar";
import "../style/AddGameStyle.css";
import "../style/formStyle.css";
//import FieldSelection from "../component/FieldSelection";

class AddTeacher extends Component {
  constructor() {
    super();
    this.state = {
      numberOfFields: 1,
    };
  }

  saveFieldName = (fieldName, fieldId) => {
    this.state.fieldsData[fieldId].name = fieldName;
  };

  saveSelection = (selection, fieldId) => {
    this.setState((prevState) => {
      prevState.fieldsData[fieldId].selection = selection;
      return { fieldsData: prevState.fieldsData };
    });
  };

  saveFieldValue = (fieldValue, fieldId, inputId, inputFiles) => {
    //only relevant to choice/multi-choice
    if (inputId) {
      this.setState((prevState) => {
        prevState.fieldsData[fieldId].value[inputId] = {
          id: inputId,
          value: fieldValue,
        };
        return { fieldsData: prevState.fieldsData };
      });
      //only relevant to image
    } else if (inputFiles) {
      this.setState((prevState) => {
        prevState.fieldsData[fieldId].value = [];
        prevState.fieldsData[fieldId].value[0] = {
          id: 0,
          value: inputFiles[0].name,
        };
        return { fieldsData: prevState.fieldsData };
      });
      //only relevant to text
    } else {
      this.setState((prevState) => {
        prevState.fieldsData[fieldId].value = [];
        prevState.fieldsData[fieldId].value[0] = {
          id: 0,
          value: fieldValue,
        };
        return { fieldsData: prevState.fieldsData };
      });
    }
    console.log("full state data", inputFiles[0]);
  };

  render() {
    return (
      <>
        <div className="pageContainer">
          <WhiteBar />
          <div className="formContainer">
            <form className="formData">
              <label className="fieldTitle">
                שם המורה:
                <input
                  className="inputFields"
                  type="text"
                  placeholder="הכנס את שם המורה..."
                />
              </label>
              <br/>
              {/* בית ספר */}
              <Select />
              <br/>
              {/* כיתה */}
              <Select />
            </form>
            {/* Teacher fields */}
            {/* {this.state.fieldsData.map((fieldObj) => {
              return (
                <FieldSelection
                  fieldId={fieldObj.id}
                  name={this.saveFieldName}
                  selection={this.saveSelection}
                  fieldValue={this.saveFieldValue}
                  changeInputType={this.state.fieldsData[fieldObj.id].selection}
                  imagePath={this.state.fieldsData[0].value[0].value}
                />
              );
            })} */}
            {/* add fields */}
            <div
              className="addSomethingNew"
              id="addNewField"
              onClick={() => {
                this.state.fieldsData.push({
                  id: this.state.fieldsData.length,
                  name: null,
                  selection: "text",
                  value: [],
                });
                // saves number of fields and serves as a render trigger to display added field
                this.setState((prevState) => {
                  return { numberOfFields: prevState.numberOfFields + 1 };
                });
              }}
            >
              <img className="addIcon" src="/icons/addicon.svg"></img>
              <p className="addTitle">הוסף כיתה</p>
            </div>
            <br />
            <label className="fieldTitle">
              אימייל:
              <input
                className="inputFields"
                type="text"
                placeholder="הכנס את שם המורה..."
              />
            </label>
            <label className="fieldTitle">
              סיסמא:
              <input
                className="inputFields"
                type="text"
                placeholder="הכנס את שם המורה..."
              />
            </label>
            <button className="saveButton">שמור</button>
          </div>
        </div>
      </>
    );
  }
}

export default AddTeacher;
