import React, { Component } from "react";
import "../style/GamesStyle.css";
import iconf from "../img/iconf.svg";

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
  }

  render() {
    return (
      <>
        <h5 className="title">משחקים</h5>
        <div className="gridContainer">
          <div className="grid">
            <div className="imageContainer item3">
              <img className="optionIcon" src={iconf} />
              <img className="gameImg" src={images[0].url} />
              <h2></h2>
              <h1>{images[0].name}</h1>
            </div>
            <div className="imageContainer item3">
              <img className="optionIcon" src={iconf} />
              <img className="gameImg" src={images[0].url} />
              <h2></h2>
              <h1>{images[0].name}</h1>
            </div>
            <div className="imageContainer item3">
              <img className="optionIcon" src={iconf} />
              <img className="gameImg" src={images[0].url} />
              <h2></h2>
              <h1>{images[0].name}</h1>
            </div>
            <div className="imageContainer item3">
              <img className="optionIcon" src={iconf} />
              <img className="gameImg" src={images[0].url} />
              <h2></h2>
              <h1>{images[0].name}</h1>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Games;
