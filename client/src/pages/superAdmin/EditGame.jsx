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
import addicon from "../../img/addicon.svg";
import {
  descriptionValidation,
  nameValidation,
  requirementValidation,
  fieldNameValidation,
  fieldInputValidation,
  linkValidation,
} from "../../tools/ValidationFunctions";
import { withFiles } from "@hilma/fileshandler-client";
import { gamesContext } from "../../stores/games.store.js";

const axios = require("axios").default;

class EditGame extends Component {
  constructor(props) {
    super();
    this.state = {
      newKey: 3,
      gameNameErrorMessages: { toShow: "none", mess: "" },
      gameDescriptionErrorMessages: { toShow: "none", mess: "" },
      gameRequirementsErrorMessages: { toShow: "none", mess: "" },
      gameLinkErrorMessages: { toShow: "none", mess: "" },
      fieldsData: [],
      image: "https://t3.ftcdn.net/jpg/03/88/80/98/240_F_388809884_QkITxFdPCb4j9hIjA0U3tk7RmI390DeH.jpg",
      gameName: "",
      gameId: 0,
      existFieldsData: [],
      deletedFieldsData: [],
    };
    this.imageUploader = props.filesUploader;
    this.infoNotReady = true;
  }

  componentDidMount = async () => {
    try {
      // this.infoNotReady = true;
      const { data } = await axios.get("/api/game/getGameInfo", {
        params: { id: this.props.chosenGameEditContext.gameId },
      });
      this.infoNotReady = false;
      if (data.game_name === null || data.game_name === undefined) {
        this.props.history.push("/superAdmin/games");
      }
      let fields = data.fields
      this.setState({
        fieldsData: fields.map((field) => {
          return { ...field, errorMessage: { toShow: "none", mess: "" } }
        }),
        gameName: data.game_name,
        gameDescription: data.description,
        gameRequirements: data.requirements,
        gameLink: data.video_link,
        gameId: data.id,
        existFieldsData: fields,
        newKey: data.fields.length === 0 ? 1 : data.fields[data.fields.length - 1].id + 1
      });
    } catch (error) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל מידע מהשרת."
      );
    }
  };


  //כשמו כן הוא
  saveFieldName = (fieldName, fieldI) => {
    this.setState((prevState) => {
      prevState.fieldsData[fieldI].name = fieldName;
      return { fieldsData: prevState.fieldsData };
    });
  };

  //כשמו כן הוא
  saveSelection = (selection, fieldI) => {
    this.setState((prevState) => {
      prevState.fieldsData[fieldI].selection = selection;
      prevState.fieldsData[fieldI].value = [{ id: 0, value: "" }];
      return { fieldsData: prevState.fieldsData };
    });
  };

  //כשמו כן הוא
  saveFieldValue = (fieldValue, fieldI, inputId, inputImage, imgId) => {
    //only relevant to choice/multi-choice
    if (inputId) {
      this.setState((prevState) => {
        console.log('prevState.existFieldsData: ', prevState.existFieldsData);
        if (prevState.fieldsData[fieldI].value.length < inputId) {
          for (
            let i = prevState.fieldsData[fieldI].value.length;
            i < inputId;
            i++
          ) {
            prevState.fieldsData[fieldI].value[i] = {
              id: Number(i),
              value: "",
            };
          }
        }
        prevState.fieldsData[fieldI].value[inputId] = {
          id: Number(inputId),
          value: fieldValue,
        };
        return { fieldsData: prevState.fieldsData };
      });
      //only relevant to image
    } else if (inputImage) {
      this.setState((prevState) => {
        prevState.fieldsData[fieldI].value[0] = {
          id: imgId,
          value: inputImage,
        };
        return { fieldsData: prevState.fieldsData };
      });
      //only relevant to text
    } else {
      this.setState((prevState) => {
        prevState.fieldsData[fieldI].value = [];
        prevState.fieldsData[fieldI].value[0] = {
          id: 0,
          value: fieldValue,
        };
        return { fieldsData: prevState.fieldsData };
      });
    }
  }


  //adds another field to the form
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

  //removes selected field
  triggerRemoval = (fieldId) => {
    this.setState((prevState) => {
      let oldFieldArray = prevState.fieldsData;
      let removedField = prevState.existFieldsData.filter((field) => {
        return field.id === fieldId
      })
      if (removedField.length !== 0) {
        prevState.deletedFieldsData.push(removedField[0])
        prevState.existFieldsData = prevState.existFieldsData.filter((field) => {
          return field.id !== fieldId
        })
      }
      let newArray = oldFieldArray.filter((field) => field.id !== fieldId);
      return { fieldsData: newArray, deletedFieldsData: prevState.deletedFieldsData, existFieldsData: prevState.existFieldsData };
    });
  };

  //updates the state regarding info like name, requirements, description
  updateBasicInfo = (props) => {
    this.setState({ [props.target.id]: props.target.value });
  };

  //? updateImage = (value) => {
  //?   this.setState({ image: { id: value.id, value: value.link } });
  //? };

  // puts the data into a format fitting the database
  setUpValues = () => {
    let currFieldData = [];
    this.state.fieldsData.map((obj, i) => {
      let newField = {
        name: obj.name,
        selection: obj.selection,
        value: obj.value,
        order: i + 1,
        id: obj.id
      };
      currFieldData.push(newField);
    });
    return currFieldData;
  };

  //sends all the data entered to the database to be added as a new game
  addGameDb = async () => {
    let currGameInfo = {
      id: this.state.gameId,
      game_name: this.state.gameName,
      image: this.state.image,
      description: this.state.gameDescription,
      requirements: this.state.gameRequirements,
      video_link: this.state.gameLink,
      suspended: false,
    };
    const fieldData = this.setUpValues();
    const deletedFieldsData = this.state.deletedFieldsData.map((field) => field.id)
    const existFieldsData = this.state.existFieldsData.map((existField)=> {
      let existValue = []
      if(existField.selection === "image" || existField.selection === "text"){
        existValue.push({id: 0, value: existField.default_value})
      } else {
        existValue = JSON.parse(existField.default_value).map((value, i)=>{
          return {id: i, value: value}
        })
      }
      return {
        id: existField.id,
        selection: existField.selection,
        value: existValue
      }
    })
    try {
      this.setState({ savingInfo: true });
      
      const response = await this.imageUploader.post(
        "/api/game/editGame",
        JSON.stringify({
          game: currGameInfo,
          field: fieldData,
          deletedField: deletedFieldsData,
          existField: existFieldsData
        })
        );
        this.props.games.editGame(response.data);
        this.props.history.goBack(); // after saving go back
      } catch (error) {
        this.setState({ savingInfo: false });
        if (error.status === 500) {
          this.props.errorMsg.setErrorMsg("קיים כבר משחק בשם זה. נסו שם אחר.");
        } else {
          this.props.errorMsg.setErrorMsg("הייתה שגיאה בשרת נסו לבדוק את החיבור");
        }
      }
    };
    
    //right before adding the data to DB we validate the information
    saveData = () => {
      let allOK = true;
      let fieldOK = true;
      let ValidationFunctions = [
        { name: "gameName", func: nameValidation, errMsg: "" },
        { name: "gameDescription", func: descriptionValidation, errMsg: "" },
      { name: "gameRequirements", func: requirementValidation, errMsg: "" },
      { name: "gameLink", func: linkValidation, errMsg: "" },
      
    ];
    
    //validates the basic information
    ValidationFunctions.forEach((validationData) => {
      validationData.errMsg = validationData.func(
        this.state[validationData.name]
        );
        if (validationData.errMsg.length !== 0) {
          allOK = false;
          this.setState((prevState) => {
            prevState[validationData.name + "ErrorMessages"].toShow = "block";
            prevState[validationData.name + "ErrorMessages"].mess =
            validationData.errMsg;
            return {
              errorMessages: prevState[validationData.name + "ErrorMessages"],
            };
          });
        } else {
          this.setState((prevState) => {
            prevState[validationData.name + "ErrorMessages"] = {
              toShow: "none",
              mess: "",
            };
            return {
              errorMessages: prevState[validationData.name + "ErrorMessages"],
            };
          });
        }
      });
      // if (!this.state.image.value) {
        //   allOK = false;
        //   this.setState({
          //     imageErrorMessages: {
            //       toShow: "block",
            //       mess: "** חייב להכניס שדה זה **",
            //     },
            //   });
            // } else {
              //   this.setState({ imageErrorMessages: { toShow: "none", mess: "" } });
              // }
              
              //validates the fields
              fieldOK = this.validateFields();
              //after all the validetion we need to send the data to sql
              if (allOK && fieldOK) {
                //sends valid information to the server
                this.addGameDb();
              }
            };
            
            //right before adding the data to DB we validate the field info
            validateFields = () => {
              let isOk = true;
              let countFullFields = 0;
              let fieldEmpt = 0;
              let firstErrMsg = "";
              this.state.fieldsData.map((fields, index) => {
                if (fields.selection !== "image") {
                  let errMess = fieldNameValidation(fields.name);
        if (errMess.length !== 0) {
          this.setState((prevState) => {
            prevState.fieldsData[index].errorMessage.toShow = "block";
            prevState.fieldsData[index].errorMessage.mess = errMess;
            return { fieldsData: prevState.fieldsData };
          });
          isOk = false;
        } else {
          fields.value.map((field) => {
            errMess = fieldInputValidation(field.value);
            if (errMess.length !== 0) {
              if (
                errMess === "** שדה זה לא יכול להכיל תווים מיוחדים **" ||
                errMess === "** שדה זה לא יכול להכיל יותר מ-100 תווים **"
                ) {
                  fieldEmpt++;
                  if (firstErrMsg.length === 0) {
                    firstErrMsg = errMess;
                  }
                }
                this.setState((prevState) => {
                  prevState.fieldsData[index].errorMessage.toShow = "block";
                  prevState.fieldsData[index].errorMessage.mess = errMess;
                  return { fieldsData: prevState.fieldsData };
                });
                isOk = false;
              } else {
                countFullFields++;
                this.setState((prevState) => {
                  prevState.fieldsData[index].errorMessage.toShow = "none";
                  prevState.fieldsData[index].errorMessage.mess = "";
                return { fieldsData: prevState.fieldsData };
              });
            }
          });
          if (
            fields.selection === "choice" ||
            fields.selection === "multi-choice"
            ) {
              if (countFullFields >= 2 && fieldEmpt === 0) {
                isOk = true;
                this.setState((prevState) => {
                  prevState.fieldsData[index].errorMessage.toShow = "none";
                  prevState.fieldsData[index].errorMessage.mess = "";
                  return { fieldsData: prevState.fieldsData };
                });
              } else if (fieldEmpt === 0) {
                this.setState((prevState) => {
                  prevState.fieldsData[index].errorMessage.toShow = "block";
                  prevState.fieldsData[index].errorMessage.mess =
                  "** נא למלא לפחות 2 שדות **";
                  return { fieldsData: prevState.fieldsData };
                });
              } else if (firstErrMsg.length !== 0) {
                this.setState((prevState) => {
                  prevState.fieldsData[index].errorMessage.toShow = "block";
                  prevState.fieldsData[index].errorMessage.mess = firstErrMsg;
                  return { fieldsData: prevState.fieldsData };
                });
              }
            }
          }
      } else {
        let errMess = fieldNameValidation(fields.name);
        if (errMess.length !== 0) {
          this.setState((prevState) => {
            prevState.fieldsData[index].errorMessage.toShow = "block";
            prevState.fieldsData[index].errorMessage.mess = errMess;
            return { fieldsData: prevState.fieldsData };
          });
          isOk = false;
        } else {
          if (fields.value[0].value.length === 0) {
            this.setState((prevState) => {
              prevState.fieldsData[index].errorMessage.toShow = "block";
              prevState.fieldsData[index].errorMessage.mess =
              "** חייב להכניס שדה זה **";
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
        }
      }
    });
    return isOk;
  };
  
  
  render() {
    return (
      <>
        <div className="withMenu">
          <div className="pageContainer">
            <WhiteBar />
            <form className="formData">
              <label className="labelFields">מספר זיהוי:</label>
              <p className="inputFields editGameId">{this.state.gameId}</p>
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
              />
              <label className="labelFields">קישור לסרטון:</label>
              <p
                className="error"
                style={{ display: this.state.gameLinkErrorMessages.toShow }}
              >
                {this.state.gameLinkErrorMessages.mess}
              </p>
              <input
                className="inputFields"
                id="gameLink"
                type="text"
                placeholder="הכנס קישור..."
                onBlur={this.updateBasicInfo}
                onChange={this.validation}
                defaultValue={this.state.gameLink}
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
              />

              {/* <label className="labelFields">תמונה:</label> */}
              {/* <div className="borderCameraIcon marginTop"> */}
              {/* <label className="borderCameraIconLabel"> */}
              {/* <FileInput
                  id="image"
                  className="hiddenInput"
                  type="image"
                  onChange={this.updateBasicInfo}
                  filesUploader={this.imageUploader}
                /> */}
              {/* <img */}
              {/* alt="photograph icon" */}
              {/* className={ */}
              {/* typeof this.state.image === "string" */}
              {/* ? "chosenImg" */}
              {/* : "cameraIcon" */}
              {/* } */}
              {/* src={this.state.image || "/icons/camera-icon.svg"} */}
              {/* /> */}
              {/* </label> */}
              {/* </div> */}

              <label className="labelFields">שדות:</label>
              {/* game fields */}
              {this.state.fieldsData.length === 0 ? (
                <p style={{ marginTop: "0" }}>אין שדות למשחק זה</p>
              ) : (
                  this.state.fieldsData.map((fieldObj, ind) => {
                    return (
                      <GameFieldSelection
                        key={fieldObj.id}
                        fieldId={fieldObj.id}
                        fieldI={ind}
                        name={this.saveFieldName}
                        selection={this.saveSelection}
                        fieldValue={this.saveFieldValue}
                        removal={this.triggerRemoval}
                        changeInputType={fieldObj.selection}
                        originalName={fieldObj.name}
                        originalValue={fieldObj.value}
                        errorMessage={fieldObj.errorMessage}
                        imagePath={this.state.fieldsData[0].value[0].value}
                        ourImageUploader={this.imageUploader}
                        reading={false}
                      />
                    );
                  })
                )}
              {this.infoNotReady ? (
                <div className="infoNotReadyCont">
                  <img
                    className="infoNotReady"
                    src="/icons/loading.gif"
                    alt="loading..."
                  ></img>
                </div>
              ) : (
                  <span></span>
                )}
              {/* add fields */}
              <div className="addSomethingNew" onClick={this.addNewFieldData}>
                <img className="addIcon" src={addicon}></img>
                <p className="addTitle">הוסף שדה</p>
              </div>
            </form>

            <div className="spacerFromSaveButton"></div>
            <div className="saveButtonBackground">
              <button className="saveButton" onClick={this.saveData}>
                שמור
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapContextToProps = {
  games: gamesContext,
  errorMsg: errorMsgContext,
  chosenGameEditContext: chosenGameEditContext,
};

export default withContext(mapContextToProps)(withFiles(withRouter(observer(EditGame))));
