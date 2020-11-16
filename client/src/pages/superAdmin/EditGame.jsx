import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import WhiteBar from "../../component/superAdmin/ArrowNavBar.jsx";
import "../../style/superAdmin/add_game_style.scss";
import "../../style/superAdmin/form_style.css";
import addicon from "../../img/addicon.svg";
import GameFieldSelection from "../../component/superAdmin/GameFieldSelection.jsx";
import { withRouter } from "react-router-dom";
import { mustInputValidation, nameValidation } from '../../tools/ValidationFunctions'

class EditGame extends Component {
  constructor() {
    super();

    this.state = {
      newKey: 3,
      gameNameErrorMessages: { toShow: "none", mess: "" },
      gameDescriptionErrorMessages: { toShow: "none", mess: "" },
      gameRequirementsErrorMessages: { toShow: "none", mess: "" },
      fieldsData: [
        {
          id: 0,
          name: "בלה בלה",
          selection: "text",
          value: [{ id: 0, value: "חשבו על חייכם" }],
          errorMessage: { toShow: "none", mess: "" },
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
          errorMessage: { toShow: "none", mess: "" },
        },
        {
          id: 2,
          name: "שלישי",
          selection: "image",
          value: [{ id: 0, value: "blah.png" }],
          errorMessage: { toShow: "none", mess: "" },
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
      (field) => field.id === fieldId
    )[0].name = fieldName;
  };

  saveSelection = (selection, fieldId) => {
    this.setState((prevState) => {
      prevState.fieldsData.filter(
        (field) => field.id === fieldId
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
        name: "",
        selection: "text",
        value: [{ id: 0, value: "" }],
        errorMessage: { toShow: "none", mess: "" },
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
        this.setState({ [props.target.id]: props.target.value });
  };

  saveData = () => {
    let allOK = true;
    let fieldOK = true;
    let ValidationFunctions = [{ name: 'gameName', func: nameValidation, errMsg: '' },
    { name: 'gameDescription', func: mustInputValidation, errMsg: '' },
    { name: 'gameRequirements', func: mustInputValidation, errMsg: '' }]

    ValidationFunctions.forEach((validationData)=>{
      validationData.errMsg = validationData.func(this.state[validationData.name])
      if (validationData.errMsg.length !== 0) {
        allOK = false;
        this.setState((prevState) => {
          prevState[(validationData.name + 'ErrorMessages')].toShow = "block";
          prevState[(validationData.name + 'ErrorMessages')].mess = validationData.errMsg;
          return { errorMessages: prevState[(validationData.name + 'ErrorMessages')] };
        });
      } else {
        this.setState((prevState) => {
          prevState[(validationData.name + 'ErrorMessages')] = { toShow: "none", mess: "" };
          return { errorMessages: prevState[(validationData.name + 'ErrorMessages')] };
        });
      }
    })

    fieldOK = this.validateFields();

    //after all the validetion we need to send the data to sql
    if (allOK && fieldOK) {
      this.props.history.goBack(); // after saving go back
    }
  };

  validateFields = () => {
    let errMess = "";
    let isOk = true;
    this.state.fieldsData.map((fields, index) => {
      if (fields.selection !== "image") {
        errMess = nameValidation(fields.name);
        if (errMess.length !== 0) {
          this.setState((prevState) => {
            prevState.fieldsData[index].errorMessage.toShow = "block";
            prevState.fieldsData[index].errorMessage.mess = errMess;
            return { fieldsData: prevState.fieldsData };
          });
          isOk = false;
        } else {
          fields.value.map((field) => {
            errMess = mustInputValidation(field.value);
            if (errMess.length !== 0) {
              this.setState((prevState) => {
                prevState.fieldsData[index].errorMessage.toShow = "block";
                prevState.fieldsData[index].errorMessage.mess = errMess;
                return { fieldsData: prevState.fieldsData };
              });
              isOk = false;
            } else {
              this.setState((prevState) => {
                prevState.fieldsData[index].errorMessage.toShow = "none";
                prevState.fieldsData[index].errorMessage.mess = "";
                return { fieldsData: prevState.fieldsData };
              });
            }
          });
        }
      }
    });
    return isOk;
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
                <p
                  className="error"
                  style={{ display: this.state.gameNameErrorMessages.toShow }}
                >
                  {this.state.gameNameErrorMessages.mess}
                </p>
                <input
                  id="gameName"
                  className="inputFields marginTop"
                  type="text"
                  placeholder="הכנס את שם המשחק..."
                  onBlur={this.updateBasicInfo}
                  onChange={this.validation}
                  defaultValue={this.state.gameName}
                />
              </label>
              <label className="fieldTitle">
                תיאור המשחק:
                <p
                  className="error"
                  style={{
                    display: this.state.gameDescriptionErrorMessages.toShow,
                  }}
                >
                  {this.state.gameDescriptionErrorMessages.mess}
                </p>
                <TextareaAutosize
                  className="inputFields marginTop extendedField"
                  placeholder="הכנס תיאור משחק..."
                  id="gameDescription"
                  onBlur={this.updateBasicInfo}
                  defaultValue={this.state.gameDescription}
                />
              </label>
              <label className="fieldTitle">
                דרישות המשחק:
                <p
                  className="error"
                  style={{
                    display: this.state.gameRequirementsErrorMessages.toShow,
                  }}
                >
                  {this.state.gameRequirementsErrorMessages.mess}
                </p>
                <TextareaAutosize
                  className="inputFields marginTop extendedField"
                  placeholder="הכנס דרישות משחק..."
                  id="gameRequirements"
                  onBlur={this.updateBasicInfo}
                  defaultValue={this.state.gameRequirements}
                />
              </label>
              <label className="fieldTitle imageWidth">
                תמונה:
                <input
                  type="file"
                  id="image"
                  className="hiddenInput"
                  onChange={this.updateBasicInfo}
                />
                <div className="borderCameraIcon marginTop ">
                  <img alt="photography icon" className="cameraIcon" src="/icons/camera-icon.svg" />
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
                <div className="fieldSelectionWithClose marginTop ">
                  <GameFieldSelection
                    key={fieldObj.id}
                    fieldId={fieldObj.id}
                    name={this.saveFieldName}
                    selection={this.saveSelection}
                    fieldValue={this.saveFieldValue}
                    removal={this.triggerRemoval}
                    changeInputType={fieldObj.selection}
                    originalName={fieldObj.name}
                    originalValue={fieldObj.value}
                    errorMessage={fieldObj.errorMessage}
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
              <img alt="add icon" className="addIcon" src={addicon}></img>
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

export default withRouter(EditGame);
