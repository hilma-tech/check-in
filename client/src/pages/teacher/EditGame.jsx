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

  //adds relation between the current class and the selected game
  //then moves the user back to the game page
  addGameToDB = async () => {
    await this.props.games.addGameToClass(
      this.props.chosenGame.index,
      this.props.chosenClass.classId
    );
    await this.props.games.resetGamesStore();
    this.props.history.push("/teacher/classes/games");
  };

  // sendImageFieldValue = (value) => {
  //   // console.log('props: ', props);
  //   console.log('value: ', value);
  //   this.saveFieldValue(
  //     value.value,
  //     value.fieldI,
  //     null,
  //     value.link,
  //     value.id
  //   );
  // };
  //כשמו כן הוא
  saveFieldValue = (fieldValue, fieldI, inputId, inputImage, imgId) => {
    //only relevant to choice/multi-choice
    if (inputId) {
      this.setState((prevState) => {
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
            <h1 className="mobileGameFields">שדות:</h1>
            {this.state.fieldsData.length === 0 ? (
              <p className="noFields">אין שדות למשחק זה</p>
            ) : (
                this.state.fieldsData.map((field, i) => {
                  return (
                    <>
                      <h2 className="mobileFieldName" key={i + 1}>
                        {field.field_name}
                      </h2>
                      {field.selection !== "image" ? (
                        field.selection === "text" ? (
                          <input
                            key={i}
                            defaultValue={field.value[0].value}
                            className="mobileChangingInput"
                          />
                        ) : (
                            <div className="mobileChangingInputGrid">
                              {field.value.map((value, i) => {
                                if (value.value.length !== 0) {
                                  return (
                                    <input
                                      key={i}
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
                                filesUploader={this.imageUploader}
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

                            </label></div>
                        )}
                    </>
                  );
                })
              )}
            <div className="mobileSaveButtonBackground">
              <button className="mobileSaveButton" onClick={this.addGameToDB}>
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
