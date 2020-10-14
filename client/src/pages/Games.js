import React, { Component } from "react";
import "../style/GamesStyle.css";
import optionicon from "../img/optionicon.svg";
import addicon from "../img/addicon.svg";
import searchicon from "../img/search.svg";
import WhiteBar from "../pages/WhiteNavBar.js";
import Menu from "../component/Menu.js";

const images = [
  {
    name: "Gorillaman",
    url:
      "https://c402277.ssl.cf1.rackcdn.com/photos/18330/images/hero_small/Mountain_Gorilla_Silverback_WW22557.jpg?1576515753",
  },
  { name: "Orangutan", url: "" },
  { name: "Baboon", url: "" },
];

class Games extends Component {
  constructor() {
    super();
    this.state = { name: "hewwo" };
  }

  render() {
    return (
      <>
        <div>
          <Menu />
        </div>
        <div>
          <WhiteBar />
        </div>
        <div id="wholepage">
          <div id="searchbar">
            <h5 className="title">משחקים</h5>
            <img className="searchIcon" src={searchicon} />
          </div>
          <div className="grid">
            {/* <h6 className="search">search</h6> */}
            <div className="imageContainer item3">
              <img className="addImg" src={addicon} alt="" />
              <h2></h2>
              <h1>הוסף משחק</h1>
            </div>
            <div className="imageContainer item3">
              <img className="optionIcon" alt="" src={optionicon} />
              <img className="gameImg" alt="" src={images[0].url} />
              <h2></h2>
              <h1>{images[0].name}</h1>
            </div>
            <div className="imageContainer item3">
              <img className="optionIcon" alt="" src={optionicon} />
              <img className="gameImg" alt="" src={images[0].url} />
              <h2></h2>
              <h1>{images[0].name}</h1>
            </div>
            <div className="imageContainer item3">
              <img className="optionIcon" alt="" src={optionicon} />
              <img className="gameImg" alt="" src={images[0].url} />
              <h2></h2>
              <h1>{images[0].name}</h1>
            </div>
            <div className="imageContainer item3">
              <img className="optionIcon" alt="" src={optionicon} />
              <img className="gameImg" alt="" src={images[0].url} />
              <h2></h2>
              <h1>{images[0].name}</h1>
            </div>
          </div>
        </div>
        {/* </div> */}
      </>
    );
  }
}

export default Games;
