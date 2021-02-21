import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PageTitle from "../../component/teacher/PageTitle";
import SmallMenuBar from "../../component/teacher/SmallMenuBar";
import "../../style/teacher/student_details_style.css";
import { chosenClassContext } from "../../stores/chosenClass.store";
import ArrowBar from "../../component/teacher/ArrowBar";
import EditIcon from '@material-ui/icons/Edit';

class StudentDetails extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      userName: "",
      classrooms: [],
      newPass: ""
    };
  }


  componentDidMount() {
    if (this.props.chosenClass.classId === 0) {
      this.props.history.push("/teacher/classes");
    } else {
      let studentInfo = this.props.chosenClass.getCurrStudent();
      let classrooms = this.props.chosenClass.studentClassrooms;
      this.setState({
        name: studentInfo.first_name + " " + studentInfo.last_name,
        userName: studentInfo.username,
        classrooms: classrooms,
      });
    }
  }

  render() {
    const updatePass = () => {
      this.setState({ newPass: 'sa' })
      // console.log('changed!');
    }

    return (
      <>
        <div className="smallPage">
          <SmallMenuBar />
          <PageTitle
            title="תלמידים"
            titleTwo={"כיתה " + this.props.chosenClass.classroomName}
          />
          <ArrowBar
            page="studentInfo"
            chosenClass={this.props.chosenClass.classroomName}
          />
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
          <div className="inputBoxes">

            <div className="studentDeets edit">
              <h1 className="detail">{this.state.userName}</h1>
            </div>
            <div className="studentDeets">
              <input
                style={{
                  border: "none",
                  backgroundColor: 'rgba(188, 188, 203, 0)',
                  fontWeight:'600',
                  width: '87%',
                  // marginTop: '1vh',
                  fontFamily: 'Assistant'
                }}
                className="passInput"
                onBlur={updatePass}
                defaultValue={'שינוי סיסמת תלמיד'}
                type="text"
              />
              {/* <EditIcon
                style={{
                  height: "2vw",
                  width: "2vw",
                  position: 'relative',
                  marginRight: "54vw",
                  // marginTop: "-25vw",
                  color: "#043163",
                }} /> */}

            </div>
            <div className="studentDeets">
              <h1 className="detail">
                {this.state.classrooms.length === 0 ? (
                  <p style={{ display: "inline-block", margin: "0" }}>
                    לתלמיד/ה זה/זו אין עוד כיתות
                  </p>
                ) : (
                    this.state.classrooms.map((classroom, ind) => {
                      return (
                        <p style={{ display: "inline-block", margin: "0" }}>
                          {classroom.name}
                          {ind < this.state.classrooms.length - 1
                            ? "\u00A0"
                            : ""}{" "}
                        </p>
                      );
                    })
                  )}
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapContextToProps = {
  chosenClass: chosenClassContext,
};

export default withContext(mapContextToProps)(
  withRouter(observer(StudentDetails))
);
