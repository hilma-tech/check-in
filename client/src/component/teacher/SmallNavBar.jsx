import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../style/teacher/small_nav_bar.css";

//component for mobile
//to allow easy switching between pages in a specific class
class SmallNavBar extends Component {
  constructor(props) {
    super();
    this.state = {
      active: props.active,
    };
  }

  //handles navigation through pages with the navbar
  movePageFunc = (props) => {
    let newPath = this.props.match.url.split("/");
    if (props.target.id === "games") {
      newPath[newPath.length - 1] = "games";
    } else if (props.target.id === "students") {
      newPath[newPath.length - 1] = "students";
    } else {
      newPath[newPath.length - 1] = "permissions";
    }
    this.props.history.push(newPath.join("/"));
  };

  //determines the css depending on the current location
  determineUnderline = () => {
    if (window.location.pathname === "/teacher/classes/games") {
      return "smallRightUnderline";
    } else if (window.location.pathname === "/teacher/classes/students") {
      return "smallMiddleUnderline";
    } else if (window.location.pathname === "/teacher/classes/permissions") {
      return "smallLeftUnderline";
    } else {
      return "smallRightUnderline";
    }
  };

  render() {
    return (
      <>
        <div className="smallBackground">
          <div className="smallNav">
            <h2
              onClick={this.state.active === "games" ? null : this.movePageFunc}
              className="smallNavName"
              id="games"
            >
              משחקים
            </h2>
            <h2
              onClick={
                this.state.active === "students" ? null : this.movePageFunc
              }
              className="smallNavName"
              id="students"
            >
              תלמידים
            </h2>
            {/* <h2
              onClick={this.state.active === "permissions" ? null : this.movePageFunc}
              className="smallNavName"
              id="permissions"
            >
              הרשאות
            </h2> */}
          </div>
          <p className={this.determineUnderline()}></p>
        </div>
      </>
    );
  }
}
export default withRouter(SmallNavBar);
