import React, { Component } from "react";
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
      gameName: "",
      gameDescription: "",
      gameRequirements: "",
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
        prevState.fieldsData.push({
        id: this.state.fieldsData.length,
        name: null,
        selection: "text",
        value: [],
      })
      return(prevState.fieldsData)})
    }
//need to add image info as well
    updateBasicInfo = (props) => {
      switch (props.target.id) {
        case "gameName": this.setState({gameName: props.target.value})
        break;
        case "gameDescription": this.setState({gameDescription: props.target.value})
        break;
        case "gameRequirements": this.setState({gameRequirements: props.target.value})
      }
     
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
                id="gameName"
                  className="inputFields"
                  type="text"
                  placeholder="הכנס את שם המשחק..."
                  onBlur={this.updateBasicInfo}
                />
              </label>
              <label className="fieldTitle">
                      תיאור המשחק:
                      <textarea
                        className="inputFields extendedField"
                        placeholder=""
                        id="gameDescription"
                        onBlur={this.updateBasicInfo}
                      />
              </label>
              <label className="fieldTitle">
                      דרישות המשחק:
                      <textarea
                        className="inputFields extendedField"
                        placeholder=""
                        id="gameRequirements"
                        onBlur={this.updateBasicInfo}
                      />
              </label>
              <label className="fieldTitle">
                תמונה:
                <input type="file" className="hiddenInput" />
                <br />
                <img className="cameraIcon" src="/icons/camera-icon.svg" />
              </label>
              <br />
              <label className="fieldTitle">
                שדות:
                <br />
              </label>
            </form>
            {/* game fields */}
            {this.state.fieldsData.map((fieldObj) => {
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
            })}
            {/* add fields */}
            <div
              className="addSomethingNew"
              id="addNewField"
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
