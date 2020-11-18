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
import { FilesUploader, FileInput } from "@hilma/fileshandler-client";
import PopUpError from '../../component/popUpError'
import { errorMsgContext } from "../../stores/error.store";
import { observer } from "mobx-react"
import { withContext } from '@hilma/tools';

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
  };

  saveData = () => {
    let allOK = true;
    let getUser = async () => {
      try {
        const response = await axios.post("/api/game/update", { number: 100 });
        console.log(response);
      } catch (error) {
        this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת נסה לבדוק את החיבור')
      }
    }
    getUser();
    let fieldOK = true;
    let ValidationFunctions = [{ name: 'gameName', func: nameValidation, errMsg: '' },
    { name: 'gameDescription', func: mustInputValidation, errMsg: '' },
    { name: 'gameRequirements', func: mustInputValidation, errMsg: '' }]
    getUser = async () => {
      let fieldOK = true;
      let errMess = "";
      let currGameInfo = {
        game_name: this.state.gameName,
        description: this.state.gameDescription,
        requirements: this.state.gameRequirements,
        suspended: false,
      };
      // let currImage = this.state.image;
      // let imageUploader = this.imageUploader;
      let addGameDb = async () => {
        try {
          const response = await axios.post("/api/game/save", currGameInfo);
          console.log(response);
        } catch (error) {
          this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת נסה לבדוק את החיבור')
        }
      }
      // async function addGameImg(){try {
      //     const response = await imageUploader.post("/api/game/saveImg", currImage)
      //     console.log(response);
      //   } catch (error) {
      //     console.log(error);
      //   }}
      addGameDb();
      // addGameImg();
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
  }

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
                <label className="">
                <label className='labelFields'>תמונה:</label>
                <div className="borderCameraIcon marginTop">
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
                </div>
              </label>
            <label className='labelFields'>
              שדות:
              </label>
            {/* game fields */}
            {this.state.fieldsData.map((fieldObj) => {
              return (
                <div>
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
            className='addSomethingNew'
              onClick={this.addNewFieldData}
            >
              <img className='addIcon' src={addicon}></img>
              <p className='addTitle'>הוסף שדה</p>
            </div>
          </form>
          <button className="saveButton" onClick={this.saveData}>
            שמור
            </button>
        </div>
        <PopUpError />
      </>
    );
  }
}

const mapContextToProps = {
  errorMsg: errorMsgContext,
}


export default withContext(mapContextToProps)(withRouter(observer(AddGame)));
