import React, { Component } from "react";
import "../../style/superAdmin/pop_up_style.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PopUpError from "../popUpError";

//component that gives options for actions to perform on a game
class GamePopUpMenu extends Component {
  render() {
    return (
      <div className="popUp">
        <div className="listItems">
          <div className="optionRow"
            onClick={() => {
              this.props.onClickEditGame(this.props.gameId);
            }}
          >
            <EditIcon
              style={{
                height: "1vw",
                width: "1vw",
                marginRight: "0.5vw",
                marginTop: "0.3vw",
                color: "#043163",
              }}
            />
            <h1 className="popUpOpt">ערוך</h1>
          </div>
          <hr className="divider" />
          <div
            className="optionRow"
            onClick={() => this.props.onClickDeleteGame(this.props.gameId)}
          >
            <DeleteIcon
              style={{
                height: "1vw",
                width: "1vw",
                marginRight: "0.5vw",
                marginTop: "0.3vw",
                color: "#043163",
              }}
            />
            <h1 className="popUpOpt">מחק</h1>
          </div>
          {/* <hr className="divider" />

          <div className="optionRow" onClick={() => { this.props.onClickEditGame(this.props.gameId) }}>
            <EditIcon style={{ height: "1vw", width: "1vw", marginRight: "0.5vw", marginTop: '0.3vw', color: '#043163' }} />
            <h1 className="popUpOpt">ערוך</h1>
          </div> */}

        </div>
        <PopUpError />
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
