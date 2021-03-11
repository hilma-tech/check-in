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
import { studentPasswordValidation } from "../../tools/ValidationFunctions";
import axios from "axios";
import PopUpError from "../../component/popUpError";
import { errorMsgContext } from "../../stores/error.store";

class StudentDetails extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      userName: "",
      classrooms: [],
      showPassChanger: false,
      passDisplay: '',
      newPass: '',
      passErr: ''
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



  updatePass = async () => {
    var passValidation = studentPasswordValidation(this.state.passDisplay)
    this.setState({ passErr: passValidation })
    if (passValidation === '') {
      try {
        await axios.post("/api/student/changestudentpass",
          {
            username: this.state.userName,
            password: this.state.passDisplay
          });
        this.closePassChange(true)
        this.setState({passDisplay:''})
          this.props.errorMsg.setErrorMsg(" הסיסמה שונתה בהצלחה! ");      
      } catch (err) {
        console.log("save pass error: ", err);
      }
    }
  }
  onPassChange = (val) => {
    this.setState({ passDisplay: val.target.value })
  }
  closePassChange = (type) => {
    if (!this.state.passErr) {
      this.setState({
        showPassChanger: !this.state.showPassChanger,
        passErr: ''
      })
    }
  }
  render() {

    return (
      <>
        <div className="smallPage">
          <PopUpError />
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
              <h1 className="detail">
                {this.state.classrooms.length === 0 ? (
                  <p style={{ display: "inline-block", margin: "0" }}>
                    לתלמיד/ה זה/זו אין עוד כיתות
                  </p>
                ) : (
                    this.state.classrooms.map((classroom, ind) => {
                      return (
                        <p style={{ display: "inline-block", margin: "0" }} key={ind}>
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


            <div className="passchange" onClick={() => {
              this.setState({
                showPassChanger: !this.state.showPassChanger,
                passErr: ''
              });
            }} >
              <h2 className="changePasstext" >שינוי סיסמא</h2>
              <div className='editIcon'>
                <EditIcon
                  style={{
                    height: "3vh",
                    width: "3vh",
                    color: "#043163",
                  }} />
              </div>
            </div>
            <div style={{ display: this.state.showPassChanger ? "block" : "none" }}>
              <h4 className='inputError'>{this.state.passErr}</h4>
              <div style={this.state.passErr ? { marginTop: '5vh' } : {}}>
                <div className="studentDeets">
                  <input
                    style={{
                      border: "none",
                      backgroundColor: 'rgba(188, 188, 203, 0)',
                      fontWeight: '600',
                      width: '90%',
                      fontFamily: 'Assistant',
                    }}
                    className="passInput"
                    placeholder="הכנס סיסמא חדשה"
                    onChange={(val) => this.onPassChange(val)}
                    value={this.state.passDisplay}
                    type="text"
                  />
                </div></div>
              <div className='approveOrNot'>
                <div className='passchange' onClick={() => {
                  this.setState({
                    showPassChanger: !this.state.showPassChanger,
                    passErr: ''
                  })
                }}>
                  <h3 style={{ fontWeight: 'lighter', paddingLeft: '3vw', paddingRight: '3vw' }} className='changePasstext'>ביטול</h3>
                </div>
                <div className='passchange savepass' onClick={async () => {
                  await this.updatePass()
                }} >
                  <h3 className='changePasstext' style={{
                    color: 'white', fontSize: '3vh', fontWeight: 'lighter', paddingLeft: '3vw', paddingRight: '3vw'
                  }}>שמור</h3>

                </div>

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapContextToProps = {
  chosenClass: chosenClassContext,
  errorMsg: errorMsgContext
};

export default withContext(mapContextToProps)(
  withRouter(observer(StudentDetails))
);
