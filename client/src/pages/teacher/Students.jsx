import { withContext } from "@hilma/tools";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArrowBar from "../../component/teacher/ArrowBar.jsx";
import PageTitle from "../../component/teacher/PageTitle.jsx";
import SmallMenuBar from "../../component/teacher/SmallMenuBar.jsx";
import SmallNavBar from "../../component/teacher/SmallNavBar.jsx";
import "../../style/teacher/students.scss";
import { observer } from "mobx-react";
import { chosenClassContext } from "../../stores/chosenClass.store";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from '@material-ui/icons/Search';
import { LogoutContext } from "@hilma/auth";
import { GetInfoErrorMsg, HideStyle, ShowStyle, TeacherDeletedMsg } from "../../tools/GlobalVarbs.js";
import { userNameContext } from "../../stores/userName.store.js";
import { errorMsgContext } from "../../stores/error.store.js";

class Students extends Component {
  constructor() {
    super();
    this.students = [];
    this.state = {
      searchVal: '',
      searched: false
    }
  }

  componentDidMount = async () => {
    if (this.props.chosenClass.classId === 0) {
      if(this.props.location.state === undefined){
        this.props.history.push("/teacher/classes");
        return;
      }
      
      await this.props.name.getTeacherInfo();
      if (!this.props.name.successGettingClasses) {
        if (this.props.name.needToLogOut) {
          this.props.errorMsg.setErrorMsg(
            TeacherDeletedMsg
          );
          await this.props.logout();
        } else {
          this.props.errorMsg.setErrorMsg(
            GetInfoErrorMsg
          );
        }
      }

      let className = await this.props.name.getClassById(this.props.location.state.data)
      if(className.length === 0){
        this.props.history.push("/teacher/classes");
        return;
      }
      this.props.chosenClass.setClassId(this.props.location.state.data, className);
    }
    this.props.chosenClass.callStudents(this.props.chosenClass.classId);
    if(this.props.chosenClass.needToLogOut){
      this.props.errorMsg.setErrorMsg(
        TeacherDeletedMsg
      );
      await this.props.logout();
    }
  };

  // allows to move to student details page
  moveToStudent = async (id) => {
    await this.props.chosenClass.setCurrStudentClasses(id);
    this.props.history.push({
      pathname: this.props.location.pathname + "/studentInfo",
      state: { data: this.props.chosenClass.classId }
    });
  };

  handleChange = async (e) => {
    let value = e.target.value
    await this.setState({ searchVal: value, searching: true });
    setTimeout(async () => {
      this.searchStudents()
    }, 1000)
  };

  searchStudents = async () => {
    this.props.chosenClass.searchStudentsReplace()
    await this.props.chosenClass.searchStudentsInClass(this.state.searchVal, this.props.chosenClass.classId)
    this.setState({ searched: true, searching: false })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleChange(e)
    }
  }
  render() {
    return (
      <>
        <div className="smallPage">
          <SmallMenuBar />
          <PageTitle title={"כיתה " + this.props.chosenClass.classroomName} />
          <SmallNavBar active="students" />
          <ArrowBar page="students" />
          <div
            className="smallAlign"
            id="smallAlignStudentList"
            style={{ textAlign: "center" }}
          >

            <div className="searchBar">
              <div className="marginOnSearchIcon">
                <SearchIcon style={{ color: '#043163' }} />
              </div>
              <input
                style={{
                  border: HideStyle,
                  backgroundColor: 'rgba(188, 188, 203, 0)',
                  fontWeight: '400',
                  width: '80%',
                  fontFamily: 'Assistant',
                }}
                className="searchInput"
                placeholder="חיפוש"
                onChange={this.handleChange}
                value={this.state.searchVal}
                type="text"
                onKeyDown={this.handleKeyDown}
              />
            </div>
            {this.state.searching ?
              <CircularProgress size="1.5rem" />
              : <div>
                {this.state.searched && this.state.searchVal ?
                  <div>
                    {this.props.chosenClass.searchedStudents.length === 0 && this.state.searched ?
                      (<p> אין תלמידים שמתאימים לחיפושך בכיתה זו</p>) :
                      (<div>
                        {this.props.chosenClass.searchedStudents.map((student, index) => {
                          return (
                            <div
                              key={student.Student_id}
                              className="smallStudentCont"
                              id={index}
                              onClick={() => {
                                this.moveToStudent(student.Student_id);
                              }}>
                              <h1 className="smallStudentName">
                                {student.Student_first_name + " " + student.Student_last_name}
                              </h1>
                              <h1 className="smallStudentName justForWeb" id={index}>
                                שם משתמש: {student.Student_username}
                              </h1>
                            </div>)
                        })
                        }
                      </div>)
                    }
                  </div>
                  :
                  (<div>
                    {this.props.chosenClass.students.length === 0 && !this.props.chosenClass.startGetInfo ? (
                      <p>אין תלמידים לכיתה זו</p>
                    ) : (
                        this.props.chosenClass.students.map((student, index) => {
                          return (
                            <div
                              key={student.id}
                              className="smallStudentCont"
                              id={index}
                              onClick={() => {
                                this.moveToStudent(student.id);
                              }}
                            >
                              <h1 className="smallStudentName">
                                {student.first_name + " " + student.last_name}
                              </h1>
                              <h1 className="smallStudentName justForWeb" id={index}>
                                שם משתמש: {student.username}
                              </h1>
                            </div>
                          );
                        })
                      )}
                  </div>)

                }
              </div>
            }
            {this.props.chosenClass.startGetInfo ? (
              <CircularProgress size="1.5rem" />
            ) : (
                <button
                  className="showMoreGamesB"
                  onClick={() => {
                    this.props.chosenClass.callStudents(
                      this.props.chosenClass.classId
                    );
                  }}
                  style={{
                    marginTop: "2vh",
                    display: this.props.chosenClass.haveMoreStudents && !this.state.searched && !this.state.searching
                      ? ShowStyle
                      : HideStyle,
                  }}
                >
                  הצג עוד
                </button>
              )}
            <div style={{ paddingBottom: '2vh' }}></div>
          </div>
        </div>
      </>
    );
  }
}
const mapContextToProps = {
  logout: LogoutContext,
  chosenClass: chosenClassContext,
  name: userNameContext,
  errorMsg: errorMsgContext
};

export default withContext(mapContextToProps)(withRouter(observer(Students)));
