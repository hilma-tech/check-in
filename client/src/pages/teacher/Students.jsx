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
import OutsideClickHandler from "react-outside-click-handler";


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
  moveToStudent = async (index) => {
    console.log('index: ', index);
    await this.props.chosenClass.setCurrStudentClasses(index);
    this.props.history.push(this.props.location.pathname + "/studentInfo");
  };

  handleChange = (e) => {
    this.setState({ searchVal: e.target.value, searched: false });
  };
  closeSearch = () => {
    this.setState({ searchable: false, searchVal: '', searched: false })
  }
  searchStudents = async () => {
    this.props.chosenClass.searchStudentsReplace()
    this.setState({ searched: true })
    await this.props.chosenClass.searchStudentsInClass(this.state.searchVal, this.props.chosenClass.classId)
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
                <SearchIcon
                  style={this.state.searchVal ? { color: '#043163' } : { color: 'gray' }}
                  onClick={this.state.searchVal ? this.searchStudents : () => { }} />
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
              />
            </div>

            {this.state.searched && this.state.searchVal ?
              <div>
                {this.props.chosenClass.searchedStudents.length === 0 && this.state.searched ?
                 ( <p> אין תלמידים בשם זה בכיתה זו</p> ):
                  (<div>
                    {this.props.chosenClass.searchedStudents.map((student, index) => {
                      return (
                        <div
                          key={index}
                          className="smallStudentCont"
                          id={index}
                          onClick={() => {
                            this.moveToStudent(index);
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
                    marginTop: "1vh",
                    display: this.props.chosenClass.haveMoreStudents
                      ? "inline-block"
                      : "none",
                  }}
                >
                  הצג עוד
                </button>
              )}
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
