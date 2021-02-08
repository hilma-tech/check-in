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
import { chosenClassContext } from "../../stores/chosenClass.store.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from '@material-ui/core/CircularProgress';

class Games extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenGames: [],
      gamesList: [],
      openPopUp: false,
    };
    this.gameId = 0;
    this.gameIndex = 0;
  }

  componentDidMount() {
    if (this.state.gamesList.length === 0) {
      this.getClassGames();
    }
  }

  getClassGames = async () => {
    await this.props.games.getClassroomGames(this.props.chosenClass.classId);
    if (!this.props.games.successGettingGames) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל משחקים מהשרת."
      );
    }
  };

  limitedAddition = async (index) => {
    if (this.props.games.chosenGameList.length < 6) {
      //smaller than six
      return this.addGameToClass(index);
    } else {
      // equal to six
      await this.props.chosenGame.setgameId(
        this.props.games.gamesList[index].id,
        index
      );
      this.props.history.push("/teacher/classes/showGame")

    }
  };

  limitedRemoval = async (index, id) => {
    if (this.props.games.chosenGameList.length > 2) {
      // bigger than two
      return this.openPopUpClick(index, id);
    } else {
      // equal to two
      this.props.errorMsg.setErrorMsg(
        "לכל כיתה חייב להיות שני משחקים לפחות"
      );
      return null;
    }
  };

  addGameToClass = async (index) => {

    await this.props.chosenGame.setgameId(
      this.props.games.gamesList[index].id,
      index
    );
    this.props.history.push("/teacher/classes/editGame");
  };

  removeGameFromClass = () => {
    this.props.games.removeGameFromClass(
      this.gameIndex,
      this.props.chosenClass.classId,
      this.gameId
    );
  };

  openPopUpClick = (index, id) => {
    this.gameIndex = index;
    this.gameId = id;
    this.props.errorMsg.setQuestion("האם הנך בטוח שברצונך להסיר משחק זה מכיתה זו?", this.removeGameFromClass)
  };

  changePopUpstate = () => {
    this.setState((prevState) => {
      return { openPopUp: !prevState.openPopUp };
    });
  };

  render() {
    return (
      <div style={{ overflowX: "hidden", width: "100vw" }}>
        <SmallMenuBar />
        <SmallNavBar active="games" />
        <PageTitle title={"כיתה " + this.props.chosenClass.classroomName} />
        <ArrowBar
          page="games"
          chosenClass={this.props.chosenClass.classroomName}
        />
        <div className="smallAlign" id="smallAlignClassGames">
          <div className="chosenGamesForClass">
            <div className="scrollChosenGames">
              {this.props.games.chosenGameList.map((gameData, i) => {
                return (
                  <ClassGames
                    key={i}
                    index={i}
                    changeGameStatus={() => {
                      this.limitedRemoval(i, gameData.id);
                    }}
                    chosen={true}
                    name={gameData.game_name}
                    image={gameData.image}
                  />
                );
              })}
            </div>
          </div>
          <p className="gameListTitle">משחקים שניתן להוסיף:</p>
          {/*add search option */}
          {!this.props.games.haveMoreGames && this.props.games.gamesList.length ===0 ?
          <p>אין עוד משחקים שניתן להוסיף</p>:
          <div className="listGamesForClass">
            {this.props.games.gamesList.map((image, index) => {
              return (
                <ClassGames
                  changeGameStatus={this.limitedAddition}
                  chosen={false}
                  name={image.game_name}
                  image={image.image}
                  index={index}
                  key={index}
                />
              );
            })}
          </div>}
          <div style={{ textAlign: "center" }}>
            {
              this.props.games.startGetGames ?
                <CircularProgress color="#043163" size="1.5rem" /> :
                <button
                  className="showMoreGamesB"
                  onClick={this.getClassGames}
                  style={{
                    marginTop: '1vh',
                    display:
                      this.props.games.haveMoreGames
                        ? "inline-block"
                        : "none",
                  }}
                >
                  הצג עוד
            </button>
            }
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
  chosenClass: chosenClassContext,
};

export default withContext(mapContextToProps)(withRouter(observer(Games)));
