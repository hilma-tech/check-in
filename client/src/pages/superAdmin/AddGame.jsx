import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import addicon from "../../img/addicon.svg";
import WhiteBar from "../../component/superAdmin/ArrowNavBar.jsx";
import "../../style/superAdmin/add_game_style.scss";
import "../../style/superAdmin/form_style.css";
import GameFieldSelection from "../../component/superAdmin/GameFieldSelection.jsx";
import { withRouter } from "react-router-dom";
import {
  mustInputValidation,
  nameValidation,
} from "../../tools/ValidationFunctions";
import { FilesUploader, FileInput } from "@hilma/fileshandler-client";

const axios = require("axios").default;

class AddGame extends Component {
  constructor() {
    super();
    this.state = {
      newKey: 1,
      gameNameErrorMessages: { toShow: "none", mess: "" },
      gameDescriptionErrorMessages: { toShow: "none", mess: "" },
      gameRequirementsErrorMessages: { toShow: "none", mess: "" },
      fieldsData: [
        {
          id: 0,
          name: "",
          selection: "text",
          value: [{ id: 0, value: "" }],
          errorMessage: { toShow: "none", mess: "" },
        },
      ],
      gameName: "",
      gameDescription: "",
      gameRequirements: "",
      image: false,
    };
    this.imageUploader = new FilesUploader();
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

  saveFieldValue = (fieldValue, fieldId, inputId, inputImage) => {
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
    } else if (inputImage) {
      this.setState((prevState) => {
        prevState.fieldsData[fieldId].value[0] = {
          id: 0,
          value: inputImage,
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

  updateImage = (value) => {
    this.setState({ image: value.link });
  }

  saveData = () => {
    let allOK = true;
      async function getUser() {
        try {
          const response = await axios.post("/api/game/update",{number: 100});
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
      getUser();
    let fieldOK = true;
    let errMess = "";

      //-------------- game name validation ----------------
      errMess = nameValidation(this.state.gameName);
      if (errMess.length !== 0) {
        allOK = false;
        this.setState((prevState) => {
          console.log(errMess);
          prevState.gameNameErrorMessages.toShow = "block";
          prevState.gameNameErrorMessages.mess = errMess;
          return { errorMessages: prevState.gameNameErrorMessages };
        });
      } else {
        this.setState((prevState) => {
          prevState.gameNameErrorMessages = { toShow: "none", mess: "" };
          return { errorMessages: prevState.gameNameErrorMessages };
        });
      }
      //-------------- game description validation ----------------
      errMess = mustInputValidation(this.state.gameDescription);
      if (errMess.length !== 0) {
        allOK = false;
        this.setState((prevState) => {
          prevState.gameDescriptionErrorMessages.toShow = "block";
          prevState.gameDescriptionErrorMessages.mess = errMess;
          return { errorMessages: prevState.gameDescriptionErrorMessages };
        });
      } else {
        this.setState((prevState) => {
          prevState.gameDescriptionErrorMessages = { toShow: "none", mess: "" };
          return { errorMessages: prevState.gameDescriptionErrorMessages };
        });
      }
      //-------------- game requirements validation ----------------
      errMess = mustInputValidation(this.state.gameRequirements);
      if (errMess.length !== 0) {
        allOK = false;
        this.setState((prevState) => {
          prevState.gameRequirementsErrorMessages.toShow = "block";
          prevState.gameRequirementsErrorMessages.mess = errMess;
          return { errorMessages: prevState.gameRequirementsErrorMessages };
        });
      } else {
        this.setState((prevState) => {
          prevState.gameRequirementsErrorMessages = { toShow: "none", mess: "" };
          return { errorMessages: prevState.gameRequirementsErrorMessages };
        });
      }

      fieldOK = this.validateFields();

      //after all the validetion we need to send the data to sql
      if (allOK && fieldOK) {
        //fetch to the server
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
                    onChange={this.updateBasicInfo}
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
                  />
                </label>
                <label className="fieldTitle imageWidth">
                  תמונה:
                <div className="borderCameraIcon marginTop">
                    <FileInput
                      id="image"
                      className="hiddenInput"
                      type="image"
                      onChange={this.updateImage}
                      filesUploader={this.imageUploader}
                    />
                    <img
                      className={
                        typeof this.state.image === "string"
                          ? "chosenImg"
                          : "cameraIcon"
                      }
                      src={this.state.image || "/icons/camera-icon.svg"}
                    />
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
                  <div className="fieldSelectionWithClose marginTop">
                    <GameFieldSelection
                      key={fieldObj.id}
                      fieldId={fieldObj.id}
                      name={this.saveFieldName}
                      selection={this.saveSelection}
                      fieldValue={this.saveFieldValue}
                      removal={this.triggerRemoval}
                      originalName={fieldObj.name}
                      originalValue={fieldObj.value}
                      errorMessage={fieldObj.errorMessage}
                      changeInputType={fieldObj.selection}
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
                <img className="addIcon" src={addicon}></img>
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

  export default withRouter(AddGame);
