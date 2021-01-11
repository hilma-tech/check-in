import React, { Component } from "react";
import menu from "../../img/menuWhite.svg";
import "../../style/teacher/small_menu_bar.css";
import BlueSideBar from "./BlueSideBar";

class SmallMenuBar extends Component {
  constructor(){
    super()
    this.state = {
      openSideBar: false
    }
  }

  changeSideBarState = () => {
    this.setState((prevState)=>{
      return {openSideBar: !prevState.openSideBar}
    })
  }
  render() {
    return (
      <>
        <BlueSideBar openSideBar={this.state.openSideBar} closeSideBar={this.changeSideBarState} />
        <div className="smallMenuBar">
          <img className="smallMenu" src={menu} onClick={this.changeSideBarState}/>
          <img className="smallLogo" src="/icons/CheckIn.svg"/>
        </div>
      </>
    );
  }
}

export default SmallMenuBar;
