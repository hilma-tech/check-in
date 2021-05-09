import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router-dom";
import { chosenClassContext } from "../../stores/chosenClass.store";
import { chosenGameEditContext } from "../../stores/chosenGameEdit.store";
import { gamesContext } from "../../stores/games.store";

//component to show the name and picture of a specific game
class ClassGames extends React.Component {
  showGameInfo = async () => {
    if (this.props.chosen) {
      await this.props.chosenGame.setgameId(
        this.props.games.chosenGameList[this.props.index].id
      );
      this.props.games.whatData("new")
      this.props.history.push({
        pathname: "/teacher/classes/showGame",
        state: { data: this.props.chosenClass.classId }
      });
    }
  };

  render() {
    return (
      <div className={this.props.chosen ? "chosenGameForClassContainer": "gameContainer"}>
        <img
          className="classGameImg"
          alt=""
          src="https://t3.ftcdn.net/jpg/03/88/80/98/240_F_388809884_QkITxFdPCb4j9hIjA0U3tk7RmI390DeH.jpg"
          // src={this.props.image}
          onClick={this.showGameInfo}
        />
        <img
          className={
            this.props.chosen ? "classGameIconClose" : "classGameIconAdd"
          }
          alt=""
          onClick={() => {
            this.props.changeGameStatus(this.props.index);
          }}
          src={
            this.props.chosen
              ? "/icons/ionic-close-circle-outline.svg"
              : "/icons/ionic-ios-add-circle-outline.svg"
          }
        />
        <h2
        className="classGameTitleBackground"
          onClick={this.showGameInfo}
        >{null}</h2>
        <h1 className="classGameTitle" onClick={this.showGameInfo}>
          {this.props.name}
        </h1>
      </div>
    );
  }
}

const mapContextToProps = {
  games: gamesContext,
  chosenGame: chosenGameEditContext,
  chosenClass: chosenClassContext,
};

export default withContext(mapContextToProps)(withRouter(observer(ClassGames)));
