import React, { Component } from "react";
import "../../style/superAdmin/white_bar_style.css";
import { withRouter } from "react-router-dom";

class ArrowNavBar extends Component {
  constructor(props) {
    super();
    this.state = {
      hi: "",
    };
  }

  findPageName = () => {
    switch (this.props.location.pathname) {
      case "/superAdmin/schoolsEdit":
        return "עריכת בית ספר";
      case "/superAdmin/gamesEdit":
        return "הצגת משחק";
      case "/superAdmin/teachersEdit":
        return "עריכת מורה";
      case "/superAdmin/studentsEdit":
        return "עריכת תלמיד";
      case "/superAdmin/gamesAdd":
        return "הוספת משחק";
      case "/superAdmin/teachersAdd":
        return "הוספת מורה";
      case "/superAdmin/studentsAdd":
        return "הוספת תלמיד";
      case "/superAdmin/schoolsAdd":
        return "הוספת בית ספר";
      default:
        return;
    }
  };

  //goes back to last page
  backToGames = () => {
    if (this.props.location.pathname) {
      this.props.history.goBack();
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
