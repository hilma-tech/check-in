import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PageTitle from "../../component/teacher/PageTitle";
import SmallMenuBar from "../../component/teacher/SmallMenuBar";
import "../../style/teacher/student_details_style.css";
import { chosenClassContext } from "../../stores/chosenClass.store";
import ArrowBar from "../../component/teacher/ArrowBar";

class StudentDetails extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      userName: "",
      classrooms: []
    }
    this.eh = []
  }

  componentDidMount() {
    let studentInfo = this.props.chosenClass.getCurrStudent()
    let classrooms = this.props.chosenClass.studentClassrooms
    this.setState({
      name: studentInfo.first_name + ' ' + studentInfo.last_name,
      userName: studentInfo.username,
      classrooms: classrooms
    })
  }
  
  render() {
    return (
      <>
        <div className="smallPage">
          <SmallMenuBar />
          <PageTitle title="תלמידים" titleTwo={"כיתה " + this.props.chosenClass.classroomName} />
          <ArrowBar page="studentInfo" chosenClass={this.props.chosenClass.classroomName} />
          {/* <PageTitle title="כיתה א'1"/> */}
          {/* <img
            // className="deetBackArrow"
            className= 'smallBackArrow'
            src="/icons/awesome-arrow-right.svg"
            alt="small back arrow"
          />
          <h3 className="smallArrowTitle">כרטיס תלמיד</h3>
          <br /> */}
          <div className="studentDeets top">
            <h1 className="detail">{this.state.name}</h1>
          </div>
          <div className="studentDeets">
            <h1 className="detail">{this.state.userName}</h1>
          </div>
          <div className="studentDeets">
            <h1 className="detail">1234</h1>
          </div>
          <div className="studentDeets">
            <h1 className="detail">{this.state.classrooms.map((classroom) => {
              return <p style={{display:'inline-block', margin: '0'}}>{classroom.name} </p>
            })}</h1>
          </div>
        </div>
      </>
    );
  }
}
const mapContextToProps = {
  chosenClass: chosenClassContext,
};

export default withContext(mapContextToProps)(withRouter(observer(StudentDetails)));

