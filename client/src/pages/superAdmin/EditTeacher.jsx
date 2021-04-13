import React from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import WhiteBar from "../../component/superAdmin/ArrowNavBar.jsx";
import ClassSelection from "../../component/superAdmin/ClassSelection.jsx";
import "../../style/superAdmin/form_style.scss";
import "../../style/superAdmin/add_game_style.scss";
import SelectStyle from "../../style/superAdmin/select_style";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import { teachersContext } from "../../stores/teachers.store";
import { errorMsgContext } from "../../stores/error.store";
import EditIcon from "@material-ui/icons/Edit";
import addicon from "../../img/addicon.svg";

import {
  emailValidation,
  mustInputValidation,
  nameValidation,
  teacherPasswordValidation,
} from "../../tools/ValidationFunctions.js";
import { schoolsContext } from "../../stores/schools.store.js";
const axios = require("axios").default;

class EditTeacher extends React.Component {
  constructor() {
    super();
    this.rakazOptions = [
      { value: "true", label: "כן" },
      { value: "false", label: "לא" },
    ];
    this.state = {
      schoolId: 0,
      showPassChanger: false,
      passDisplay: "",
      newPass: "",
      passErr: "",
      teacherFirstName: "",
      lastName: "",
      schoolName: "",
      fieldsData: [],
      email: "",
      rakaz: "",
      school: "",
      teacherLastNameError: { toShow: "none", mess: "" },
      teacherNameError: { toShow: "none", mess: "" },
      schoolNameError: { toShow: "none", mess: "" },
      emailNameError: { toShow: "none", mess: "" },
      passwordNameError: { toShow: "none", mess: "" },
      passwordError: "",
      allSchools: [],
      allClasses: [],
      chosenClasses: [],
    };
  }

  componentDidMount = async () => {
    if (this.props.teachers.chosenTeacher !== null) {
      let fields = this.props.teachers.chosenTeacher.classroomTeacher.map(
        (classroom) => {
          return { id: classroom.id, value: classroom.name };
        }
      );
      this.setState({
        schoolId: this.props.teachers.chosenTeacher.school.id,
        teacherFirstName: this.props.teachers.chosenTeacher.first_name,
        lastName: this.props.teachers.chosenTeacher.last_name,
        email: this.props.teachers.chosenTeacher.username,
        schoolName: this.props.teachers.chosenTeacher.school.name,
        fieldsData: fields,
        rakaz:
          this.props.teachers.chosenTeacher.roles[0].name === "teacher"
            ? false
            : true,
      });
      await this.props.schools.getAllSchoolsNames();
      if (!this.props.schools.successGettingSchools) {
        this.props.errorMsg.setErrorMsg(
          "הייתה שגיאה בשרת. לא ניתן לקבל בתי ספר מהשרת."
        );
      } else {
        try {
          const { data } = await axios.get("/api/classroom/getSchoolClasses", {
            params: { schoolId: this.props.teachers.chosenTeacher.school.id },
          });
          this.setState({
            allClasses: data,
            userName: this.props.teachers.chosenTeacher.username,
            school: this.props.teachers.chosenTeacher.schoolName,
            chosenClasses: this.props.teachers.chosenTeacher.classroomTeacher,
            allSchools: this.props.schools.schoolsNames.map((school) => {
              return school.name;
            }),
          });
        } catch (err) {
          this.props.errorMsg.setErrorMsg(
            "הייתה שגיאה בשרת. לא ניתן לקבל בתי ספר מהשרת."
          );
        }
      }
    } else {
      this.props.errorMsg.setErrorMsg("הייתה שגיאה בשרת, אנא נסו שנית");
    }
  };

  makeSchoolOption = (indexSelect) => {
    let options = [];
    this.state.allSchools.map((nameSchool) => {
      if (nameSchool !== this.state.schoolName) {
        options.push({
          value: nameSchool,
          label: nameSchool,
          SchoolIndex: indexSelect,
        });
      }
    });
    return options;
  };

  saveTeacherName = (props) => {
    let myprops = props.target;
    this.setState({ teacherName: myprops.value });
  };

  saveLastName = (props) => {
    let myprops = props.target;
    this.setState({ lastName: myprops.value });
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
    });
    return options;
  };

  saveSchoolName = async (e) => {
    let chosenSchoolId = this.props.schools.schoolsNames.filter((school) => {
      return school.name === e.value;
    })[0];
    const { data } = await axios.get("/api/classroom/getSchoolClasses", {
      params: { schoolId: chosenSchoolId.id },
    });
    this.setState({
      school: e.value,
      allClasses: data,
      schoolId: chosenSchoolId.id,
      chosenClasses: [],
    });
  };

  saveValue = (newValue, id) => {
    this.setState((prevState) => {
      let updateData = [...prevState.fieldsData];
      updateData[id].value = newValue;
      return { fieldsData: updateData };
    });
  };

  saveEmail = (props) => {
    let myprops = props.target;
    this.setState({ email: myprops.value });
  };

  // savePassword = (props) => {
  //   let myprops = props.target;
  //   this.setState({ password: myprops.value });
  // };

  removeClass = (classIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.chosenClasses];
      tempData.splice(classIndex, 1);
      return { chosenClasses: tempData };
    });
  };

  addNewFieldData = () => {
    this.setState((prevState) => {
      let tempFieldsData = [...prevState.fieldsData];
      tempFieldsData.push({
        id: this.state.fieldsData.length,
        value: [false],
      });
      return { fieldsData: tempFieldsData };
    });
  };
  closePassChange = () => {
    if (!this.state.passErr) {
      this.setState({
        showPassChanger: !this.state.showPassChanger,
        passErr: "",
      });
    }
  };
  updatePass = async () => {
    // console.log(this.state.passDisplay, "HEWERO");
    try {
      await axios.post("/api/teacher/changeteacherpass", {
        username: this.state.email,
        password: this.state.passDisplay,
      });
      this.closePassChange();
      // this.props.errorMsg.setErrorMsg(" הסיסמה שונתה בהצלחה! ");
    } catch (err) {
      this.setState({ passDisplay: "" });
      this.props.errorMsg.setErrorMsg("סיסמה לא נשמרה, נסו שנית :(");
    }
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

  triggerRemoval = (id) => {
    this.setState((prevState) => {
      let oldFieldArray = prevState.fieldsData;
      let newArray = oldFieldArray.filter((field) => field.id !== id);
      return { fieldsData: newArray };
    });
  };

  validateInputFields = async (e) => {
    e.preventDefault();
    let allOk = true;
    // ----------teacher first name validation-------------------
    let nameTeacherMess = nameValidation(this.state.teacherFirstName);
    if (nameTeacherMess.length !== 0) {
      this.setState((prevState) => {
        prevState.teacherNameError.toShow = "inline-block";
        prevState.teacherNameError.mess = nameTeacherMess;
        return { teacherNameError: prevState.teacherNameError };
      });
      allOk = false;
    } else {
      this.setState({ teacherNameError: { toShow: "none", mess: "" } });
      allOk = true;
    }
    // ----------teacher last name validation-------------------
    let lastNameTeacherMess = nameValidation(this.state.lastName);
    if (lastNameTeacherMess.length !== 0) {
      this.setState((prevState) => {
        prevState.teacherLastNameError.toShow = "inline-block";
        prevState.teacherLastNameError.mess = lastNameTeacherMess;
        return { teacherLastNameError: prevState.teacherLastNameError };
      });
      allOk = false;
    } else {
      this.setState({ teacherLastNameError: { toShow: "none", mess: "" } });
      allOk = true;
    }
    // ----------school name validation-------------------
    let nameSchoolMess = mustInputValidation(this.state.schoolName);
    if (this.state.schoolName.length !== 0) {
      this.setState((prevState) => {
        prevState.schoolNameError.toShow = "inline-block";
        prevState.schoolNameError.mess = nameSchoolMess;
        return { schoolNameError: prevState.schoolNameError };
      });
      allOk = false;
    } else {
      this.setState({ schoolNameError: { toShow: "none", mess: "" } });
      allOk = true;
    }
    //------------email validation---------------
    let emailMess = emailValidation(this.state.email);
    if (emailMess.length !== 0) {
      this.setState((prevState) => {
        prevState.emailNameError.toShow = "inline-block";
        prevState.emailNameError.mess = emailMess;
        return { emailNameError: prevState.emailNameError };
      });
      allOk = false;
    } else {
      this.setState({ emailNameError: { toShow: "none", mess: "" } });
      allOk = true;
    }
    // ----------password validation-------------------
    if (this.state.showPassChanger) {
      let passwordErrorMess = teacherPasswordValidation(this.state.passDisplay);
      if (passwordErrorMess.length !== 0) {
        this.setState({
          passErr: passwordErrorMess,
        });
        allOk = false;
      } else {
        this.setState({ passErr: "" });
      }
    }
    //after all the validation we need to send the data to sql
    if (allOk) {
      try {
        if (this.state.passDisplay.length !== 0) {
          await this.updatePass();
        }
        let notEmptyClasses = this.state.chosenClasses.filter((classroom) => {
          return classroom.name !== "שייך לכיתה";
        });
        let onlyRightFields = notEmptyClasses.map((classroom) => {
          return { id: classroom.id, name: classroom.name };
        });
        // console.log('onlyRightFields: ', onlyRightFields);

        // console.log("this.state.passDisplay: ", this.state.passDisplay);

        let { data } = await axios.post("/api/teacher/editTeacher", {
          id: this.props.teachers.chosenTeacher.id,
          username: this.state.email,
          password: this.state.passDisplay,
          firstName: this.state.teacherFirstName,
          lastName: this.state.lastName,
          classrooms: onlyRightFields,
          schoolId: this.state.schoolId,
        });
        let classroomTeacher = this.state.chosenClasses.filter((classroom) => {
          return classroom.name !== "שייך לכיתה";
        });
        // console.log('data: ', data);

        if (data) {
          this.props.teachers.updateTeacher({
            first_name: this.state.teacherFirstName,
            last_name: this.state.lastName,
            name: this.state.teacherFirstName + " " + this.state.lastName,
            username: this.state.email,
            schoolName: this.state.schoolName,
            school: { id: this.state.schoolId, name: this.state.schoolName },
            id: this.props.teachers.chosenTeacher.id,
            classroomTeacher: classroomTeacher,
            classes:
              classroomTeacher !== undefined
                ? classroomTeacher.map((classInfo) => {
                    return classInfo.name;
                  })
                : [],
          });
          this.props.history.goBack(); // after saving go back
        } else {
          this.props.errorMsg.setErrorMsg(
            "שם משתמש כבר קיים. אנא נסה להכניס שם משתמש אחר."
          );
        }
      } catch (err) {
        this.props.errorMsg.setErrorMsg("שגיאה בשרת, המורה לא נשמר, נסו שוב.");
      }
    }
  };

  onPassChange = (val) => {
    this.setState({ passDisplay: val.target.value });
  };

  deleteTeacher = () => {
    let success = this.props.teachers.deleteTeacher();
    if (success) {
      this.props.history.goBack();
    } else {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת, לא היה ניתן למחוק את המורה."
      );
    }
  };

  render() {
    // console.log('this.state.chosenClasses: ', this.state.chosenClasses);
    return (
      <>
        <div className="pageContainer withMenu">
          <WhiteBar />
          <div>
            <form className="formData">
              {/* מורה */}
              <label className="labelFields">שם פרטי:</label>
              <p
                className="error"
                style={{ display: this.state.teacherNameError.toShow }}
              >
                {this.state.teacherNameError.mess}
              </p>
              <input
                className="inputFields"
                type="text"
                placeholder="הכנס את שם המורה..."
                onBlur={this.saveTeacherName}
                defaultValue={this.state.teacherFirstName}
              />
              <label className="labelFields">שם משפחה:</label>
              <p
                className="error"
                style={{ display: this.state.teacherLastNameError.toShow }}
              >
                {this.state.teacherLastNameError.mess}
              </p>
              <input
                className="inputFields"
                type="text"
                placeholder="הכנס את שם המורה..."
                onBlur={this.saveLastName}
                defaultValue={this.state.lastName}
              />

              {/* בית ספר */}
              <label className="labelFields">בית ספר:</label>
              <p
                className="error"
                style={{ display: this.state.schoolNameError.toShow }}
              >
                {this.state.schoolNameError.mess}
              </p>
              <Select
                className="selectStyle"
                onChange={this.saveSchoolName}
                options={this.makeSchoolOption()}
                styles={SelectStyle()}
                placeholder={this.state.schoolName}
                // defaultValue={{ value: "schoolName", label: String(this.state.schoolName) }}
                // native={true}
              />
              {/* רכז*/}
              <label className="labelFields">רכז:</label>
              <p
                className="error"
                style={{ display: this.state.schoolNameError.toShow }}
              >
                {this.state.schoolNameError.mess}
              </p>
              <Select
                className="selectStyle"
                // onChange={this.saveSchoolName}
                options={this.rakazOptions}
                styles={SelectStyle()}
                isDisabled={true}
                placeholder={this.state.rakaz === true ? "כן" : "לא"}
              />
              {/* כיתה */}
              <div>
                {this.state.schoolName.length === 0 ? (
                  <></>
                  ) : (
                    <>
                    <label className="labelFields">כיתות:</label>
                    {this.state.allClasses.length === 0 ? <p>אין כיתות לבית ספר זה</p> : <></>}
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
                        <img
                          className="addIcon"
                          src={addicon}
                          alt="add icon"
                        ></img>
                        <p className="addTitle">הוסף כיתה</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>

            <form className="formData" style={{ marginTop: "0" }}>
              {/* אימייל */}
              <label className="labelFields">אימייל:</label>
              <p
                className="error"
                style={{ display: this.state.emailNameError.toShow }}
              >
                {this.state.emailNameError.mess}
              </p>
              <input
                className="inputFields"
                onBlur={this.saveEmail}
                type="text"
                placeholder="הכנס כתובת מייל..."
                defaultValue={this.state.email}
              />
              {/* סיסמא */}
              <div
                className="passchangeTeacher"
                onClick={() => {
                  this.setState({
                    showPassChanger: !this.state.showPassChanger,
                    passErr: "",
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
              <div
                style={{
                  display: this.state.showPassChanger ? "block" : "none",
                }}
              >
                <h4 className="inputError">{this.state.passErr}</h4>
                <div style={this.state.passErr ? { marginTop: "5vh" } : {}}>
                  <div className="teacherDeets" style={{ marginTop: "2.5vh" }}>
                    <input
                      style={{
                        border: "none",
                        backgroundColor: "rgba(188, 188, 203, 0)",
                        fontWeight: "600",
                        width: "90%",
                        fontFamily: "Assistant",
                      }}
                      className="passInputTeacher"
                      placeholder="הכנס סיסמא חדשה"
                      onChange={(val) => this.onPassChange(val)}
                      value={this.state.passDisplay}
                      type="text"
                    />
                  </div>
                </div>
                <div className="approveOrNot">
                  <div
                    className="passchangeTeacher"
                    onClick={() => {
                      this.setState({
                        showPassChanger: !this.state.showPassChanger,
                        passErr: "",
                        passDisplay: "",
                      });
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "lighter",
                        paddingLeft: "3vw",
                        paddingRight: "3vw",
                      }}
                      className="changePasstext"
                    >
                      ביטול
                    </h3>
                  </div>
                </div>
              </div>
            </form>

            <div className="spacerFromSaveButton"></div>
            <div className="saveButtonBackground deletButtonTeacher">
              <button className="deletButton" onClick={this.deleteTeacher}>
                מחק מורה
              </button>
              <button className="saveButton" onClick={this.validateInputFields}>
                שמור
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapContextToProps = {
  schools: schoolsContext,
  teachers: teachersContext,
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(
  observer(withRouter(EditTeacher))
);
