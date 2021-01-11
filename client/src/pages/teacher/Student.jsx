import React, { Component } from "react";
import ArrowBar from "../../component/teacher/ArrowBar.jsx";
import BlueSideBar from "../../component/teacher/BlueSideBar.jsx";
import PageTitle from "../../component/teacher/PageTitle.jsx";
import SmallMenuBar from "../../component/teacher/SmallMenuBar.jsx";
import SmallNavBar from "../../component/teacher/SmallNavBar.jsx";
import "../../style/teacher/students.css";

class Students extends Component {
  constructor() {
    super();
    this.students = [
      "גלעד כהן",
      "יונה אהרון",
      "נוה לוי",
      "נטע שלם",
      "יונה אהרון",
    ];
  }

  moveToStudent = (props) => {
    sessionStorage.setItem("currStudent", props.target.id);
    this.props.history.push(this.props.location.pathname + "/studentInfo");
  };

  render() {
    return (
      <>
          <div className="smallPage">
            <SmallMenuBar />
            <PageTitle title="כיתה א'2" />
            <SmallNavBar active="students" />
            <ArrowBar page="students" />
            <div className="smallAlign"  id='smallAlignStudentList'>
              {this.students.map((studentName, index) => {
                return (
                  <div
                    className="smallStudentCont"
                    onClick={this.moveToStudent}
                  >
                    <h1 className="smallStudentName" id={index}>
                      {studentName}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
      </>
    );
  }
}

export default Students;
