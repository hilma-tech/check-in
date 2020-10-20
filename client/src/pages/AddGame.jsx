import React, { Component } from "react";
import Select from "react-select";
import WhiteBar from "../component/ArrowNavBar"
import "../style/AddGameStyle.css";
import "../style/formStyle.css";
import FieldSelection from "../component/FieldSelection";

const mainGameInfo = ["תיאור המשחק:", "דרישות המשחק:"];

let fieldIds = [{ id: 0, name: null }];

class AddGame extends Component {
  constructor() {
    super();
    this.state = {
      numberOfFields: 1,
      fieldData: null,
    };
  }

  saveFieldData = (fieldData) => {
    this.setState({ fieldData: fieldData });
  };

  render() {
    console.log(this.state.fieldData);
    return (
      <>
        <div className="pageContainer">
          <WhiteBar/>
          <div className="formContainer">
            <form className="gameForm">
              <label className="fieldTitle">
                שם המשחק:
                <br className="formBreak" />
                <input
                  className="inputField"
                  type="text"
                  placeholder="הכנס את שם המשחק..."
                />
              </label>
              <br />
              {/* maps extended details of the game */}
              {mainGameInfo.map((field) => {
                return (
                  <>
                    <label className="fieldTitle">
                      {field}
                      <br />
                      <input
                        className="inputField extendedField"
                        type="text"
                        placeholder=""
                      />
                    </label>
                    <br />
                  </>
                );
              })}
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
            {fieldIds.map((fieldObj) => {
              return (
                <FieldSelection
                  fieldId={fieldObj.id}
                  fieldState={this.saveFieldData}
                />
              );
            })}
            {/* add fields */}
            <div
              className="addSomethingNew"
              onClick={() => {
                fieldIds.push({ id: fieldIds.length, name: null });
                this.setState((prevState) => {
                  return { numberOfFields: prevState.numberOfFields + 1 };
                });
              }}
            >
              <img className="addIcon" src="/icons/addicon.svg"></img>
              <p className="addTitle">הוסף שדה</p>
            </div>
            <p>{this.state.message}</p>
          </div>
        </div>
      </>
    );
  }
}

export default AddGame;
