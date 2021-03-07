import React from "react";
import { withRouter } from "react-router-dom";
import "../../style/teacher/arrow_bar_style.scss";

class ArrowBar extends React.Component {
  constructor() {
    super();
    this.pages = {
      games: "משחקים",
      editGame: "הוספת משחק",
      showGame: "הצגת משחק",
      students: "תלמידים",
      permission: "הרשאות",
      studentInfo: "כרטיס תלמיד",
    };
  }

  //moves user to classes page
  moveToClasses = () => {
    this.props.history.push("/teacher/classes");
  };

  //moves user to games page
  backToGames = () => {
    this.props.history.push("/teacher/classes/games");
  };

  render() {
    if (this.props.page === "games") {
      return (
        <div className="gamesArrowBar">
          <img
            alt="small back arrow"
            className="smallBackArrow"
            src="/icons/awesome-arrow-right.svg"
            onClick={this.moveToClasses}
          />
          <p className="pageNameArrowBar">{this.pages[this.props.page]}</p>
          <p className="gamesArrowBarText">
            בחר/י משחק כדי לערוך אותו,
            <br />
            על מנת להוסיף משחק חדש לכיתה זו לחץ/י על סמל הפלוס
          </p>
        </div>
      );
    } else if (this.props.page === "students") {
      return (
        <div className="studentsArrowBar">
          <img
            alt="small back arrow"
            className="smallBackArrow"
            src="/icons/awesome-arrow-right.svg"
            onClick={this.moveToClasses}
          />
          <p className="pageNameArrowBar">{this.pages[this.props.page]}</p>

          {/* <br /> */}
          {/* <br /> */}
          {/* search bar */}
          {/* <h4 className="linkToTeachers">לרשימת המורים של כיתה זו</h4> */}
        </div>
      );
    } else if (this.props.page === "editGame" || this.props.page === "showGame") {
      return (
        <div className="studentsInfoArrowBar editGameMobile">
          <img
            alt="small back arrow"
            className="smallBackArrow"
            src="/icons/awesome-arrow-right.svg"
            onClick={this.backToGames}
          />
          <p className="pageNameArrowBarStudentInfo">
            {this.pages[this.props.page]}
          </p>
        </div>
      );
    } else if (this.props.page === "studentInfo") {
      return (
        <div className="studentsInfoArrowBar">
          <img
            alt="small back arrow"
            className="smallBackArrow"
            src="/icons/awesome-arrow-right.svg"
            onClick={this.props.history.goBack}
          />
          <p className="pageNameArrowBarStudentInfo">
            {this.pages[this.props.page]}
          </p>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default withRouter(ArrowBar);
