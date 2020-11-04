import React, { Component } from "react";
import "../../style/superAdmin/pop_up_style.css";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


class GamePopUpMenu extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="popUp">
        <div className="optionRow">
            <EditIcon style={{height: "3.5vh", width: "4vh", marginRight: "0.5vw"}}/>
          <h1 className="popUpOpt">ערוך</h1>
        </div>
        <hr className="divider"/>
        <div className="optionRow">
        <DeleteIcon style={{height: "4vh", width: "4vh", marginRight: "0.5vw"}}/>
          <h1 className="popUpOpt">מחק</h1>
        </div>
        <hr className="divider"/>
        <div className="optionRow">
        <img src='/icons/ionic-ios-stopwatch.svg' className="popUpIcon"/>
          <h1 className="popUpOpt">השהה</h1>
        </div>
      </div>
    );
  }
}

export default GamePopUpMenu;
