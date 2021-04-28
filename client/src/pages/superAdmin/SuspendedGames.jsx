import React, { Component } from "react";
import Slide from "@material-ui/core/Slide";
import WhiteBar from "../../component/superAdmin/GameNavBar.jsx";
import "../../style/superAdmin/games_style.scss";

//! not in use
class SuspendedGames extends Component {
  constructor() {
    super();
    this.state = {
      hi: "",
      searchVal: "",
      displaySearch: false,
    };
  }

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
      <div>
        <div>
          <WhiteBar active="suspended" />
        </div>
        <div id="wholepage">
          <div id="searchbar">
            <h5 className="title">משחקים מושהים</h5>
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
                  className="searchInp"
                  value={this.state.searchVal}
                  placeholder="חיפוש"
                  onChange={this.handleChang}
                />
              </Slide>
              <p className="searchIcon" onClick={this.activateSearch}></p>
            </form>
          </div>
          <div className="grid">
            {images.map((image, i) => {
              return (
                <div key={i} className="imageContainer item3">
                  <img className="gameImg" alt="" src={image.url} />
                  <h2 className="holdGameTitleBackground"></h2>
                  <h1 className="gameTitle">{image.name}</h1>
                  <img
                    className="clockIcon"
                    alt=""
                    src="/icons/ionic-ios-stopwatch.svg"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SuspendedGames;
