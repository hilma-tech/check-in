import React, { Component } from "react";
import "../../style/superAdmin/games_style.scss";
import optionicon from "../../img/optionicon.svg";
import addicon from "../../img/addicon.svg";
import WhiteBar from "../../component/superAdmin/GameNavBar.jsx";
import { withRouter } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import PopUp from "../../component/superAdmin/GamePopUpMenu.jsx";
import Fade from "@material-ui/core/Fade";
import PopUpError from '../../component/popUpError'
import { errorMsgContext } from "../../stores/error.store";
import { gamesContext } from "../../stores/games.store";
import { observer } from "mobx-react"
import { withContext } from '@hilma/tools';

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
    if(this.props.games.gamesList.length === 0){
      this.getGames()
    }
  }

  getGames = () => {
    try {
      this.props.games.setGames()
    } catch (error) {
      this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת נסה לרענן את העמוד');
    }
  }

  onClickAddGame = () => {
    this.props.history.push(this.props.location.pathname + "Add");
  };

  //TEMPORARILY COMMENTED OUT, WILL BE RETURN UPON PROPER ROUTING
  onClickEditGame = () => {
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
    return (
      <>
        <div>
          <WhiteBar active="games" />
        </div>
        <div id="wholepage">
          <div id="searchbar">
            <h5 className="title">משחקים</h5>
            <form className="search">
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
            </form>
          </div>
          <div className="grid">
            <div onClick={this.onClickAddGame}>
              <div className="imageContainer item3">
                <img className="addImg" src={addicon} alt="" />
                <h2 className="gameTitleBackground"></h2>
                <h1 className="gameTitle">הוסף משחק</h1>
              </div>
            </div>
            {console.log(this.props.games.gamesList)}
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
                      <PopUp onClickEditGame={this.onClickEditGame} />
                    </Fade>
                    <img className="gameImg" alt="" src={image.photo} />
                    <h2 className="gameTitleBackground"></h2>
                    <h1 className="gameTitle">{image.game_name}</h1>
                    <img
                      className="optionIcon"
                      onClick={() => {this.props.games.setShowOption(index)}}
                      alt=""
                      src={optionicon}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className='showMoreGamesB'
            onClick={this.getGames}
            style={{ display: this.props.games.haveMoreGames ? 'inline-block' : 'none' }}>
            הצג עוד
            </button>
        </div>
        <PopUpError />
      </>
    );
  }
}

const mapContextToProps = {
  errorMsg: errorMsgContext,
  games: gamesContext
}


export default withContext(mapContextToProps)(withRouter(observer(Games)));
