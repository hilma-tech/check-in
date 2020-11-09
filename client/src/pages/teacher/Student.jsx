import React, { Component } from "react";
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
  render() {
    return (
      <>
        <div className="smallBackground">
          <div className= "smallPage">
            <SmallMenuBar />
            <SmallNavBar active="students" />
            <img
              className="smallBackArrow"
              src="/icons/awesome-arrow-right.svg"
            />
            <br />
            {/* search bar */}
            <div className="smallAlign">
              <h4 className="linkToTeachers">לרשימת המורים של כיתה זו</h4>
              {this.students.map((studentName) => {
                return (
                  <div className="smallStudentCont">
                    <h1 className="smallStudentName">{studentName}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Students;
