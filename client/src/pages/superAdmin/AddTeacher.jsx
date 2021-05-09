import React, { Component } from "react";
import Select from "react-select";
import addicon from "../../img/addicon.svg";
import WhiteBar from "../../component/superAdmin/ArrowNavBar.jsx";
import ClassSelection from "../../component/superAdmin/ClassSelection.jsx";
import "../../style/superAdmin/form_style.scss";
import "../../style/superAdmin/add_game_style.scss";
import SelectStyle from "../../style/superAdmin/select_style";
import {
  nameValidation,
  mustInputValidation,
  emailValidation,
  teacherPasswordValidation,
} from "../../tools/ValidationFunctions";
import { withRouter } from "react-router-dom";
import { errorMsgContext } from "../../stores/error.store";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import { schoolsContext } from "../../stores/schools.store";
import { teachersContext } from "../../stores/teachers.store";
import { Axios, EmptMsg, ExistErrorStatus, HideStyle, ShowStyle } from "../../tools/GlobalVarbs";
import { fadeMsgContext } from "../../stores/fadeMsg.store";

class AddTeacher extends Component {
  constructor() {
    super();
    this.rakazOptions = [
      { value: "true", label: "כן" },
      { value: "false", label: "לא" },
    ];
    this.state = {
      classOptions: [],
      schoolOptions: [],
      teacherFirstName: "",
      teacherLastName: "",
      schoolName: "",
      fieldsData: [],
      email: "",
      password: "",
      rakaz: "false",
      schoolId: 0,
      teacherFirstNameError: { toShow: HideStyle, mess: EmptMsg },
      teacherLastNameError: { toShow: HideStyle, mess: EmptMsg },
      schoolNameError: { toShow: HideStyle, mess: EmptMsg },
      emailNameError: { toShow: HideStyle, mess: EmptMsg },
      passwordNameError: { toShow: HideStyle, mess: EmptMsg },
      rakazError: { toShow: HideStyle, mess: EmptMsg },
    };
  }

  componentDidMount = async () => {
    await this.props.schools.getAllSchoolsNames();
    if (!this.props.schools.successGettingSchools) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל בתי ספר מהשרת."
      );
    } else {
      let schools = this.props.schools.schoolsNames.map((school) => {
        return { name: school.name, id: school.id };
      });
      this.setState({ schoolOptions: schools });
    }
  };

  saveTFirstName = (props) => {
    let myprops = props.target;
    this.setState({ teacherFirstName: myprops.value });
  };
  saveTLastName = (props) => {
    let myprops = props.target;
    this.setState({ teacherLastName: myprops.value });
  };

  saveSchoolName = async (props) => {
    try {
      const { data } = await Axios.get("/api/classroom/getSchoolClasses", {
        params: { schoolId: props.schoolId },
      });
      let classroomOption = data.map((classroom) => {
        return { value: classroom.name, label: classroom.name, id: classroom.id };
      });
      this.setState((prevState) => {
        let prevSchool = prevState.schoolName;
        prevSchool = props.value;
        return {
          schoolName: prevSchool,
          classOptions: classroomOption,
          fieldsData: [],
          schoolId: props.schoolId
        };
      });
    } catch (err) {
      this.props.errorMsg.setErrorMsg("שגיאה בשרת, לא ניתן לקבל כיתות.");
    }
  };

  saveRole = (props) => {
    this.setState((prevState) => {
      let prevRole = prevState.rakaz;
      prevRole = props.value;
      return { rakaz: prevRole };
    });
  };

  saveChosenClassValue = (newValue, i, id) => {
    this.setState((prevState) => {
      let updateData = [...prevState.fieldsData];
      updateData[i].value = newValue;
      updateData[i].classId = id;
      return { fieldsData: updateData };
    });
  };

  saveEmail = (props) => {
    let myprops = props.target;
    this.setState({ email: myprops.value });
  };

  savePassword = (props) => {
    let myprops = props.target;
    this.setState({ password: myprops.value });
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

  triggerRemoval = (id) => {
    this.setState((prevState) => {
      let oldFieldArray = prevState.fieldsData;
      let newArray = oldFieldArray.filter((field) => field.id !== id);

      return { fieldsData: newArray };
    });
  };

  validateInputFields = (e) => {
    e.preventDefault();
    let allOk = true;
    // ----------teacher name validetion-------------------
    let firstNameTeacherMess = nameValidation(this.state.teacherFirstName);
    if (firstNameTeacherMess.length !== 0) {
      this.setState((prevState) => {
        prevState.teacherFirstNameError.toShow = ShowStyle;
        prevState.teacherFirstNameError.mess = firstNameTeacherMess;
        return { teacherFirstNameError: prevState.teacherFirstNameError };
      });
      allOk = false;
    } else {
      this.setState({ teacherFirstNameError: { toShow: HideStyle, mess: EmptMsg } });
    }

    let lastNameTeacherMess = nameValidation(this.state.teacherLastName);
    if (lastNameTeacherMess.length !== 0) {
      this.setState((prevState) => {
        prevState.teacherLastNameError.toShow = ShowStyle;
        prevState.teacherLastNameError.mess = lastNameTeacherMess;
        return { teacherLastNameError: prevState.teacherLastNameError };
      });
      allOk = false;
    } else {
      this.setState({ teacherLastNameError: { toShow: HideStyle, mess: EmptMsg } });
    }
    // ----------school name validetion-------------------
    let nameSchoolMess = mustInputValidation(this.state.schoolName);
    if (nameSchoolMess.length !== 0) {
      this.setState((prevState) => {
        prevState.schoolNameError.toShow = ShowStyle;
        prevState.schoolNameError.mess = "** חייב להכניס שדה זה **";
        return { schoolNameError: prevState.schoolNameError };
      });
      allOk = false;
    } else {
      this.setState({ schoolNameError: { toShow: HideStyle, mess: EmptMsg } });
    }
    // ----------rakaz validation-------------------
    let rakazMess = mustInputValidation(this.state.rakaz);
    if (rakazMess.length !== 0) {
      this.setState((prevState) => {
        prevState.rakazError.toShow = ShowStyle;
        prevState.rakazError.mess = rakazMess;
        return { rakazError: prevState.rakazError };
      });
      allOk = false;
    } else {
      this.setState({ rakazError: { toShow: HideStyle, mess: EmptMsg } });
    }
    //------------email validation---------------
    let emailMess = emailValidation(this.state.email);
    if (emailMess.length !== 0) {
      this.setState((prevState) => {
        prevState.emailNameError.toShow = ShowStyle;
        prevState.emailNameError.mess = emailMess;
        return { emailNameError: prevState.emailNameError };
      });
      allOk = false;
    } else {
      this.setState({ emailNameError: { toShow: HideStyle, mess: EmptMsg } });
    }
    // ----------password validation-------------------
    let passwordMess = teacherPasswordValidation(this.state.password);
    if (passwordMess.length !== 0) {
      this.setState((prevState) => {
        prevState.passwordNameError.toShow = ShowStyle;
        prevState.passwordNameError.mess = passwordMess;
        return { passwordNameError: prevState.passwordNameError };
      });
      allOk = false;
    } else {
      this.setState({ passwordNameError: { toShow: HideStyle, mess: EmptMsg } });
    }

    //after all the validetion we need to send the data to sql
    if (allOk) {
      this.saveTeacherInDB();
    }
  };

  saveTeacherInDB = async () => {
    let classesNotEmp = this.state.fieldsData.filter((classroom) => {
      return classroom.classId !== undefined;
    });
    let currTeacherInfo = {
      first_name: this.state.teacherFirstName,
      last_name: this.state.teacherLastName,
      school_id: this.props.schools.schoolsNames.filter((school) => {
        return school.name === this.state.schoolName;
      })[0].id,
      fields_data: classesNotEmp,
      email: this.state.email,
      password: this.state.password,
      rakaz: this.state.rakaz,
    };
    try {
      // this.setState({ savingInfo: true });
      const { data } = await Axios.post(
        "/api/teacher/register",
        currTeacherInfo
      );
      if (data) {
        this.props.teachers.addTeacher({
          first_name: data.first_name,
          last_name: data.last_name,
          name: data.first_name + " " + data.last_name,
          username: data.username,
          schoolName: this.state.schoolName,
          id: data.id,
          classes: classesNotEmp.map((classInfo) => {
            return classInfo.value;
          }),
        });
      }
      // this.props.games.addGame(response.data);
      this.props.history.goBack();
      this.props.fadeMsg.setFadeMsg("מורה נשמר בהצלחה")
    } catch (error) {
      this.setState({ savingInfo: false });
      if (error.status === ExistErrorStatus) {
        this.props.errorMsg.setErrorMsg(
          "קיים כבר משתמש עם האימייל הזה. נסו שוב."
        );
      } else {
        this.props.errorMsg.setErrorMsg("היתה שגיאה בשרת המורה לא נשמר");
      }
    }
  };

  //Return the classes list as list of object for the Select.
  makeClassesOption = (indexSelect) => {
    let options = [];
    this.state.classOptions.map((classData) => {
      if (
        this.state.fieldsData.filter((chosenClassData) => {
          return chosenClassData.value === classData.value;
        }).length === 0
      ) {
        options.push({
          value: classData.value,
          label: classData.value,
          classIndex: indexSelect,
          id: classData.id,
        });
      }
      return null
    });
    return options;
  };

  removeClass = (classIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.fieldsData];
      tempData.splice(classIndex, 1);
      return { fieldsData: tempData };
    });
  };

  makeSchoolOption = () => {
    let options = [];
    this.state.schoolOptions.map((school) => {
      if (school.id !== this.state.schoolId) {
        options.push({
          value: school.name,
          label: school.name,
          schoolId: school.id
        });
      }
      return null
    });
    return options;
  };

  render() {

    return (
      <>
        <div className="pageContainer withMenu">
          <WhiteBar />
          <div>
            <form className="formData">
              {/* מורה */}
              <label className="labelFields">* שם פרטי:</label>
              <p
                className="error"
                style={{ display: this.state.teacherFirstNameError.toShow }}
              >
                {this.state.teacherFirstNameError.mess}
              </p>
              <input
                className="inputFields"
                type="text"
                placeholder="הכנס שם פרטי..."
                onBlur={this.saveTFirstName}
              />
              <label className="labelFields">* שם משפחה:</label>
              <p
                className="error"
                style={{ display: this.state.teacherLastNameError.toShow }}
              >
                {this.state.teacherLastNameError.mess}
              </p>
              <input
                className="inputFields"
                type="text"
                placeholder="הכנס שם משפחה..."
                onBlur={this.saveTLastName}
              />

              {/* בית ספר */}
              <label className="labelFields">* בית ספר:</label>
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
                defaultValue={{ value: "default", label: "שייך לבית ספר" }}
              />
              {/* רכז
              <label className="labelFields">רכז:</label>
              <p
                className="error"
                style={{ display: this.state.rakazError.toShow }}
              >
                {this.state.rakazError.mess}
              </p>
              <Select
                className="selectStyle"
                onChange={this.saveRole}
                options={this.rakazOptions}
                styles={SelectStyle()}
                defaultValue={{ value: "default", label: "לא" }}
              /> */}
              {/* כיתה */}
              {this.state.classOptions.length === 0 ? (
                <></>
              ) : (
                  <>
                    <label className="labelFields">כיתות:</label>
                    <div>
                      {this.state.fieldsData.map((fieldObj, i) => {
                        return (

                          <div className="teacherFlexClass" key={fieldObj.id}>
                            <ClassSelection
                              key={fieldObj.id}
                              id={fieldObj.id}
                              removal={this.triggerRemoval}
                              saveValue={this.saveChosenClassValue}
                              options={this.makeClassesOption(i)}
                              onChange={this.saveChange}
                            />
                            <img
                              alt="remove class button"
                              className="removeTeachersClass"
                              onClick={() => this.removeClass(i)}

                              src="/icons/delete.svg"
                            // style={{ height: "20px", marginTop: "15px" }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
            </form>
            {/* הוספת כיתה */}
            {this.state.classOptions.length === this.state.fieldsData.length ? (
              <></>
            ) : (
                <div
                  style={{ marginRight: "9vw" }}
                  className="addSomethingNew"
                  onClick={this.addNewFieldData}
                >
                  <img className="addIcon" src={addicon} alt="addIcon"></img>
                  <p className="addTitle">הוסף כיתה</p>
                </div>
              )}
            <form className="formData" style={{ marginTop: "0" }}>
              {/* אימייל */}
              <label className="labelFields">* אימייל:</label>
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
              />
              {/* סיסמא */}
              <label className="labelFields">* סיסמא:</label>
              <p
                className="error"
                style={{ display: this.state.passwordNameError.toShow }}
              >
                {this.state.passwordNameError.mess}
              </p>
              <input
                className="inputFields"
                onBlur={this.savePassword}
                type="text"
                placeholder="הכנס סיסמא..."
              />
            </form>

            <div className="spacerFromSaveButton"></div>
            <div className="saveButtonBackground">
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
  fadeMsg: fadeMsgContext,
};

export default withContext(mapContextToProps)(withRouter(observer(AddTeacher)));
