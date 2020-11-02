import React, { Component } from "react";
import "../../style/games_style.css";
import optionicon from "../../img/optionicon.svg";
import addicon from "../../img/addicon.svg";
import searchicon from "../../img/search.svg";
import WhiteBar from "../../component/superAdmin/GameNavBar.js";
import { withRouter } from "react-router-dom";


const images = [
  {
    name: "Gorilla",
    url:
      "https://c402277.ssl.cf1.rackcdn.com/photos/18330/images/hero_small/Mountain_Gorilla_Silverback_WW22557.jpg?1576515753",
  },
  {
    name: "Orangutan",
    url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG/1200px-Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG",
  },
  {
    name: "Baboon",
    url:
      "https://upload.wikimedia.org/wikipedia/commons/3/35/Olive_baboon_Ngorongoro.jpg",
  },
];

class Games extends Component {
  constructor() {
    super();
    this.state = { name: "hewwo" };
  }
  onClickAddGame = () => {
    this.props.history.push(this.props.location.pathname + 'Add');
  };
  onClickEditGame = () => {
    this.props.history.push(this.props.location.pathname + 'Edit');
  };
  render() {
    return (
      <>
        <div>
          <WhiteBar active="games"/>
        </div>
        <div id="wholepage">
          <div id="searchbar">
            <h5 className="title">משחקים</h5>
            <img className="searchIcon" src={searchicon} />
          </div>
          <div className="grid">
            <div onClick={this.onClickAddGame}>
              <div className="imageContainer item3">
                <img className="addImg" src={addicon} alt="" />
                <h2 className="gameTitleBackground"></h2>
                <h1 className="gameTitle">הוסף משחק</h1>
              </div>
            </div>
            {images.map((image) => {
              return (
                <div onClick={this.onClickEditGame}>
                  <div className="imageContainer item3">
                    <img className="optionIcon" alt="" src={optionicon} />
                    <img className="gameImg" alt="" src={image.url} />
                    <h2 className="gameTitleBackground"></h2>
                    <h1 className="gameTitle">{image.name}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* </div> */}
      </>
    );
  }
}

export default withRouter(Games);
