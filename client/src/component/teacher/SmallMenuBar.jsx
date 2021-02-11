import React, { Component } from "react";
import menu from "../../img/menuWhite.svg";
import "../../style/teacher/small_menu_bar.scss";
import BlueSideBar from "./BlueSideBar";

//on mobile - allows to open popup menu and shows logo
class SmallMenuBar extends Component {
  constructor() {
    super();
    this.state = {
      openSideBar: false,
    };
  }

  //opens this component depending on the state
  changeSideBarState = () => {
    this.setState((prevState) => {
      return { openSideBar: !prevState.openSideBar };
    });
  };
  render() {
    return (
      <>
        <BlueSideBar
          openSideBar={this.state.openSideBar}
          closeSideBar={this.changeSideBarState}
        />
        <div className="smallMenuBar">
          <img
            className="smallMenu"
            src={menu}
            alt="menuIcon"
            onClick={this.changeSideBarState}
          />
          <img className="smallLogo" alt="checkin" src="/icons/CheckIn.svg" />
        </div>
      </>
    );
  }
}

export default SmallMenuBar;
