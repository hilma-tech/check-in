import { Component } from "react";
import React from "react";
import "../../style/teacher/edit_game_style.scss";
import SmallMenuBar from "../../component/teacher/SmallMenuBar";
import PageTitle from "../../component/teacher/PageTitle";
import ArrowBar from "../../component/teacher/ArrowBar";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import { errorMsgContext } from "../../stores/error.store";
import { chosenGameEditContext } from "../../stores/chosenGameEdit.store";
import { chosenClassContext } from "../../stores/chosenClass.store";
import { gamesContext } from "../../stores/games.store";
import { FileInput, withFiles } from "@hilma/fileshandler-client";
import {
  fieldInputValidation,
  fieldNameValidation,
} from "../../tools/ValidationFunctions";

const axios = require("axios").default;

class EditGame extends Component {
  constructor(props) {
    super();
    this.state = {
      gameName: "",
      gameDescription: "",
      gameRequirements: "",
      image: "",
      fieldsData: [],
      mess: "",
      ErrorsPerField: [],
      gameLink: "",
      startSaveGame: false
    };
    this.imageUploader = props.filesUploader;
  }
  //gets information needed to display the selected game's info
  componentDidMount() {
    if (this.props.chosenClass.classId === 0) {
      this.props.history.push("/teacher/classes");
      return;
    }
    this.getGameInfo();
  }

  getGameInfo = async () => {
    try {
      const { data } = await axios.get("/api/game/getGameInfo", {
        params: { id: this.props.chosenGame.gameId },
      });
      if (data.game_name === null || data.game_name === undefined) {
        this.props.history.push("/teacher/classes/games");
      }
      this.setState({
        fieldsData: data.fields.map((field) => {
          field.errorMessage = { mess: "" };
          return field;
        }),
        gameName: data.game_name,
        gameDescription: data.description,
        gameRequirements: data.requirements,
        image: data.image,
        gameLink: data.video_link
      });
    } catch (error) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל מידע מהשרת."
      );
    }
  };
  validateGame = () => {
    this.state.ErrorsPerField = [];
    var errors = [];
    this.state.fieldsData.map((fields, index) => {
      if (fields.selection !== "image") {
        fields.value.map((field) => {
          let errMess = fieldInputValidation(field.value);
          if (errMess != "") {
            errors.push({
              fieldId: fields.id,
              err: errMess,
            });
          }
        });
      }
    });
    this.setState({ ErrorsPerField: errors });
    
    

    if (errors.length === 0) {
      this.setState({startSaveGame: true})
      this.addGameToDB();
    }
  };

  //adds relation between the current class and the selected game
  //then moves the user back to the game page
  addGameToDB = async () => {
    let isAdded= await this.props.games.addGameToClass(
      this.props.chosenGame.index,
      this.props.chosenClass.classId,
      this.state.fieldsData
      );
      if(!isAdded){
        this.props.errorMsg.setErrorMsg('תקלה בשרת, משחק לא התווסף')
        this.setState({startSaveGame: false})
      }
      else{
    await this.props.games.resetGamesStore();
    this.props.history.push("/teacher/classes/games");}
  };

  sendImageFieldValue = (value) => {
    this.saveFieldValue(value.value, value.fieldI, null, value.link, value.id);
  };
  //כשמו כן הוא
  saveFieldValue = (fieldValue, fieldI, inputId, inputImage, imgId) => {
    //only relevant to choice/multi-choice
    if (inputId !== null) {
      this.setState((prevState) => {
        prevState.fieldsData[fieldI].value[inputId].id = Number(inputId);
        prevState.fieldsData[fieldI].value[inputId].value = fieldValue;
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
  };
  render() {
    return (
      <>
        <SmallMenuBar />
        <PageTitle
          title="משחקים"
          titleTwo={"כיתה " + this.props.chosenClass.classroomName}
        />
        <ArrowBar page="editGame" />
        <div className="smallAlign mobileGap" id="editGameForClass">
          <div className="mobileBackground">
            <div className="mobileGameContainer">
              <img
                className="classGameImg"
                id="classGameImgTeacherWeb"
                alt=""
                src="https://t3.ftcdn.net/jpg/03/88/80/98/240_F_388809884_QkITxFdPCb4j9hIjA0U3tk7RmI390DeH.jpg"
              />
              <h2 className="mobileClassGameTitleBackground"></h2>
              <h1 className="mobileClassGameTitle">{this.state.gameName}</h1>
            </div>
            <h3 className="mobileGameDesc">תיאור המשחק</h3>
            <p className="mobileGameDP">
              {this.state.gameDescription
                ? this.state.gameDescription
                : "אין תיאור משחק"}
            </p>
            <h3 className="mobileGameReq">דרישות המשחק</h3>
            <p className="mobileGameRP">
              {this.state.gameRequirements
                ? this.state.gameRequirements
                : "אין דרישות משחק"}
            </p>
            {this.state.gameLink ?
            <>
            <h3 className="mobileGameLink">סרטון הסבר למשחק</h3>
            <a className="mobileGameL" target="_blank" href={this.state.gameLink}>{this.state.gameLink}</a>
              </> : <></>}
            <h1 className="mobileGameFields">שדות:</h1>
            {this.state.fieldsData.length === 0 ? (
              <p className="noFields">אין שדות למשחק זה</p>
            ) : (
              this.state.fieldsData.map((field, i) => {
               let Errs = this.state.ErrorsPerField.filter(err => err.fieldId===field.id);
               if (Errs.length>0){
                 Errs= Errs[0].err
               }
                

                return (
                  <>
                    <h2 className="mobileFieldName" key={i + 1}>
                      {field.field_name}
                    </h2>

                    <div
                      style={Errs[0] ? { display: "block" } : { display: "none" }}
                    >
                      <p className="error">{Errs}</p>
                    </div>

                    {field.selection !== "image" ? (
                      field.selection === "text" ? (
                        <input
                          key={i}
                          defaultValue={field.value[0].value}
                          className="mobileChangingInput"
                          onBlur={(value) => {
                            this.saveFieldValue(
                              value.target.value,
                              i,
                              0,
                              null,
                              null
                            );
                          }}
                        />
                      ) : (
                        <div className="mobileChangingInputGrid">
                          {field.value.map((value, index) => {
                            if (value.value.length !== 0) {
                              return (
                                <input
                                  key={i}
                                  onBlur={(value) => {
                                    this.saveFieldValue(
                                      value.target.value,
                                      i,
                                      index,
                                      null,
                                      null
                                    );
                                  }}
                                  defaultValue={value.value}
                                  className="mobileChangingInputChoice"
                                />
                              );
                            } else {
                              return <></>;
                            }
                          })}
                        </div>
                      )
                    ) : (
                      <div key={i + 3} className="mobileBorderCameraIcon">
                        <label key={i} className="mobileTeacherBorder">
                          <FileInput
                            onError={() => {
                              this.props.errorMsg.setErrorMsg(
                                "הייתה שגיאה בהעלאת התמונה. התמונה חייבת להיות באחד מן הפורמטים הבאים: jpg/jpeg/png"
                              );
                            }}
                            id="image"
                            className="hiddenInput"
                            type="image"
                            filesUploader={this.props.games.imageUploader}
                            onChange={(value) => {
                              this.saveFieldValue(
                                value.value,
                                i,
                                null,
                                value.link,
                                value.id
                              );
                            }}
                          />
                          <img
                            alt="photograph icon"
                            className="mobileTeacherImg"
                            src={field.value[0].value}
                          />
                        </label>
                      </div>
                    )}
                  </>
                );
              })
            )}
            <div className="mobileSaveButtonBackground">
              <button className="mobileSaveButton"
              style={this.state.startSaveGame ? { pointerEvents: "none" } : {}}
              onClick={this.validateGame}>
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
  errorMsg: errorMsgContext,
  chosenGame: chosenGameEditContext,
  chosenClass: chosenClassContext,
  games: gamesContext,
};

export default withContext(mapContextToProps)(
  withFiles(withRouter(observer(EditGame)))
);
