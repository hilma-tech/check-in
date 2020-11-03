import React, { Component } from "react";
import "../../style/superAdmin/white_bar_style.css";
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
      case "/gamesEdit": return ("עריכת משחק");
      case "/teachersEdit": return ("עריכת מורה");
      case "/studentsEdit": return ("עריכת תלמיד");
      case "/gamesAdd" : return ("הוספת משחק");
      case "/teachersAdd" : return ("הוספת מורה");
      case "/studentsAdd" : return ("הוספת תלמיד");
      case "/schoolsAdd" : return ("הוספת בית ספר");
    }
  }

  backToGames = () => {
    if (this.props.location.pathname) {
      this.props.history.goBack()
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
