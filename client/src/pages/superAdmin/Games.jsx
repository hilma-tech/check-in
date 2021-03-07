import React, { Component } from "react";
import "../../style/superAdmin/games_style.scss";
import optionicon from "../../img/optionicon.svg";
import addicon from "../../img/addicon.svg";
import WhiteBar from "../../component/superAdmin/GameNavBar.jsx";
import { withRouter } from "react-router-dom";
import PopUp from "../../component/superAdmin/GamePopUpMenu.jsx";
import Fade from "@material-ui/core/Fade";
import { errorMsgContext } from "../../stores/error.store";
import { gamesContext } from "../../stores/games.store";
import { chosenGameEditContext } from "../../stores/chosenGameEdit.store";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import LoadingPage from "../../component/superAdmin/LoadingGamePage.jsx";
import { IsAuthenticatedContext } from "@hilma/auth";
import OutsideClickHandler from "react-outside-click-handler";
import { Slide } from "@material-ui/core";

class Games extends Component {
  constructor() {
    super();
    this.state = {
      searchVal: "",
      displaySearch: false,
      display: false,
    };
  }

  componentDidMount() {
    if (this.props.games.gamesList.length === 0) {
      this.getGames();
    }
  }

  getGames = async () => {
    await this.props.games.getGames();
    if (!this.props.games.successGettingGames) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל משחקים מהשרת."
      );
    }
  };

  onClickAddGame = () => {
    this.props.history.push(this.props.location.pathname + "Add");
  };

  onClickEditGame = (gameId) => {
    this.props.chosenGameEditContext.setgameId(gameId);
    this.props.history.push(this.props.location.pathname + "Edit");
  };

  OnApprove = async (info) => {
    await this.props.games.deleteGame(info);
    window.location.pathname = "superAdmin/games"
  }

  //todo lol doesnt work for shit
  onClickDeleteGame = (gameId) => {
    this.props.errorMsg.setQuestion("האם אתה בטוח שברצונך למחוק משחק זה?", () => this.OnApprove(gameId),'מחק');
    this.props.errorMsg.question = true;
  };



  //Save the user search value as searchVal in state.
  
  handleChange = (e) => {
    this.setState({ searchVal: e.target.value });
  };
  //When the user press the search icon it's start to show the input text for the searching.
  activateSearch = () => {
    this.setState({ displaySearch: true });
  };

  render() {
    let displayLoading = false;
    return (
      <>
        <div>
          <WhiteBar active="games" />
        </div>
        <div id="wholepage">
          <div id="searchbar">
            <h5 className="title">משחקים</h5>
            <form className={this.state.displaySearch ? "gameSearchbar bordered" : "gameSearchbar"}>
              <Fade
                in={this.state.displaySearch}
                timeout={{
                  appear: 500,
                  enter: 400,
                  exit: 100,
                }}
                mountOnEnter
                unmountOnExit
              >
                <input
                  type="text"
                  name="search"
                  className="searchInp"
                  value={this.state.searchVal}
                  //todo
                  placeholder="חיפוש"
                  onChange={this.handleChange}
                />
              </Fade>
              <p className="searchIcon" onClick={this.activateSearch}></p>
            </form>
          </div>
          {this.props.games.haveMoreGames &&
            this.props.games.gamesList.length === 0
            ? (displayLoading = true)
            : (displayLoading = false)}
          {this.props.games.haveMoreGames &&
            this.props.games.gamesList.length === 0 ? (
              <LoadingPage />
            ) : (
              <div className="grid">
                <div onClick={this.onClickAddGame}>
                  <div className="imageContainer item3 pointyboi">
                    <img className="addImg" src={addicon} alt="" />
                    <h2 className="gameTitleBackground"></h2>
                    <h1 className="gameTitle">הוסף משחק</h1>
                  </div>
                </div>
                {this.props.games.gamesList.map((image, index) => {
                  return (
                    <div key={image.id}>
                      <div className="imageContainer item3">
                        <Fade
                          in={image.showOption}
                          timeout={{
                            appear: 500,
                            enter: 400,
                            exit: 100,
                          }}
                          mountOnEnter
                          unmountOnExit
                        >
                          <PopUp
                            onClickEditGame={this.onClickEditGame}
                            onClickDeleteGame={this.onClickDeleteGame}
                            OnApprove={this.OnApprove}
                            gameId={image.id}
                          />
                        </Fade>
                        <div id="holdImg">
                          <img
                            className="gameImg"
                            alt=""
                            src="https://t3.ftcdn.net/jpg/03/88/80/98/240_F_388809884_QkITxFdPCb4j9hIjA0U3tk7RmI390DeH.jpg"
                          />
                        </div>
                        <h2 className="gameTitleBackground"></h2>
                        <h1 className="gameTitle">
                          {image.game_name}
                        </h1>
                        <OutsideClickHandler
                          onOutsideClick={() =>
                            this.props.games.resetShowOptions()
                          }
                        >
                          <img
                            className="optionIcon"
                            onClick={() => {
                              this.props.games.setShowOption(index);
                            }}
                            alt=""
                            src={optionicon}
                          />
                        </OutsideClickHandler>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          {this.startGetGames ? (
            <img
              style={{ width: "8vw" }}
              src="/icons/loading.gif"
              alt="loading..."
            ></img>
          ) : (
              <button
                className="showMoreGamesB"
                onClick={this.getGames}
                style={{
                  display:
                    this.props.games.haveMoreGames && !displayLoading
                      ? "inline-block"
                      : "none",
                }}
              >
                הצג עוד
              </button>
            )}
        </div>
      </>
    );
  }
}

const mapContextToProps = {
  errorMsg: errorMsgContext,
  games: gamesContext,
  chosenGameEditContext: chosenGameEditContext,
  isAuthenticated: IsAuthenticatedContext,
};

export default withContext(mapContextToProps)(withRouter(observer(Games)));
