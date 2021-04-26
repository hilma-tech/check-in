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

let delayTime = null;

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
    let isDeleted = await this.props.games.deleteGame(info);
    if (isDeleted) {
      window.location.pathname = "superAdmin/games";
    } else {
      this.props.errorMsg.setErrorMsg("תקלה בשרת, משחק לא נמחק");
    }
  };

  //todo lol doesnt work for shit
  onClickDeleteGame = (gameId) => {
    this.props.errorMsg.setQuestion(
      "האם אתה בטוח שברצונך למחוק משחק זה?",
      () => this.OnApprove(gameId),
      "מחק"
    );
    this.props.errorMsg.question = true;
  };

  //Save the user search value as searchVal in state.

  handleChange = async (e) => {
    let value = e.target.value;
    if (delayTime) clearTimeout(delayTime);
    await this.setState({ searchVal: value });
    if (value === "") {
      this.searchGames();
    } else
      delayTime = setTimeout(async () => {
        this.searchGames();
      }, 300);
  };
  //When the user press the search icon it's start to show the input text for the searching.
  activateSearch = () => {
    this.setState({ displaySearch: true });
  };
  closeSearch = () => {
    this.setState({
      searchVal: "",
      searched: false,
      displaySearch: false,
    });
  };
  searchGames = async () => {
    this.props.games.searchGamesReplace();
    this.setState({ searched: true });
    await this.props.games.searchGames(this.state.searchVal);
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
            <h5 className="title">משחקים</h5>{" "}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className={
                this.state.displaySearch
                  ? "tablesSearchbar bordered"
                  : "tablesSearchbar"
              }
            >
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
                  placeholder="חיפוש"
                  onChange={this.handleChange}
                />
              </Fade>
              <p
                className="searchIcon"
                onClick={
                  !this.state.displaySearch
                    ? this.activateSearch
                    : this.closeSearch
                }
              ></p>
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
              <div>
                {this.state.searched && this.state.searchVal ? (
                  <div>
                    {this.props.games.searchedGames.length === 0 ? (
                      <p>לא נמצאו משחקים בשם זה</p>
                    ) : (
                        <div className="grid">
                          {this.props.games.searchedGames.map((image, index) => {
                            console.log('image: ', image);
                            return (
                              <div key={image.id} onClick={()=>{console.log('fun stuff');}}>
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
                                  <h1 className="gameTitle">{image.game_name}</h1>
                                  <OutsideClickHandler
                                    onOutsideClick={() =>
                                      this.props.games.resetShowOptions('searched')
                                    }
                                  >
                                    <img
                                      className="optionIcon"
                                      onClick={() => {
                                        this.props.games.setShowOption(index,'searched');
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
                  </div>
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
                              <h1 className="gameTitle">{image.game_name}</h1>
                              <OutsideClickHandler
                                onOutsideClick={() =>
                                  this.props.games.resetShowOptions('')
                                }
                              >
                                <img
                                  className="optionIcon"
                                  onClick={() => {
                                    this.props.games.setShowOption(index,'');
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
              </div>
            )}

          {this.startGetGames ? (
            <img
              style={{ width: "8vw" }}
              src="/icons/loading.gif"
              alt="loading..."
            ></img>
          ) : (<div>
            {this.state.searched && this.state.searchVal ? null : <button
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
            </button>}</div>
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