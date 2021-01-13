import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
import React, { Component } from "react";
import ArrowBar from "../../component/teacher/ArrowBar.jsx";
import BlueSideBar from "../../component/teacher/BlueSideBar.jsx";
import PageTitle from "../../component/teacher/PageTitle.jsx";
import SmallMenuBar from "../../component/teacher/SmallMenuBar.jsx";
import SmallNavBar from "../../component/teacher/SmallNavBar.jsx";
import { chosenClassContext } from "../../stores/chosenClass.store.js";
import "../../style/teacher/students.css";

class Students extends Component {
  constructor() {
    super();
    this.students = [
      {name: "גלעד כהן", userName: "gilad10",password:"12345678" },
      {name: "יונה אהרון", userName: "gilad10",password:"12345678" },
      {name:  "נוה לוי", userName: "gilad10",password:"12345678" },
      {name: "נטע שלם", userName: "gilad10",password:"12345678" },
      {name: "יונה אהרון", userName: "gilad10",password:"12345678" }, 
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
            <PageTitle title={"כיתה " + this.props.chosenClass.classroomName} />
            <SmallNavBar active="students" />
            <ArrowBar page="students" />
            <div className="smallAlign"  id='smallAlignStudentList'>
              {this.students.map((student, index) => {
                return (
                  <div
                    className="smallStudentCont"
                    onClick={this.moveToStudent}
                  >
                    <h1 className="smallStudentName" id={index}>
                      {student.name}
                    </h1>
                    <h1 className="smallStudentName justForWeb" id={index}>
                      שם משתמש: {student.userName}
                    </h1>
                    <h1 className="smallStudentName justForWeb" id={index}>
                      סיסמא: {student.password}
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

const mapContextToProps = {
  chosenClass: chosenClassContext,
};

export default withContext(mapContextToProps)(observer(Students));
