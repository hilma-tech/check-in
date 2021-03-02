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
  passwordValidation,
  emailValidation,
} from "../../tools/ValidationFunctions";
import { withRouter } from "react-router-dom";
import { errorMsgContext } from "../../stores/error.store";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import { schoolsContext } from "../../stores/schools.store";
const axios = require("axios").default;

class AddTeacher extends Component {
  constructor() {
    super();
    // this.schoolOptions = [
    // { value: "maalot", label: "מעלות התורה" },
    // { value: "orot", label: "אורות בנות" },
    // { value: "shaalei", label: "שעלי תורה" },
    // ];
    // this.classOptions = [
    // { value: "a3", label: "א'3" },
    //   { value: "b2", label: "ב'2" },
    //   { value: "f1", label: "ו'1" },
    //   { value: "c6", label: "ג'6" },
    // ];
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
      fieldsData: [{ id: 0, value: "" }],
      email: "",
      password: "",
      rakaz: "false",
      teacherFirstNameError: { toShow: "none", mess: "" },
      teacherLastNameError: { toShow: "none", mess: "" },
      schoolNameError: { toShow: "none", mess: "" },
      emailNameError: { toShow: "none", mess: "" },
      passwordNameError: { toShow: "none", mess: "" },
      rakazError: { toShow: "none", mess: "" },
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
        return { value: school.name, label: school.name };
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
    let chosenScoolId = this.props.schools.schoolsNames.filter((school) => {
      return school.name === props.value;
    })[0];
    const { data } = await axios.get("/api/classroom/getSchoolClasses", {
      params: { schoolId: chosenScoolId.id },
    });
    let classroomOption = data.map((classroom) => {
      return { value: classroom.name, label: classroom.name, id: classroom.id };
    });
    this.setState((prevState) => {
      let prevSchool = prevState.schoolName;
      prevSchool = props.value;
      return { schoolName: prevSchool, classOptions: classroomOption };
    });
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
        prevState.teacherFirstNameError.toShow = "inline-block";
        prevState.teacherFirstNameError.mess = firstNameTeacherMess;
        return { teacherFirstNameError: prevState.teacherFirstNameError };
      });
      allOk = false;
    } else {
      this.setState({ teacherFirstNameError: { toShow: "none", mess: "" } });
      allOk = true;
    }

    let lastNameTeacherMess = nameValidation(this.state.teacherLastName);
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
    // ----------school name validetion-------------------
    let nameSchoolMess = mustInputValidation(this.state.schoolName);
    if (nameSchoolMess.length !== 0) {
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
    // ----------rakaz validation-------------------
    let rakazMess = mustInputValidation(this.state.rakaz);
    console.log('JSON', this.state.rakaz);
    if (rakazMess.length !== 0) {
      this.setState((prevState) => {
        prevState.rakazError.toShow = "inline-block";
        prevState.rakazError.mess = rakazMess;
        return { rakazError: prevState.rakazError };
      });
      allOk = false;
    } else {
      this.setState({ rakazError: { toShow: "none", mess: "" } });
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
    // ----------password validetion-------------------
    let passwordMess = passwordValidation(this.state.password);
    if (passwordMess.length !== 0) {
      this.setState((prevState) => {
        prevState.passwordNameError.toShow = "inline-block";
        prevState.passwordNameError.mess = passwordMess;
        return { passwordNameError: prevState.passwordNameError };
      });
      allOk = false;
    } else {
      this.setState({ passwordNameError: { toShow: "none", mess: "" } });
      allOk = true;
    }

    //after all the validetion we need to send the data to sql
    if (allOk) {
      this.saveTeacherInDB();
    }
  };

  saveTeacherInDB = async () => {
    let currTeacherInfo = {
      first_name: this.state.teacherFirstName,
      last_name: this.state.teacherLastName,
      school_id: this.props.schools.schoolsNames.filter((school) => {
        return school.name === this.state.schoolName;
      })[0].id,
      fields_data: this.state.fieldsData,
      email: this.state.email,
      password: this.state.password,
      rakaz: this.state.rakaz,
    };
    try {
      // this.setState({ savingInfo: true });
      const response = await axios.post(
        "/api/teacher/register",
        currTeacherInfo
      );
      // this.props.games.addGame(response.data);
      this.props.history.goBack();
    } catch (error) {
      this.setState({ savingInfo: false });
      if (error.status === 500) {
        this.props.errorMsg.setErrorMsg("ארור 500. נסו שוב.");
      } else {
        this.props.errorMsg.setErrorMsg("הייתה שגיאה בשרת נסו לבדוק את החיבור");
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
              <label className="labelFields">שם פרטי:</label>
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
                placeholder="הכנס שם משפחה..."
                onBlur={this.saveTLastName}
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
                options={this.state.schoolOptions}
                styles={SelectStyle()}
                defaultValue={{ value: "default", label: "שייך לבית ספר" }}
              />
              {/* רכז */}
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
              />
              {/* כיתה */}
              <label className="labelFields">כיתה:</label>
              <div>
                {this.state.fieldsData.map((fieldObj,i) => {
                  return (
                    <ClassSelection
                      key={fieldObj.id}
                      id={fieldObj.id}
                      removal={this.triggerRemoval}
                      saveValue={this.saveChosenClassValue}
                      options={this.makeClassesOption(i)}
                      onChange={this.saveChange}
                    />
                  );
                })}
              </div>
            </form>
            {/* הוספת כיתה */}
            <div
              style={{ marginRight: "9vw" }}
              className="addSomethingNew"
              onClick={this.addNewFieldData}
            >
              <img className="addIcon" src={addicon} alt="addIcon"></img>
              <p className="addTitle">הוסף כיתה</p>
            </div>
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
              />
              {/* סיסמא */}
              <label className="labelFields">סיסמא:</label>
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
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(withRouter(observer(AddTeacher)));
