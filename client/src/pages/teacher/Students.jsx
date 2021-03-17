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


class Students extends Component {
  constructor() {
    super();
    this.students = [];
    this.state = {
      searchVal: '',
      searched: false
    }
  }

  componentDidMount = () => {
    if (this.props.chosenClass.classId === 0) {
      this.props.history.push("/teacher/classes");
      return;
    }
    this.props.chosenClass.callStudents(this.props.chosenClass.classId);
  };

  // allows to move to student details page
  moveToStudent = async (id) => {
  await this.props.chosenClass.setCurrStudentClasses(id);
    this.props.history.push(this.props.location.pathname + "/studentInfo");
  };

  handleChange = async (e) => {
    await this.setState({ searchVal: e.target.value, searched: false });
    this.searchStudents()
  };

  searchStudents = async () => {
    this.props.chosenClass.searchStudentsReplace()
    this.setState({ searched: true })
    await this.props.chosenClass.searchStudentsInClass(this.state.searchVal, this.props.chosenClass.classId)
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
                  border: "none",
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

            {this.state.searched && this.state.searchVal ?
              <div>
                {this.props.chosenClass.searchedStudents.length === 0 && this.state.searched ?
                  (<p> אין תלמידים בשם זה בכיתה זו</p>) :
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
                    display: this.props.chosenClass.haveMoreStudents &&  !this.state.searched
                      ? "inline-block"
                      : "none",
                  }}
                >
                  הצג עוד
                </button>
              )}
              <div style={{paddingBottom:'2vh'}}></div>
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
