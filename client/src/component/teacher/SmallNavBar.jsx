import React, { Component } from "react";
import "../../style/teacher/small_nav_bar.css";

class SmallNavBar extends Component {
  constructor(props) {
    super();
    this.state = {
      active: props.active,
    };
  }

  movePageFunc = (props) => {
    if (props.target.id === "games") {
      this.props.history.push(this.props.match.url + "/games");
    } else if (props.target.id === "students") {
      this.props.history.push(this.props.match.url + "/students");
    } else {
      this.props.history.push("/teacher/permissions");
    }
  };

  determineUnderline = () => {
    if (window.location.pathname === "/teacher/games") {
      return "smallRightUnderline";
    } else if (window.location.pathname === "/teacher/students") {
      return "smallMiddleUnderline";
    } else {
      return "smallLeftUnderline";
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
export default SmallNavBar;
