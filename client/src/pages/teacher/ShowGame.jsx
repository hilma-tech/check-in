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
import { Axios, GetInfoErrorMsg, OnUnauthorizedError, TeacherDeletedMsg } from "../../tools/GlobalVarbs";

//shows game whilst you are unable to add it to a class or after being added
class ShowGame extends Component {
  constructor() {
    super();
    this.state = {
      gameName: "",
      gameDescription: "",
      gameRequirements: "",
      image: "",
      fieldsData: [],
      gameLink: ""
    };
  }

  componentDidMount() {
    if (this.props.chosenClass.classId === 0) {
      this.props.history.push("/teacher/classes");
      return;
    }
    this.getGameInfo();
  }

  getGameInfo = async () => {
    try {
      const { data } = await Axios.get("/api/game/getShowGameInfo", {
        params: { game_id: this.props.chosenGame.gameId,
          classroom_id: this.props.chosenClass.classId, datatype: this.props.games.datatype },
        });
        if (data.game_name === null || data.game_name === undefined) {
          this.props.history.push("/teacher/classes/games");
        }
        // console.log(data, "dataA");
      this.setState({
        fieldsData: data.fields,
        gameName: data.game_name,
        gameDescription: data.gameDescription,
        gameRequirements: data.gameRequirements,
        image: data.image,
        gameLink: data.gameLink
      });
    } catch (error) {
      if(error.status === OnUnauthorizedError){
        this.props.errorMsg.setErrorMsg(
          TeacherDeletedMsg
        );
      } else {
        this.props.errorMsg.setErrorMsg(
          GetInfoErrorMsg
        );
      }
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
        <ArrowBar page="showGame" />
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
            {this.state.gameLink ?
            <>
            <h3 className="mobileGameLink">סרטון הסבר למשחק</h3>
            <a className="mobileGameL" target="_blank" href={this.state.gameLink}>{this.state.gameLink}</a>
              </> : <></>}
            <h3 className="mobileGameDesc">תיאור המשחק</h3>
            <p className="mobileGameDP">{this.state.gameDescription ? this.state.gameDescription : "אין תיאור משחק"}</p>
            <h3 className="mobileGameReq">דרישות המשחק</h3>
            <p className="mobileGameRP">{this.state.gameRequirements ? this.state.gameRequirements : "אין דרישות משחק"}</p>
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
                          readOnly={true}
                          defaultValue={field.value[0].value}
                          className="mobileChangingInput"
                        />
                      ) : (
                        <div className="mobileChangingInputGrid" key={i+3}>
                          {field.value.map((value, i) => {
                            if (value.value.length !== 0) {
                              return (
                                <input
                                  key={i}
                                  readOnly={true}
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
                      <div key={i} className="mobileBorderCameraIcon">
                        <img
                        key={i+2}
                          alt="photograph icon"
                          className="mobileTeacherImg"
                          src={field.value[0].value}
                        />
                      </div>
                    )}
                  </>
                );
              })
            )}
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

export default withContext(mapContextToProps)(withRouter(observer(ShowGame)));
