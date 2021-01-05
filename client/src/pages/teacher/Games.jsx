import React from "react";
import SmallMenuBar from "../../component/teacher/SmallMenuBar.jsx";
import SmallNavBar from "../../component/teacher/SmallNavBar.jsx";
import ClassGames from "../../component/teacher/ClassGames.jsx";
import "../../style/teacher/class_games.scss";
import PageTitle from "../../component/teacher/PageTitle.jsx";
import ArrowBar from "../../component/teacher/ArrowBar.jsx";
import { errorMsgContext } from "../../stores/error.store.js";
import { gamesContext } from "../../stores/games.store.js";
import { chosenGameEditContext } from "../../stores/chosenGameEdit.store.js";
import { IsAuthenticatedContext } from "@hilma/auth";
import { withRouter } from "react-router-dom";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";


class Games extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenGames: [],
      gamesList: [],
    };
  }

  componentDidMount() {
    this.props.games.resetShowOptions();
    if (this.state.gamesList.length === 0) {
      this.getGames();
    }
  }
  componentDidMount() {
    this.props.games.resetShowOptions();
    if (this.props.games.gamesList.length === 0) {
      this.getGames();
    }
  }

  getGames = async () => {
    await this.props.games.setGames();
    if (!this.props.games.successGettingGames) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל משחקים מהשרת."
      );
    }
  };

  addGameToClass = async(index) => {
    await this.props.chosenGame.setgameId(this.props.games.gamesList[index].id)
    await this.props.games.addGameToClass(index)
    this.props.history.push('/teacher/classes/addgame')
  }

  render() {
    return (
      <div>
        <SmallMenuBar />
        <PageTitle title="כיתה א'1" />
        <SmallNavBar />
        <ArrowBar page="games" />
        <div className="smallAlign" style={{ top: "39.75vh" }}>
          <div className="chosenGamesForClass">
            <div className="scrollChosenGames">
            {this.props.games.chosenGameList.map((gameData, i) => {
              return (
                  <ClassGames
                    index={i}
                    changeGameStatus={this.props.games.removeGameFromClass}
                    chosen={true}
                    name={gameData.game_name}
                    image={gameData.image}
                  />
                  );
                })}
                </div>
          </div>
          <p className="gameListTitle">משחקים שיתן להוסיף:</p>
          {/* add search option */}
          <div className="listGamesForClass">
            {this.props.games.gamesList.map((image, index) => {
              return (
                <ClassGames
                  changeGameStatus={this.addGameToClass}
                  chosen={false}
                  name={image.game_name}
                  image={image.image}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapContextToProps = {
  errorMsg: errorMsgContext,
  games: gamesContext,
  chosenGame: chosenGameEditContext,
  isAuthenticated: IsAuthenticatedContext,
};

export default withContext(mapContextToProps)(withRouter(observer(Games)));
