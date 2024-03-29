import React from "react";
import Select from "react-select";
import SelectStyle from "../../style/superAdmin/select_style";
import "../../style/superAdmin/form_style.scss";
import addicon from "../../img/addicon.svg";
import ArrowNavBar from "../../component/superAdmin/ArrowNavBar.jsx";
import { withRouter } from "react-router-dom";
import {
  nameValidation,
  userNameValidation,
  studentPasswordValidation,
  mustInputValidation,
} from "../../tools/ValidationFunctions";
import "../../style/superAdmin/class_selection_style.css";
import "../../style/superAdmin/edit_student_style.scss";
import { errorMsgContext } from "../../stores/error.store";
import { schoolsContext } from "../../stores/schools.store";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
import { studentsContext } from "../../stores/students.store";
import EditIcon from "@material-ui/icons/Edit";
import { Axios, Delete, EmptMsg, HideStyle } from "../../tools/GlobalVarbs";
import { fadeMsgContext } from "../../stores/fadeMsg.store";

class EditStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      studentFirstNameError: { toShow: HideStyle, mess: EmptMsg },
      studentFirstName: "",
      studentLastNameError: { toShow: HideStyle, mess: EmptMsg },
      studentLastName: "",
      userNameError: { toShow: HideStyle, mess: EmptMsg },
      userName: "",
      passwordError: { toShow: HideStyle, mess: EmptMsg },
      password: "",
      schoolNameError: { toShow: HideStyle, mess: EmptMsg },
      school: "",
      schoolId: 0,
      chosenClasses: [],
      allClasses: [],
      allSchools: [],
      showPassChanger: false,
    };
  }
  componentDidMount = async () => {
    if (this.props.students.chosenStudent.classroomStudent === undefined) {
      this.props.errorMsg.setErrorMsg("הייתה שגיאה בשרת, אנא נסו שנית");
    } else {
      await this.props.schools.getAllSchoolsNames();
      if (!this.props.schools.successGettingSchools) {
        this.props.errorMsg.setErrorMsg(
          "הייתה שגיאה בשרת. לא ניתן לקבל בתי ספר מהשרת."
        );
      } else {
        try {
          const { data } = await Axios.get("/api/classroom/getSchoolClasses", {
            params: { schoolId: this.props.students.chosenStudent.school.id },
          });
          this.setState({
            schoolId: this.props.students.chosenStudent.school.id,
            allClasses: data,
            studentFirstName: this.props.students.chosenStudent.first_name,
            studentLastName: this.props.students.chosenStudent.last_name,
            userName: this.props.students.chosenStudent.username,
            school: this.props.students.chosenStudent.schoolName,
            chosenClasses: this.props.students.chosenStudent.classroomStudent,
            allSchools: this.props.schools.schoolsNames.map((school) => {
              return school.name;
            }),
          });
        } catch (err) {
          this.props.errorMsg.setErrorMsg(
            "הייתה שגיאה בשרת. לא ניתן לקבל כיתות מהשרת."
          );
        }
      }
    }
  };

  //Return the classes list as list of object for the Select.
  makeClassesOption = (indexSelect) => {
    let options = [];
    this.state.allClasses.map((classData) => {
      if (
        this.state.chosenClasses.filter((chosenClassData) => {
          return chosenClassData.name === classData.name;
        }).length === 0
      ) {
        options.push({
          value: classData.name,
          label: classData.name,
          classIndex: indexSelect,
          id: classData.id,
        });
      }
      return null
    });
    return options;
  };

  addClassSelection = () => {
    this.setState((prevState) => {
      prevState.chosenClasses.push({
        id: -1 * prevState.chosenClasses.length,
        name: "שייך לכיתה",
      });
      return { chosenClasses: prevState.chosenClasses };
    });
  };

  chooseClass = (e) => {
    this.setState((prevState) => {
      prevState.chosenClasses[e.classIndex] = { id: e.id, name: e.value };
      return { chosenClasses: prevState.chosenClasses };
    });
  };

  removeClass = (classIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.chosenClasses];
      tempData.splice(classIndex, 1);
      return { chosenClasses: tempData };
    });
  };

  //Return the schools list as list of object for the Select.
  makeSchoolOption = (indexSelect) => {
    let options = [];
    this.state.allSchools.map((nameSchool) => {
      if (nameSchool !== this.state.school) {
        options.push({
          value: nameSchool,
          label: nameSchool,
          SchoolIndex: indexSelect,
        });
      }
      return null
    });
    return options;
  };

  chooseSchool = async (e) => {
    try{
      let chosenScoolId = this.props.schools.schoolsNames.filter((school) => {
        return school.name === e.value;
      })[0];
      const { data } = await Axios.get("/api/classroom/getSchoolClasses", {
        params: { schoolId: chosenScoolId.id },
      });
      this.setState({
        school: e.value,
        allClasses: data,
        schoolId: chosenScoolId.id,
        chosenClasses: [],
      });
    } catch(err){
      this.props.errorMsg.setErrorMsg("שגיאה בשרת, לא ניתן לקבל כיתות.");
    }
  };

  //saves changes in entered data to the state
  handlechanges = (e) => {
    let updateData = e.target;
    this.setState((prevState) => {
      prevState[updateData.name] = updateData.value;
      return { [updateData.name]: prevState[updateData.name] };
    });
  };

  //when clicking on save we first validate the information
  saveButton = async (e) => {
    e.preventDefault();
    let allOk = true;
    /* data validation  */
    // ----------student name validation-------------------
    let studentFirstNameErrorMess = nameValidation(this.state.studentFirstName);
    if (studentFirstNameErrorMess.length !== 0) {
      this.setState((prevState) => {
        prevState.studentFirstNameError.toShow = "block";
        prevState.studentFirstNameError.mess = studentFirstNameErrorMess;
        return { studentFirstNameError: prevState.studentFirstNameError };
      });
      allOk = false;
    } else {
      this.setState({ studentFirstNameError: { toShow: HideStyle, mess: EmptMsg } });
    }
    let studentLastNameErrorMess = nameValidation(this.state.studentLastName);
    if (studentLastNameErrorMess.length !== 0) {
      this.setState((prevState) => {
        prevState.studentLastNameError.toShow = "block";
        prevState.studentLastNameError.mess = studentLastNameErrorMess;
        return { studentLastNameError: prevState.studentLastNameError };
      });
      allOk = false;
    } else {
      this.setState({ studentLastNameError: { toShow: HideStyle, mess: EmptMsg } });
    }

    // ----------user name validation-------------------
    let userNameErrorMess = userNameValidation(this.state.userName);
    if (userNameErrorMess.length !== 0) {
      this.setState((prevState) => {
        prevState.userNameError.toShow = "block";
        prevState.userNameError.mess = userNameErrorMess;
        return { userNameError: prevState.userNameError };
      });
      allOk = false;
    } else {
      this.setState({ userNameError: { toShow: HideStyle, mess: EmptMsg } });
    }

    // ---------------password validation-------------------
    if (this.state.showPassChanger) {
      let passwordErrorMess = studentPasswordValidation(this.state.password);
      if (passwordErrorMess.length !== 0) {
        this.setState((prevState) => {
          prevState.passwordError.toShow = "block";
          prevState.passwordError.mess = passwordErrorMess;
          return { passwordError: prevState.passwordError };
        });
        allOk = false;
      } else {
        this.setState({ passwordError: { toShow: HideStyle, mess: EmptMsg } });
      }
    }

    // ---------------school name validation-------------------
    let schoolNameErrorMess = mustInputValidation(this.state.school);
    if (schoolNameErrorMess.length !== 0) {
      this.setState((prevState) => {
        prevState.schoolNameError.toShow = "block";
        prevState.schoolNameError.mess = schoolNameErrorMess;
        return { schoolNameError: prevState.schoolNameError };
      });
      allOk = false;
    } else {
      this.setState({ schoolNameError: { toShow: HideStyle, mess: EmptMsg } });
    }

    //after all the validation we need to send the data to sql
    if (allOk) {
      let isChange = false;
      if (
        this.state.schoolId !== this.props.students.chosenStudent.school.id ||
        this.state.studentFirstName !==
        this.props.students.chosenStudent.first_name ||
        this.state.studentLastName !==
        this.props.students.chosenStudent.last_name ||
        this.state.userName !== this.props.students.chosenStudent.username ||
        this.state.password.length !== 0
      ) {
        isChange = true;
      }
      if (
        this.state.chosenClasses.length ===
        this.props.students.chosenStudent.classroomStudent.length
      ) {
        for (let i = 0; i < this.state.chosenClasses.length; i++) {
          let a = this.props.students.chosenStudent.classroomStudent.filter(
            (classroom) => {
              return classroom.id === this.state.chosenClasses[i].id;
            }
          );
          if (a.length !== 0) {
            isChange = true;
          }
        }
      } else {
        isChange = true;
      }
      if (isChange) {
        try {
          let { data } = await Axios.post("/api/student/editStudent", {
            id: this.props.students.chosenStudent.id,
            username: this.state.userName,
            password: this.state.password,
            firstName: this.state.studentFirstName,
            lastName: this.state.studentLastName,
            classrooms: this.state.chosenClasses.filter((classroom) => {
              return classroom.name !== "שייך לכיתה";
            }),
            schoolId: this.state.schoolId,
          });
          let classroomStudent = this.state.chosenClasses.filter(
            (classroom) => {
              return classroom.name !== "שייך לכיתה";
            }
          );
          if (data) {
            this.props.students.updateStudent({
              first_name: this.state.studentFirstName,
              last_name: this.state.studentLastName,
              name:
                this.state.studentFirstName + " " + this.state.studentLastName,
              username: this.state.userName,
              schoolName: this.state.school,
              school: { id: this.state.schoolId, name: this.state.school },
              id: this.props.students.chosenStudent.id,
              classroomStudent: classroomStudent,
              classes:
                classroomStudent !== undefined
                  ? classroomStudent.map((classInfo) => {
                    return classInfo.name;
                  })
                  : [],
            });
            this.props.history.goBack(); // after saving go back
            this.props.fadeMsg.setFadeMsg("תלמיד עודכן בהצלחה")
          } else {
            this.props.errorMsg.setErrorMsg(
              "שם משתמש כבר קיים. אנא נסה להכניס שם משתמש אחר."
            );
          }
        } catch (err) {
          this.props.errorMsg.setErrorMsg(
            "שגיאה בשרת, תלמיד לא נשמר, נסו שוב."
          );
        }
      } else {
        this.props.history.goBack();
      }
    }
  };

  deleteStudent = () => {
    let success = this.props.students.deleteStudent();
    if (success) {
      this.props.history.goBack();
      this.props.fadeMsg.setFadeMsg("תלמיד נמחק בהצלחה")
    } else {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת, לא היה ניתן למחוק את התלמיד."
      );
    }
  };

  render() {
    return (
      <div className="withMenu">
        <ArrowNavBar />
        <form className="formData">
          <label className="labelFields">* שם פרטי:</label>
          <p
            className="error"
            style={{ display: this.state.studentFirstNameError.toShow }}
          >
            {this.state.studentFirstNameError.mess}
          </p>
          <input
            className="inputFields"
            value={this.state.studentFirstName}
            onChange={this.handlechanges}
            placeholder="הכנס את שם התלמיד..."
            name="studentFirstName"
          ></input>

          <label className="labelFields">* שם משפחה:</label>
          <p
            className="error"
            style={{ display: this.state.studentLastNameError.toShow }}
          >
            {this.state.studentLastNameError.mess}
          </p>
          <input
            className="inputFields"
            value={this.state.studentLastName}
            onChange={this.handlechanges}
            placeholder="הכנס את שם התלמיד..."
            name="studentLastName"
          ></input>

          <label className="labelFields">* שם משתמש:</label>
          <p
            className="error"
            style={{ display: this.state.userNameError.toShow }}
          >
            {this.state.userNameError.mess}
          </p>
          <input
            className="inputFields"
            value={this.state.userName}
            onChange={this.handlechanges}
            placeholder="הכנס שם משתמש"
            type="text"
            name="userName"
          ></input>

          {this.state.showPassChanger ? (
            <>
              <label className="labelFields">* סיסמא:</label>
              <p
                className="error"
                style={{ display: this.state.passwordError.toShow }}
              >
                {this.state.passwordError.mess}
              </p>
              <input
                className="inputFields"
                value={this.state.password}
                onChange={this.handlechanges}
                type="text"
                placeholder="הכנס סיסמא"
                name="password"
              ></input>
              <div
                className="passStudentChange"
                onClick={() => {
                  this.setState({
                    showPassChanger: !this.state.showPassChanger,
                    password: "",
                  });
                }}
              >
                <h2 className="changePasstext">ביטול</h2>
              </div>{" "}
            </>
          ) : (
              <div
                className="passStudentChange"
                onClick={() => {
                  this.setState({
                    showPassChanger: !this.state.showPassChanger,
                    password: "",
                  });
                }}
              >
                <h2 className="changePasstext">שינוי סיסמא</h2>
                <div className="editIcon">
                  <EditIcon
                    style={{
                      height: "3vh",
                      width: "3vh",
                      color: "#043163",
                    }}
                  />
                </div>
              </div>
            )}

          <label className="labelFields">* בית ספר:</label>
          <p
            className="error"
            style={{ display: this.state.schoolNameError.toShow }}
          >
            {this.state.schoolNameError.mess}
          </p>
          <Select
            className="selectStyle"
            styles={SelectStyle()}
            options={this.makeSchoolOption()}
            onChange={this.chooseSchool}
            placeholder={this.state.school ? this.state.school : "בחר..."}
          />

          {this.state.allClasses.length === 0 ? (
            <></>
          ) : (
              <>
                <label className="labelFields">כיתה:</label>
                {this.state.allClasses.length === 0 ? (
                  <p>אין כיתות לבית ספר זה</p>
                ) : (
                    <></>
                  )}
                {this.state.chosenClasses.map((val, i) => {
                  return (
                    <div key={val.id} className="classSelection">
                      <Select
                        className="classSelectionInAddTecher"
                        styles={SelectStyle()}
                        options={this.makeClassesOption(i)}
                        onChange={this.chooseClass}
                        defaultValue={{
                          value: val.name,
                          label: val.name,
                        }}
                      />
                      <img
                      alt= "remove field icon"
                        className="removeFieldIcon"
                        onClick={() => this.removeClass(i)}
                        src="/icons/delete.svg"
                      />
                    </div>
                  );
                })}

                {this.state.allClasses.length ===
                  this.state.chosenClasses.length ? (
                    <></>
                  ) : (
                    <div
                      className="addSomethingNew"
                      onClick={this.addClassSelection}
                    >
                      <img className="addIcon" src={addicon} alt="add icon"></img>
                      <p className="addTitle">הוסף כיתה</p>
                    </div>
                  )}
              </>
            )}
        </form>

        <div className="spacerFromSaveButton"></div>
        <div className="saveButtonBackground">
          <button
            className="deletButton deletButtonmargin"
            onClick={() => {
              this.props.errorMsg.setQuestion(
                "האם אתה בטוח שברצונך למחוק תלמיד זה?",
                this.deleteStudent,
                Delete
              );
            }}
          >
            מחק תלמיד
          </button>
          <button className="saveButton" onClick={this.saveButton}>
            שמור
          </button>
        </div>
      </div>
    );
  }
}

const mapContextToProps = {
  schools: schoolsContext,
  students: studentsContext,
  errorMsg: errorMsgContext,
  fadeMsg: fadeMsgContext,
};

export default withContext(mapContextToProps)(
  observer(withRouter(EditStudent))
);
