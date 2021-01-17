import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import WhiteBar from "../../component/superAdmin/ArrowNavBar.jsx";
import "../../style/superAdmin/add_game_style.scss";
import "../../style/superAdmin/form_style.scss";
import GameFieldSelection from "../../component/superAdmin/GameFieldSelection.jsx";
import { withRouter } from "react-router-dom";
import { errorMsgContext } from "../../stores/error.store";
import { chosenGameEditContext } from "../../stores/chosenGameEdit.store";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
const axios = require("axios").default;

class EditGame extends Component {
  constructor() {
    super();
    this.state = {
      newKey: 3,
      gameNameErrorMessages: { toShow: "none", mess: "" },
      gameDescriptionErrorMessages: { toShow: "none", mess: "" },
      gameRequirementsErrorMessages: { toShow: "none", mess: "" },
      fieldsData: [],
      image: "Screenshot from 2020-10-13 13-12-59.png",
    };
    this.infoNotReady = true;
  }

  componentDidMount = async () => {
    try {
      // this.infoNotReady = true;
      // const { data1 } = await axios.post("/api/field/getGameField", { id: 69 });
      const { data } = await axios.get("/api/game/getGameInfo", {
        params: { id: this.props.chosenGameEditContext.gameId },
      });
      this.infoNotReady = false;
      // let tempFieldsData = [];
      // data.map((fieldData) => {
      //   let val = JSON.parse(fieldData.default_value);
      //   tempFieldsData.push({
      //     id: fieldData.id,
      //     name: fieldData.field_name,
      //     selection: fieldData.type,
      //     value: val,
      //     errorMessage: { toShow: "none", mess: "" },
      //   });
      // });
      if (data.game_name === null || data.game_name === undefined) {
        this.props.history.push("/superAdmin/games");
      }
      this.setState({
        fieldsData: data.fields,
        gameName: data.game_name,
        gameDescription: data.description,
        gameRequirements: data.requirements,
        image: data.image,
      });
    } catch (error) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל מידע מהשרת."
      );
    }
  };

  saveFieldName = (fieldName, fieldId) => {
    //   this.state.fieldsData.filter(
    //     (field) => field.id === fieldId
    //   )[0].name = fieldName;
  };

  saveSelection = (selection, fieldId) => {
    //   this.setState((prevState) => {
    //     prevState.fieldsData.filter(
    //       (field) => field.id === fieldId
    //     )[0].selection = selection;
    //     return { fieldsData: prevState.fieldsData };
    //   });
  };

  saveFieldValue = (fieldValue, fieldId, inputId, inputFiles) => {
    //   //only relevant to choice/multi-choice
    //   if (inputId) {
    //     this.setState((prevState) => {
    //       prevState.fieldsData[fieldId].value[inputId] = {
    //         id: inputId,
    //         value: fieldValue,
    //       };
    //       return { fieldsData: prevState.fieldsData };
    //     });
    //     //only relevant to image
    //   } else if (inputFiles) {
    //     this.setState((prevState) => {
    //       prevState.fieldsData[fieldId].value = [];
    //       prevState.fieldsData[fieldId].value[0] = {
    //         id: 0,
    //         value: inputFiles[0].name,
    //       };
    //       return { fieldsData: prevState.fieldsData };
    //     });
    //     //only relevant to text
    //   } else {
    //     this.setState((prevState) => {
    //       prevState.fieldsData[fieldId].value = [];
    //       prevState.fieldsData[fieldId].value[0] = {
    //         id: 0,
    //         value: fieldValue,
    //       };
    //       return { fieldsData: prevState.fieldsData };
    //     });
    //   }
  };

  // addNewFieldData = () => {
  //   this.setState((prevState) => {
  //     let tempFieldsData = [...prevState.fieldsData];
  //     tempFieldsData.push({
  //       id: this.state.newKey,
  //       name: "",
  //       selection: "text",
  //       value: [{ id: 0, value: "" }],
  //       errorMessage: { toShow: "none", mess: "" },
  //     });
  //     return { fieldsData: tempFieldsData };
  //   });
  //   this.setState((prevState) => {
  //     let nextKey = prevState.newKey;
  //     nextKey = nextKey + 1;
  //     return { newKey: nextKey };
  //   });
  // };

  triggerRemoval = (fieldId) => {
    //   this.setState((prevState) => {
    //     let oldFieldArray = prevState.fieldsData;
    //     let newArray = oldFieldArray.filter((field) => field.id !== fieldId);
    //     return { fieldsData: newArray };
    //   });
  };

  // updateBasicInfo = (props) => {
  //   this.setState({ [props.target.id]: props.target.value });
  // };

  // saveData = () => {
  //   let allOK = true;
  //   let fieldOK = true;
  //   let ValidationFunctions = [
  //     { name: "gameName", func: nameValidation, errMsg: "" },
  //     { name: "gameDescription", func: mustInputValidation, errMsg: "" },
  //     { name: "gameRequirements", func: mustInputValidation, errMsg: "" },
  //   ];

  //   ValidationFunctions.forEach((validationData) => {
  //     validationData.errMsg = validationData.func(
  //       this.state[validationData.name]
  //     );
  //     if (validationData.errMsg.length !== 0) {
  //       allOK = false;
  //       this.setState((prevState) => {
  //         prevState[validationData.name + "ErrorMessages"].toShow = "block";
  //         prevState[validationData.name + "ErrorMessages"].mess =
  //           validationData.errMsg;
  //         return {
  //           errorMessages: prevState[validationData.name + "ErrorMessages"],
  //         };
  //       });
  //     } else {
  //       this.setState((prevState) => {
  //         prevState[validationData.name + "ErrorMessages"] = {
  //           toShow: "none",
  //           mess: "",
  //         };
  //         return {
  //           errorMessages: prevState[validationData.name + "ErrorMessages"],
  //         };
  //       });
  //     }
  //   });

  //   fieldOK = this.validateFields();

  //   //after all the validetion we need to send the data to sql
  //   if (allOK && fieldOK) {
  //     this.props.history.goBack(); // after saving go back
  //   }
  // };

  // validateFields = () => {
  //   let errMess = "";
  //   let isOk = true;
  //   this.state.fieldsData.map((fields, index) => {
  //     if (fields.selection !== "image") {
  //       errMess = nameValidation(fields.name);
  //       if (errMess.length !== 0) {
  //         this.setState((prevState) => {
  //           prevState.fieldsData[index].errorMessage.toShow = "block";
  //           prevState.fieldsData[index].errorMessage.mess = errMess;
  //           return { fieldsData: prevState.fieldsData };
  //         });
  //         isOk = false;
  //       } else {
  //         fields.value.map((field) => {
  //           errMess = mustInputValidation(field.value);
  //           if (errMess.length !== 0) {
  //             this.setState((prevState) => {
  //               prevState.fieldsData[index].errorMessage.toShow = "block";
  //               prevState.fieldsData[index].errorMessage.mess = errMess;
  //               return { fieldsData: prevState.fieldsData };
  //             });
  //             isOk = false;
  //           } else {
  //             this.setState((prevState) => {
  //               prevState.fieldsData[index].errorMessage.toShow = "none";
  //               prevState.fieldsData[index].errorMessage.mess = "";
  //               return { fieldsData: prevState.fieldsData };
  //             });
  //           }
  //         });
  //       }
  //     }
  //   });
  //   return isOk;
  // };

  render() {
    return (
      <>
        <div className="withMenu">
          <div className="pageContainer">
            <WhiteBar />
            <form className="formData">
              <label className="labelFields">שם המשחק:</label>
              <p
                className="error"
                style={{ display: this.state.gameNameErrorMessages.toShow }}
              >
                {this.state.gameNameErrorMessages.mess}
              </p>
              <input
                className="inputFields"
                id="gameName"
                type="text"
                placeholder="הכנס את שם המשחק..."
                onBlur={this.updateBasicInfo}
                onChange={this.validation}
                defaultValue={this.state.gameName}
                readOnly={true}
              />
              <label className="labelFields">תיאור המשחק:</label>
              <p
                className="error"
                style={{
                  display: this.state.gameDescriptionErrorMessages.toShow,
                }}
              >
                {this.state.gameDescriptionErrorMessages.mess}
              </p>
              <TextareaAutosize
                className="inputFields"
                placeholder="הכנס תיאור משחק..."
                id="gameDescription"
                onBlur={this.updateBasicInfo}
                defaultValue={this.state.gameDescription}
                readOnly={true}
              />
              <label className="labelFields">דרישות המשחק:</label>
              <p
                className="error"
                style={{
                  display: this.state.gameRequirementsErrorMessages.toShow,
                }}
              >
                {this.state.gameRequirementsErrorMessages.mess}
              </p>
              <TextareaAutosize
                className="inputFields"
                placeholder="הכנס דרישות משחק..."
                id="gameRequirements"
                onBlur={this.updateBasicInfo}
                defaultValue={this.state.gameRequirements}
                readOnly={true}
              />
              <label className="labelFields">תמונה:</label>
              <div className="borderCameraIcon marginTop">
                <label className="borderCameraIconLabel">
                  {/* <FileInput
                  id="image"
                  className="hiddenInput"
                  type="image"
                  onChange={this.updateBasicInfo}
                  filesUploader={this.imageUploader}
                /> */}
                  <img
                    alt="photograph icon"
                    className={
                      typeof this.state.image === "string"
                        ? "chosenImg"
                        : "cameraIcon"
                    }
                    src={this.state.image || "/icons/camera-icon.svg"}
                  />
                </label>
              </div>

              <label className="labelFields">שדות:</label>
              {/* game fields */}
              {this.state.fieldsData.length === 0 ? (
                <p style={{ marginTop: "0" }}>אין שדות למשחק זה</p>
              ) : (
                this.state.fieldsData.map((fieldObj) => {
                  return (
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
                      reading={true}
                    />
                  );
                })
              )}
              {this.infoNotReady ? (
                <div className="infoNotReadyCont"><img
                  className= "infoNotReady"
                  src="/icons/loading.gif"
                  alt="loading..."
                ></img></div>
              ) : (
                <span></span>
              )}
              {/* add fields */}
              {/* <div className="addSomethingNew" onClick={this.addNewFieldData}>
                <img className="addIcon" src={addicon}></img>
                <p className="addTitle">הוסף שדה</p>
              </div> */}
            </form>

            {/* <div className="spacerFromSaveButton"></div>
            <div className="saveButtonBackground">
              <button className="saveButton" onClick={this.saveData}>
                שמור
              </button>
            </div>*/}
          </div>
        </div>
      </>
    );
  }
}

const mapContextToProps = {
  errorMsg: errorMsgContext,
  chosenGameEditContext: chosenGameEditContext,
};

export default withContext(mapContextToProps)(withRouter(observer(EditGame)));
