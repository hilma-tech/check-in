import React from "react";
import { Component } from "react";
import "../../style/teacher/classes.scss";
import SmallMenuBar from "../../component/teacher/SmallMenuBar.jsx";
import PageTitle from "../../component/teacher/PageTitle";
import { withRouter } from "react-router-dom";
import BlueSideBar from "../../component/teacher/BlueSideBar";
import { chosenClassContext } from "../../stores/chosenClass.store";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
const axios = require("axios").default;

class Classes extends Component {
  constructor() {
    super();
    this.colors = [
      "#188749",
      "#f4c90a",
      "#f90258",
      "#8051AB",
      "#0faebd",
      "#fab27f",
      "#160955",
      "#d985b6",
      "#5055ee",
      "#69bda2",
      "#C20865",
      "#68af1c",
      "#ae03e9",
      "#066cbb",
      "#f46615",
      "#9c001b",
      "#411045",
    ];
    this.state = { classes: [] }
  }

  componentDidMount = async () => {
    let teacherClasses = await axios.get("/api/teacher/getTeacherClasses");
    this.setState({ classes: teacherClasses.data })
  };

  moveToClass = (classId, classroomName) => {
    this.props.chosenClass.setClassId(classId, classroomName)
    this.props.history.push("/teacher/classes/games");
  }

  callStudents = async (classnum) => {
    await axios.get("/api/classroom/getClassStudents", {params: {classId: classnum}})
  }
  
  render() {
    this.callStudents(2)
    return (
      <>
        <div className="smallSticky">
          <SmallMenuBar />
        </div>
        <PageTitle className="officialTitle" title="שלום המורה נורית!" />
        <div className="griddler">
          {this.state.classes.map((classObj, index) => {
            return (
              <div
                onClick={() => { this.moveToClass(classObj.id, classObj.name) }}
                className="circleCont"
                style={{ borderColor: this.colors[index] }}
              >
                <h3 className="className" style={{ color: this.colors[index] }}>
                  {classObj.name}
                </h3>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}


const mapContextToProps = {
  chosenClass: chosenClassContext,
};

export default withContext(mapContextToProps)(withRouter(observer(Classes)));
