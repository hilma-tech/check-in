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


class Games extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenGames: [],
      gamesList: [],
    };
  }

  componentDidMount() {
    if (this.state.gamesList.length === 0) {
      this.getGames();
    }
  }
   

  getGames = async () => {
    await this.props.games.getGames();
    await this.props.games.getClassroomGames(this.props.chosenClass.classId)
    if (!this.props.games.successGettingGames) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל משחקים מהשרת."
      );
    }
  }

  addGameToClass = async (index) => {
    await this.props.chosenGame.setgameId(this.props.games.gamesList[index].id, index);
   this.props.history.push('/teacher/classes/editGame')
  }

  removeGameFromClass = (index, classId) => {
    this.props.errorMsg.setQuestion(
      "האם הנך בטוח שברצונך להסיר משחק זה מכיתה זו?"
    );
    if(this.props.errorMsg.approve){
      this.props.games.removeGameFromClass(index, classId)
    }
  }

  render() {
    return (
      <div style={{ overflowX: 'hidden', width: '100vw' }}>
        <SmallMenuBar />
        <SmallNavBar active="games" />
        <PageTitle title={"כיתה " + this.props.chosenClass.classroomName} />
        <ArrowBar page="games" chosenClass={this.props.chosenClass.classroomName} />
        <div className="smallAlign" id='smallAlignClassGames'>
          <div className="chosenGamesForClass">
            <div className="scrollChosenGames">
              {this.props.games.chosenGameList.map((gameData, i) => {
                return (
                  <ClassGames
                    index={i}
                    changeGameStatus={()=>{this.removeGameFromClass(i,this.props.chosenClass.classId)}}
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
  chosenClass: chosenClassContext,
};

export default withContext(mapContextToProps)(withRouter(observer(Games)));
