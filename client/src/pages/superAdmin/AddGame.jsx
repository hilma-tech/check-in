import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import addicon from "../../img/addicon.svg";
import WhiteBar from "../../component/superAdmin/ArrowNavBar.jsx";
import "../../style/superAdmin/add_game_style.scss";
import "../../style/superAdmin/form_style.scss";
import GameFieldSelection from "../../component/superAdmin/GameFieldSelection.jsx";
import { withRouter } from "react-router-dom";
import {
  mustInputValidation,
  nameValidation,
} from "../../tools/ValidationFunctions";
import { FilesUploader, FileInput, withFiles } from "@hilma/fileshandler-client";
import PopUpError from "../../component/popUpError";
import { errorMsgContext } from "../../stores/error.store";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import { gamesContext } from "../../stores/games.store";

const axios = require("axios").default;

class AddGame extends Component {
  constructor(props) {
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
          order: 0,
          errorMessage: { toShow: "none", mess: "" },
        },
      ],
      gameName: "",
      gameDescription: "",
      gameRequirements: "",
      image: false,
    };
    this.imageUploader = props.filesUploader;
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
        order: this.state.newKey,
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
  };

  // addGameImg = async () => {
  //   try {
  //     // console.log("state",this.imageUploader);
  //     const response = await this.imageUploader.post("/api/game/saveImg");
  //     // console.log("res",response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  addGameDb = async () => {
    let currGameInfo = {
      game_name: this.state.gameName,
      photo: this.state.image,
      description: this.state.gameDescription,
      requirements: this.state.gameRequirements,
      suspended: false,
    };
    try {
      const response = await this.imageUploader.post("/api/game/save",  JSON.stringify({
        game: currGameInfo,
        field: this.state.fieldsData,
      }));
      // this.addGameFieldsDb(response.data[0].id);
      console.log(response.data);
      if(!this.props.games.haveMoreGames){
        this.props.games.addGame(response.data)
      }
      this.props.history.goBack(); // after saving go back
    } catch (error) {
      this.props.errorMsg.setErrorMsg("הייתה שגיאה בשרת נסה לבדוק את החיבור");
    }
  };
  // addGameFieldsDb= async (gameId) => {
  //   try {
  //     const response = await axios.post("/api/field/save", {gameId: gameId, data: this.state.fieldsData})
  //   } catch (error) {
  //     this.props.errorMsg.setErrorMsg("הייתה שגיאה בשרת נסה לבדוק את החיבור");
  //   }
  // }

  saveData = () => {
    // this.addGameImg();

    let allOK = true;
    let fieldOK = true;
    let ValidationFunctions = [{ name: 'gameName', func: nameValidation, errMsg: '' },
    { name: 'gameDescription', func: mustInputValidation, errMsg: '' },
    { name: 'gameRequirements', func: mustInputValidation, errMsg: '' }]

    ValidationFunctions.forEach((validationData) => {
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
      //fetch to the server
      this.addGameDb();
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
          <form className='formData'>
            <label className='labelFields'>
              שם המשחק:
              </label>
            <p className="error"
              style={{ display: this.state.gameNameErrorMessages.toShow }}
            >
              {this.state.gameNameErrorMessages.mess}
            </p>
            <input
              className='inputFields'
              id="gameName"
              type="text"
              placeholder="הכנס את שם המשחק..."
              onBlur={this.updateBasicInfo}
            />
            <label className='labelFields'>
              תיאור המשחק:
              </label>
            <p
              className="error"
              style={{
                display: this.state.gameDescriptionErrorMessages.toShow,
              }}
            >
              {this.state.gameDescriptionErrorMessages.mess}
            </p>
            <TextareaAutosize
              className='inputFields'
              placeholder="הכנס תיאור משחק..."
              id="gameDescription"
              onChange={this.updateBasicInfo}
            />
            <label className='labelFields'>
              דרישות המשחק:
              </label>
            <p
              className="error"
              style={{
                display: this.state.gameRequirementsErrorMessages.toShow,
              }}
            >
              {this.state.gameRequirementsErrorMessages.mess}
            </p>
            <TextareaAutosize
              className='inputFields'
              placeholder="הכנס דרישות משחק..."
              id="gameRequirements"
              onBlur={this.updateBasicInfo}
            />
              <label className='labelFields'>תמונה:</label>
              <div className="borderCameraIcon marginTop">
            <label className='borderCameraIconLabel'>
                <FileInput
                  id="image"
                  className="hiddenInput"
                  type="image"
                  onChange={this.updateImage}
                  filesUploader={this.imageUploader}
                />
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
            <label className='labelFields'>
              שדות:
              </label>
            {/* game fields */}
            {this.state.fieldsData.map((fieldObj) => {
              return (
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
              );
            })}
            {/* add fields */}
            <div
              className='addSomethingNew'
              onClick={this.addNewFieldData}
            >
              <img className="addIcon" src={addicon} alt="add icon"></img>
              <p className="addTitle">הוסף שדה</p>
            </div>
          </form>
          <div className='spacerFromSaveButton'></div>
          <div className='saveButtonBackground'>
            <button className="saveButton" onClick={this.saveData}>
              שמור
            </button>
          </div>
        </div>
        <PopUpError />
      </>
    );
  }
}

const mapContextToProps = {
  errorMsg: errorMsgContext,
  games: gamesContext
};

export default withContext(mapContextToProps)(withFiles(withRouter(observer(AddGame))));
