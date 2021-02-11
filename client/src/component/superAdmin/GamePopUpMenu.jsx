import React, { Component, useState } from "react";
import "../../style/superAdmin/pop_up_style.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { errorMsgContext } from "../../stores/error.store";
import PopUpError from "../popUpError";

//component that gives options for actions to perform on a game
class GamePopUpMenu extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="popUp">
        <div
          className="optionRow"
          onClick={() => {
            this.props.onClickEditGame(this.props.gameId);
          }}
        >
          <EditIcon
            style={{
              height: "1.5vw",
              width: "1.5vw",
              marginRight: "0.5vw",
              marginTop: "0.3vw",
              color: "#043163",
            }}
          />
          <h1 className="popUpOpt">הצגה</h1>
        </div>
        {/* <div className="optionRow" onClick={()=>{this.props.onClickEditGame(this.props.gameId)}}>
            <EditIcon style={{height: "1.5vw", width: "1.5vw", marginRight: "0.5vw", marginTop:'0.3vw', color:'#043163'}}/>
          <h1 className="popUpOpt">ערוך</h1>
        </div> */}
        <hr className="divider" />
        <div
          className="optionRow"
          onClick={() => this.props.onClickDeleteGame()}
        >
          <DeleteIcon
            style={{
              height: "1.5vw",
              width: "1.5vw",
              marginRight: "0.5vw",
              marginTop: "0.3vw",
              color: "#043163",
            }}
          />
          <h1 className="popUpOpt">מחק</h1>
        </div>
        <PopUpError
          question={true}
          OnApprove={() => {
            this.props.OnApprove(this.props.gameId);
          }}
        />
        {/* <hr className="divider"/>
        <div className="optionRow">
        <img src='/icons/ionic-ios-stopwatch.svg' className="popUpIcon"/>
          <h1 className="popUpOpt">השהה</h1>
        </div>  */}
      </div>
    );
  }
}

export default GamePopUpMenu;
