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
    console.log('addGame');
    console.log(this.state.fieldData);
    return (
      <>
    <div className="pageContainer">
          <WhiteBar/>
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
                      // type="text"
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
          {fieldIds.map((fieldObj) => {
            return <div className='fieldSelectionWithClose'>
                    <img className="removeFieldIcon" src="/icons/ionic-ios-close.svg" />
                    <FieldSelection fieldId={fieldObj.id} fieldState={this.saveFieldData}/>
                   </div>;
          })}
          {/* add fields */}
          <div
            className="addSomethingNew"
            id='addNewField'
            onClick={() => {
              fieldIds.push({id: fieldIds.length, name: null})
              this.setState(
                (prevState) => {
                  return {numberOfFields: prevState.numberOfFields+1}
              })
            }}
          >
            <img className="addIcon" src="/icons/addicon.svg"></img>
            <p className="addTitle">הוסף שדה</p>
          </div>
          <br/>
          <button className='saveButton'>שמור</button>

          </div>

        </div>
      </>
    );
  }
}

export default AddGame;
