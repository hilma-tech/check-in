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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


class Games extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenGames: [],
      gamesList: [],
      openPopUp: false,
    };
    this.gameId = 0
    this.gameIndex= 0
  }

  componentDidMount() {
    if (this.state.gamesList.length === 0) {
      this.getGames();
    }
  }


  getGames = async () => {
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

  removeGameFromClass = () => {
    this.changePopUpstate()
    this.props.games.removeGameFromClass(this.gameIndex, this.props.chosenClass.classId, this.gameId)
  }

  openPopUpClick = (index, id) => {
    this.changePopUpstate()
    this.gameIndex = index
    this.gameId = id
  }

  changePopUpstate = () => {
    this.setState((prevState) => {
      return { openPopUp: !prevState.openPopUp }
    })
  }

  render() {
    return (
      <div style={{ overflowX: 'hidden', width: '100vw' }}>
        <SmallMenuBar />
        <SmallNavBar active="games" />
        <PageTitle title={"כיתה " + this.props.chosenClass.classroomName} />
        <ArrowBar page="games" chosenClass={this.props.chosenClass.classroomName} />
        <Dialog
          PaperProps={{
            style: {
              backgroundColor: 'white',
              boxShadow: '0px 3px 6px #00000029',
              border: '1px solid #707070',
              padding: '5px',
              width: '75vw'
            },
          }}
          open={this.state.openPopUp}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <span className='popUpQuesion'>האם הנך בטוח שברצונך להסיר משחק זה מכיתה זו?</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button className='popUpCanselButton' color="primary" onClick={this.changePopUpstate}>
              ביטול
          </button>
            <button className='popUpOkButton' onClick={this.removeGameFromClass}>
              אישור
          </button>

          </DialogActions>
        </Dialog>
        <div className="smallAlign" id='smallAlignClassGames'>
          <div className="chosenGamesForClass">
            <div className="scrollChosenGames">
              {this.props.games.chosenGameList.map((gameData, i) => {
                return (
                  <ClassGames
                    key={i}
                    index={i}
                    changeGameStatus={() => { this.openPopUpClick(i, gameData.id) }}
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
                  key={index}
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
