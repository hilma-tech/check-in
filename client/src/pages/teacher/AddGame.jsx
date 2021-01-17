import { Component } from "react";
import React from "react";
import echidnaloo from "../../img/addicon.svg";
import "../../style/teacher/add_game_style.scss";
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

const axios = require("axios").default;

class AddGame extends Component {
  constructor() {
    super();
    this.state = {
      gameName: "",
      gameDescription: "",
      gameRequirements: "",
      image: "",
      fieldsData: [],
    };
  }

  componentDidMount() {
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

  addGameToDB = async () => {
    await this.props.games.addGameToClass(
      this.props.chosenGame.index,
      this.props.chosenClass.classId
    );
    this.props.history.push("/teacher/classes/games");
  };

  render() {
    return (
      <>
        <SmallMenuBar />
        <PageTitle title="משחקים" titleTwo="כיתה א'1" />
        <ArrowBar page="addGame" />
        <div className="smallAlign mobileGap" style={{ top: "26vh" }}>
          <div className="mobileBackground">
            <div className="mobileGameContainer">
              <img
                className="classGameImg"
                alt=""
                src={this.state.image}
              />
              <h2 className="mobileClassGameTitleBackground"></h2>
              <h1 className="mobileClassGameTitle">{this.state.gameName}</h1>
            </div>
            <h3 className="mobileGameDesc">תיאור המשחק</h3>
            <p className="mobileGameDP">{this.state.gameDescription}</p>
            <h3 className="mobileGameReq">דרישות המשחק</h3>
            <p className="mobileGameRP">{this.state.gameRequirements}</p>
            <h1 className="mobileGameFields">שדות:</h1>
            {this.state.fieldsData.map((field) => {
              console.log(field);
              return (
                <>
                  <h2 className="mobileFieldName">{field.field_name}</h2>
                  {field.selection !== "image" ? (
                    field.value.map((value) => {
                      if (value.value.length !== 0) {
                        return (
                          <input
                            defaultValue={value.value}
                            className="mobileChangingInput"
                          />
                        );
                      } else {
                        return <></>;
                      }
                    })
                  ) : (
                    <div className="mobileBorderCameraIcon">
                      <img
                        alt="photograph icon"
                        className="mobileImg"
                        src={field.value[0].value}
                      />
                    </div>
                  )}
                </>
              );
            })}
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

// export default withRouter(AddGame)

const mapContextToProps = {
  errorMsg: errorMsgContext,
  chosenGame: chosenGameEditContext,
  chosenClass: chosenClassContext,
  games: gamesContext
};

export default withContext(mapContextToProps)(withRouter(observer(AddGame)));
