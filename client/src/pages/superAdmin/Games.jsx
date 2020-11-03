import React, { Component } from "react";
import "../../style/superAdmin/games_style.css";
import optionicon from "../../img/optionicon.svg";
import addicon from "../../img/addicon.svg";
import WhiteBar from "../../component/superAdmin/GameNavBar.jsx";
import { withRouter } from "react-router-dom";
import Slide from '@material-ui/core/Slide';
import PopUp from '../../component/superAdmin/GamePopUpMenu.jsx'
import Fade from "@material-ui/core/Fade";

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
  {
    name: "Giraffe",
    url: "https://www.andrewscamera.com/img/s/v-10/p1348222310-3.jpg"
  }
];

class Games extends Component {
  constructor() {
    super();
    this.state = {
      name: "hewwo",
      searchVal: '',
      displaySearch: false,
      display: false
    };
  }
  onClickAddGame = () => {
    this.props.history.push(this.props.location.pathname + 'Add');
  };
  onClickEditGame = () => {
    //this.props.history.push(this.props.location.pathname + 'Edit');
  };

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
      <>
        <div>
          <WhiteBar active="games" />
        </div>
        <div id="wholepage">
          <div id="searchbar">
            <h5 className="title">משחקים</h5>
            <form className='search' >
              <Slide direction="right" in={this.state.displaySearch} mountOnEnter unmountOnExit>
                <input type="text" name='search' value={this.state.searchVal} placeholder="חיפוש" onChange={this.handleChang} />
              </Slide>
              <p className='searchIcon' onClick={this.activateSearch}></p>
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
            {images.map((image) => {
              return (
                <div onClick={this.onClickEditGame}>
                  <div className="imageContainer item3">
                    {/* <Fade in={false}>
                      <PopUp/> 
                    </Fade> */}
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
