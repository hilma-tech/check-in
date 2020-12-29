import { Component } from "react";
import React from "react";
import echidnaloo from "../../img/addicon.svg";
import "../../style/teacher/add_game_style.scss"

class AddGame extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
      <div className="mobileBackground">
        <div className="mobileGameContainer">
          <img
            className="classGameImg"
            alt=""
            src={echidnaloo}
            //   src={this.props.image}
          />
          <h2 className="mobileClassGameTitleBackground"></h2>
          <h1 className="mobileClassGameTitle">אני כותרת</h1>
        </div>
        <h3 className="mobileGameDesc">תיאור המשחק</h3>
        <h3 className="mobileGameReq">דרישות המשחק</h3>
        <h1 className="mobileGameField">שדות</h1>
        <h2 className="mobileFieldName" >שם השדה</h2>
        <input value="ערך ניתן לשינוי" className="mobileChangingInput"/>
        <div className="mobileSaveButtonBackground">
          <button
            className="mobileSaveButton"
            // onClick={this.saveData}
          >
            שמור
          </button>
        </div>
        </div>
      </>
    );
  }
}

export default AddGame;
