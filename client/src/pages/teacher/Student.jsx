import React, { Component } from "react";
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
  console.log(props.target.id)
  sessionStorage.setItem("currStudent", props.target.id);
  this.props.history.push(this.props.location.pathname + '/studentInfo');
}

  render() {
    return (
      <>
        <div className="smallBackground">
          <div className= "smallPage">
            <SmallMenuBar />
            <PageTitle title="כיתה א'2"/>
            <SmallNavBar active="students" />
            <img
              className="smallBackArrow"
              src="/icons/awesome-arrow-right.svg"
            />
            <br />
            {/* search bar */}
            <div className="smallAlign">
              <h4 className="linkToTeachers">לרשימת המורים של כיתה זו</h4>
              {this.students.map((studentName, index) => {
                return (
                  <div className="smallStudentCont"  onClick={this.moveToStudent} >
                    <h1 className="smallStudentName" id={index}>{studentName}</h1>
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
