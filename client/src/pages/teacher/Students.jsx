import { withContext } from "@hilma/tools";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArrowBar from "../../component/teacher/ArrowBar.jsx";
import PageTitle from "../../component/teacher/PageTitle.jsx";
import SmallMenuBar from "../../component/teacher/SmallMenuBar.jsx";
import SmallNavBar from "../../component/teacher/SmallNavBar.jsx";
import "../../style/teacher/students.css";
import { observer } from "mobx-react";
import { chosenClassContext } from "../../stores/chosenClass.store";

class Students extends Component {
  constructor() {
    super();
    this.students = [];
  }

  componentDidMount = () => {
    this.props.chosenClass.callStudents(this.props.chosenClass.classId);
  };

  moveToStudent = async (index) => {
    await this.props.chosenClass.setCurrStudent(index);
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
          <div className="smallAlign" id="smallAlignStudentList">
            {this.props.chosenClass.students.map((student, index) => {
              return (
                <div
                key={index}
                  className="smallStudentCont"
                  id={index}
                  onClick={() => {
                    this.moveToStudent(index);
                  }}
                >
                  <h1 className="smallStudentName">
                    {student.first_name + " " + student.last_name}
                  </h1>
                  <h1 className="smallStudentName justForWeb" id={index}>
                    שם משתמש: {student.username}
                  </h1>
                  <h1 className="smallStudentName justForWeb" id={index}>
                    סיסמא: {student.id}
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

export default withContext(mapContextToProps)(withRouter(observer(Students)));
