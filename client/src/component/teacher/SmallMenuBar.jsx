import React, { Component } from 'react'
import menu from "../../img/menuWhite.svg";
import "../../style/teacher/small_menu_bar.css"

class SmallMenuBar extends Component {
    constructor() {
        super()
    }
    render() {
        return(<div className="smallMenuBar">
        <img className="smallMenu" src={menu} />
        <img className="smallLogo" src="/icons/CheckIn.svg" />
      </div>)
    }
}

export default SmallMenuBar