import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../style/teacher/small_nav_bar.css";

class SmallNavBar extends Component {
  constructor(props) {
    super();
    this.state = {
      active: props.active,
    };
  }

  movePageFunc = (props) => {
    let newPath = this.props.match.url.split('/')
    if (props.target.id === "games") {
      newPath[newPath.length - 1] = "games"
    } else if (props.target.id === "students") {
      newPath[newPath.length - 1] = "students"
    } else {
      newPath[newPath.length - 1] = "permissions"
    }
    this.props.history.push(newPath.join('/'));
  };

  determineUnderline = () => {
    if (window.location.pathname === "/teacher/classes/a'3/games") {
      return "smallRightUnderline";
    } else if (window.location.pathname === "/teacher/classes/a'3/students") {
      return "smallMiddleUnderline";
    } else if (window.location.pathname === "/teacher/classes/a'3/permissions") {
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
              onClick={this.state.active === "students" ? null : this.movePageFunc}
              className="smallNavName"
              id="students"
            >
              תלמידים
            </h2>
            <h2
              onClick={this.state.active === "permissions" ? null : this.movePageFunc}
              className="smallNavName"
              id="permissions"
            >
              הרשאות
            </h2>
          </div>
          <hr className={this.determineUnderline()} />
        </div>
      </>
    );
  }
}
export default withRouter(SmallNavBar) ;
