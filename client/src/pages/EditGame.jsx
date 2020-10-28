import React, { Component } from "react";
import WhiteBar from "../component/ArrowNavBar";
import "../style/add_game_style.css";
import "../style/form_style.css";
import GameFieldSelection from "../component/GameFieldSelection";

class EditGame extends Component {
  constructor() {
    super();

    this.state = {
      newKey: 3,
      fieldsData: [
        {
          id: 0,
          name: "בלה בלה",
          selection: "text",
          value: [{ id: 0, value: "חשבו על חייכם" }],
        },
        {
          id: 1,
          name: "שני",
          selection: "choice",
          value: [
            { id: 0, value: "שלום" },
            { id: 1, value: "הלו" },
            { id: 5, value: "ברוכה הבאה" },
          ],
        },
        {
          id: 2,
          name: "שלישי",
          selection: "image",
          value: [{ id: 0, value: "blah.png" }],
        },
      ],
      gameName: "עננים",
      gameDescription: "הרבה והמון",
      gameRequirements: "טובות ורעות",
      image: "Screenshot from 2020-10-13 13-12-59.png",
    };
  }

  saveFieldName = (fieldName, fieldId) => {
    this.state.fieldsData.filter(
      (field) => field.id == fieldId
    )[0].name = fieldName;
  };

  saveSelection = (selection, fieldId) => {
    this.setState((prevState) => {
      prevState.fieldsData.filter(
        (field) => field.id == fieldId
      )[0].selection = selection;
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
  };

  addNewFieldData = () => {
    this.setState((prevState) => {
      let tempFieldsData = [...prevState.fieldsData];
      tempFieldsData.push({
        id: this.state.newKey,
        name: null,
        selection: "text",
        value: [],
      });
      return { fieldsData: tempFieldsData };
    });
    this.setState((prevState) => {
      let nextKey = prevState.newKey;
      nextKey = nextKey + 1;
      return { newKey: nextKey };
    });
  };

  triggerRemoval = (fieldId) => {
    this.setState((prevState) => {
      let oldFieldArray = prevState.fieldsData;
      let newArray = oldFieldArray.filter((field) => field.id !== fieldId);
      return { fieldsData: newArray };
    });
  };

  updateBasicInfo = (props) => {
    switch (props.target.id) {
      case "gameName":
        this.setState({ gameName: props.target.value });
        break;
      case "gameDescription":
        this.setState({ gameDescription: props.target.value });
        break;
      case "gameRequirements":
        this.setState({ gameRequirements: props.target.value });
        break;
      case "image":
        this.setState({ image: props.target.value });
    }
  };

  saveData = () => {
    let dataArray = [
      this.state.gameName,
      this.state.gameDescription,
      this.state.gameRequirements,
    ];
    dataArray.map((value) => {
      if (value.length === 0) {
        console.log("empty");
        return;
      } else if (/[\u0590-\u09fe]/g.test(value) === false) {
        //console.log(value,"not hebrew");
        return;
      } else {
        //console.log(value);
      }
    });
    this.validateFields();
  };

  validateFields = () => {
    this.state.fieldsData.map((fields) => {
      if (fields.selection !== "image") {
        fields.value.map((field) => {
          if (field.value.length === 0) {
            console.log("empty");
            return;
          } else if (/[\u0590-\u09fe]/g.test(field.value) === false) {
            console.log(field.value,"not hebrew");
            return;
          } else {
            return;
          }
        });
      }
    });
  };

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
                  onChange={this.validation}
                  defaultValue={this.state.gameName}
                />
              </label>
              <label className="fieldTitle">
                תיאור המשחק:
                <textarea
                  className="inputFields extendedField"
                  placeholder=""
                  id="gameDescription"
                  onBlur={this.updateBasicInfo}
                  defaultValue={this.state.gameDescription}
                />
              </label>
              <label className="fieldTitle">
                דרישות המשחק:
                <textarea
                  className="inputFields extendedField"
                  placeholder=""
                  id="gameRequirements"
                  onBlur={this.updateBasicInfo}
                  defaultValue={this.state.gameRequirements}
                />
              </label>
              <label className="fieldTitle">
                תמונה:
                <input
                  type="file"
                  id="image"
                  className="hiddenInput"
                  onChange={this.updateBasicInfo}
                />
                <div className="borderCameraIcon">
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
              return (
                <div className="fieldSelectionWithClose">
                  <GameFieldSelection
                    key={fieldObj.id}
                    fieldId={fieldObj.id}
                    name={this.saveFieldName}
                    selection={this.saveSelection}
                    fieldValue={this.saveFieldValue}
                    removal={this.triggerRemoval}
                    changeInputType={
                      this.state.fieldsData.filter(
                        (field) => field.id == fieldObj.id
                      )[0].selection
                    }
                    originalName={fieldObj.name}
                    originalValue={fieldObj.value}
                    imagePath={this.state.fieldsData[0].value[0].value}
                  />
                </div>
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
            <button className="saveButton" onClick={this.saveData}>
              שמור
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default EditGame;
