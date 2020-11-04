import React, { Component } from "react";
import "../../style/teacher/small_nav_bar.css";

class SmallNavBar extends Component {
  constructor() {
    super();
  }

  determineUnderline = () => {
      if (window.location.pathname === "/teachers/games") {
          return "smallRightUnderline"
      } else if (window.location.pathname === "/teachers/students") {
          return "smallMiddleUnderline"
      } else {
          return "smallLeftUnderline"
      }
  }

  render() {
    return (
      <>
        <div className="smallBackground">
          <div className="smallNav">
            <h2 className="smallNavName">משחקים</h2>
            <h2 className="smallNavName">תלמידים</h2>
            <h2 className="smallNavName">הרשאות</h2>
          </div>
            <hr className={this.determineUnderline()}/>
        </div>
      </>
    );
  }
}
export default SmallNavBar;
