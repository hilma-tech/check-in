import React, { Component } from "react";
import Select from "react-select";
import WhiteBar from "../component/ArrowNavBar";
import "../style/AddGameStyle.css";
import "../style/formStyle.css";
import FieldSelection from "../component/FieldSelection";

const mainGameInfo = ["תיאור המשחק:", "דרישות המשחק:"];

class AddGame extends Component {
  constructor() {
    super();
    this.state = {
      numberOfFields: 1,
      fieldsData: [{ id: 0, name: null, selection: "text", value: [false] }],
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
    } else if(inputFiles){
      this.setState((prevState) => {
        prevState.fieldsData[fieldId].value = [];
        prevState.fieldsData[fieldId].value[0] = {
          id: 0,
          value: inputFiles[0].name,
        };
        return { fieldsData: prevState.fieldsData };
      });
      //only relevant to text
    } else{
      this.setState((prevState) => {
        prevState.fieldsData[fieldId].value = [];
        prevState.fieldsData[fieldId].value[0] = {
          id: 0,
          value: fieldValue,
        };
        return { fieldsData: prevState.fieldsData };
      });
    }
    console.log("full state data", this.state.fieldsData);
  };

  addNewFieldData = () => {
      this.setState((prevState) => {
        let tempFieldsData = [...prevState.fieldsData]
        tempFieldsData.push({
        id: this.state.fieldsData.length,
        name: null,
        selection: "text",
        value: [],
      })
      return({fieldsData: tempFieldsData})})
    }
  

  render() {
    return (
      <>
    <div className="pageContainer">
          <WhiteBar />
        <div className="formContainer">
          <form className="formData">
            <label className="fieldTitle">
              שם המשחק:
              <input
                className="inputFields"
                id='gameName'
                type='text'
                placeholder="הכנס את שם המשחק..."
              />
            </label>
            
            {/* maps extended details of the game */}
            {mainGameInfo.map((field) => {
              return (
                <>
                  <label className="fieldTitle">
                    {field}
                    <textarea
                      className="inputFields extendedField"
                      placeholder=""
                    />
                  </label>
                </>
              );
            })}
            <label className="fieldTitle">
              תמונה:
              <input type="file" className="hiddenInput" />
              <div className='borderCameraIcon'>
                <img className="cameraIcon" src="/icons/camera-icon.svg" />
              </div>
            </label>
            <br />
            <label className="fieldTitle">
              שדות:
              <br />
            </label>
          </form>
          {/* game fields */}
          {this.state.fieldsData.map((fieldObj) => {
            return (<div className='fieldSelectionWithClose'>
                    <img className="removeFieldIcon" src="/icons/ionic-ios-close.svg" />
                    <FieldSelection
                      fieldId={fieldObj.id}
                      name={this.saveFieldName}
                      selection={this.saveSelection}
                      fieldValue={this.saveFieldValue}
                      changeInputType={this.state.fieldsData[fieldObj.id].selection}
                      imagePath={this.state.fieldsData[0].value[0].value}
                    />
                   </div>);
          })}
          {/* add fields */}
          <div
            className="addSomethingNew"
            id='addNewField'
            onClick={this.addNewFieldData}
          >
            <img className="addIcon" src="/icons/addicon.svg"></img>
            <p className="addTitle">הוסף שדה</p>
            </div>
          <br />
          <button className="saveButton">שמור</button>
          </div>
        </div>
      </>
    );
  }
}

export default AddGame;
