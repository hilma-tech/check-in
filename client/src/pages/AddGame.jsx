import React, { Component } from "react";
import Select from "react-select";
import "../style/AddGameStyle.css";
import FieldSelection from "../component/FieldSelection";


const mainGameInfo = ["תיאור המשחק:", "דרישות המשחק:"];

let insertion = [];

let fieldIds = [
  {id: 0, name: null},
];

class AddGame extends Component {
  constructor() {
    super();
    this.state= {
      numberOfFields: 1,
    }
  }

  render() {
    return (
      <>
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
            return <FieldSelection fieldId={fieldObj.id} />;
          })}
          {/* add fields */}
          <div
            className="addSomethingNew"
            onClick={() => {
              fieldIds.push({id: fieldIds.length, name: null})
              console.log(fieldIds);
              this.setState(
                (prevState) => {
                  return {numberOfFields: prevState.numberOfFields+1}
              })
            }}
          >
            <img className="addIcon" src="/icons/addicon.svg"></img>
            <p className="addTitle">הוסף שדה</p>
          </div>
        </div>
      </>
    );
  }
}

export default AddGame;
