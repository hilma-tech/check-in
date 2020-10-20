import React, { Component } from "react";
import "../style/WhiteBarStyle.css";
import { withRouter } from "react-router-dom";

class ArrowNavBar extends Component {
  constructor(props) {
    super();
    this.state = {
      hi: ""
    }
  }

  findPageName = () => {
    switch(this.props.location.pathname) {
      case "/schoolsEdit": return ("עריכת בית ספר");
      case "/addGame" : return ("הוספת משחק");
  
    }
    this.setState({hi: "1"})
  }

  backToMain = () => {
    if (this.props.location.pathname) {
      this.props.history.push("/games/suspended");
    } else {
      this.props.history.push("/games");
    }
  };

  render() {
    return (
      <>
        <div className="sticky">
          <div className="navbar">
            <span className="goBackToMainPage pageName" onClick={this.backToMain}></span>
            <h1 className="pageName bold editSchoolPageName">
              {this.findPageName()}
            </h1>
          </div>
        </div>
        <div className="spacer"></div>
      </>
    );
  }
}

export default withRouter(ArrowNavBar);
