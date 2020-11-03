import React, { Component } from "react";
import WhiteBar from "../component/GameNavBar";
import "../style/games_style.css";
import Slide from '@material-ui/core/Slide';

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


class SuspendedGames extends Component {
  constructor() {
    super();
    this.state = {
      hi: "",
      searchVal: '',
      displaySearch: false,
    };
  }

  //Save the user search value as searchVal in state.
  handleChang = (e) => {
    this.setState({ searchVal: e.target.value })
  }

  //When the user press the search icon it's start to show the input text for the searching.
  activateSearch = () => {
    this.setState({ displaySearch: true})
  }
  render() {
    return (
      <div>
        <div>
          <WhiteBar active="suspended" />
        </div>
        <div id="wholepage">
          <div id="searchbar">
            <h5 className="title">משחקים מושהים</h5>
            <form className='search' >
              <Slide direction="right" in={this.state.displaySearch} mountOnEnter unmountOnExit>
                <input type="text" name='search' value={this.state.searchVal} placeholder="חיפוש" onChange={this.handleChang} />
              </Slide>
              <p className='searchIcon' onClick={this.activateSearch}></p>
            </form>
          </div>
          <div className="grid">
            {images.map((image) => {
              return (
                <div className="imageContainer item3">
                  <img className="clockIcon" alt="" src='/icons/ionic-ios-stopwatch.svg' />
                  <img className="gameImg" alt="" src={image.url} />
                  <h2 className="holdGameTitleBackground"></h2>
                  <h1 className="gameTitle">{image.name}</h1>
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
