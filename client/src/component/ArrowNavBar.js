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
      case "/gamesAdd" : return ("הוספת משחק");
      case "/teachersAdd" : return ("הוספת מורה")
    }
  }

  backToGames = () => {
    if (this.props.location.pathname) {
      this.props.history.push("/games");;
    }
  };

  render() {
    return (
      <>
        <div className="sticky">
          <div className="navbar">
            <span className="arrow pageName" onClick={this.backToGames}></span>
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
