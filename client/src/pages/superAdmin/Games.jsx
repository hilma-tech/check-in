import React, { Component } from "react";
import "../../style/superAdmin/games_style.scss";
import optionicon from "../../img/optionicon.svg";
import addicon from "../../img/addicon.svg";
import WhiteBar from "../../component/superAdmin/GameNavBar.jsx";
import { withRouter } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import PopUp from "../../component/superAdmin/GamePopUpMenu.jsx";
import Fade from "@material-ui/core/Fade";
import { errorMsgContext } from "../../stores/error.store";
import { gamesContext } from "../../stores/games.store";
import { chosenGameEditContext } from "../../stores/chosenGameEdit.store";
import { observer } from "mobx-react"
import { withContext } from '@hilma/tools';
import LoadingPage from '../../component/LoadingPage.jsx'

const axios = require("axios").default;

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
    this.props.games.resetShowOptions()
    if (this.props.games.gamesList.length === 0) {
      this.getGames()
    }
  }

  getGames = () => {
    let getGames = this.props.games.setGames()
    if (!this.props.games.successGettingGames) {
      this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת. לא ניתן לקבל משחקים מהשרת.');
    }
  }

  onClickAddGame = () => {
    this.props.history.push(this.props.location.pathname + "Add");
  };

  //TEMPORARILY COMMENTED OUT, WILL BE RETURN UPON PROPER ROUTING
  onClickEditGame = (gameId) => {
    this.props.chosenGameEditContext.setgameId(gameId)
    this.props.history.push(this.props.location.pathname + 'Edit');
  };

  //Save the user search value as searchVal in state.
  handleChang = (e) => {
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
            {/* for now */}
            {/* <form className="search">
              <Slide
                direction="right"
                in={this.state.displaySearch}
                mountOnEnter
                unmountOnExit
              >
                <input
                  type="text"
                  name="search"
                  value={this.state.searchVal}
                  placeholder="חיפוש"
                  onChange={this.handleChang}
                />
              </Slide>
              <p className="searchIcon" onClick={this.activateSearch}></p>
            </form> */}
          </div>
          {this.props.games.haveMoreGames && this.props.games.gamesList.length === 0 ?
            displayLoading = true : displayLoading = false}
          {this.props.games.haveMoreGames && this.props.games.gamesList.length === 0 ?
            <LoadingPage /> :
            <div className="grid">
              <div onClick={this.onClickAddGame}>
                <div className="imageContainer item3">
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
                        <PopUp onClickEditGame={this.onClickEditGame} gameId={image.id} />
                      </Fade>
                      <img className="gameImg" alt="" src={image.image} />
                      <h2 className="gameTitleBackground"></h2>
                      <h1 className="gameTitle">{image.game_name.length > 15 ? image.game_name.slice(0, 15) + '...': image.game_name}</h1>
                      <img
                        className="optionIcon"
                        onClick={() => { this.props.games.setShowOption(index) }}
                        alt=""
                        src={optionicon}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          }

          <button
            className='showMoreGamesB'
            onClick={this.getGames}
            style={{ display: this.props.games.haveMoreGames && !displayLoading ? 'inline-block' : 'none' }}>
            הצג עוד
            </button>
        </div>
      </>
    );
  }
}

const mapContextToProps = {
  errorMsg: errorMsgContext,
  games: gamesContext,
  chosenGameEditContext: chosenGameEditContext
}


export default withContext(mapContextToProps)(withRouter(observer(Games)));
