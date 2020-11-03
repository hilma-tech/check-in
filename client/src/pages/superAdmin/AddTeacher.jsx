import React, { Component } from "react";
import Select from "react-select";
import addicon from "../../img/addicon.svg";
import WhiteBar from "../../component/superAdmin/ArrowNavBar.jsx";
import ClassSelection from "../../component/superAdmin/ClassSelection.jsx";
import "../../style/superAdmin/form_style.css";
import "../../style/superAdmin/add_game_style.css";
import "../../style/superAdmin/add_teacher_style.css";
import SelectStyle from "../../style/superAdmin/select_style";
import {
  nameValidation,
  mustInputValidation,
  passwordValidation,
  emailValidation
} from "../../component/superAdmin/ValidationFunctions";

class AddTeacher extends Component {
  constructor() {
    super();
    this.schoolOptions = [
      { value: "maalot", label: "מעלות התורה" },
      { value: "orot", label: "אורות בנות" },
      { value: "shaalei", label: "שעלי תורה" },
    ];
    this.classOptions = [
      { value: "a3", label: "א'3" },
      { value: "b2", label: "ב'2" },
      { value: "f1", label: "ו'1" },
      { value: "c6", label: "ג'6" },
    ];
    this.state = {
      teacherName: "",
      schoolName: "",
      fieldsData: [{ id: 0, value: "" }],
      email: "",
      password: "",
    };
  }

  saveTeacherName = (props) => {
    let myprops = props.target;
    this.setState({ teacherName: myprops.value });
  };

  saveSchoolName = (props) => {
    this.setState((prevState) => {
      let prevSchool = prevState.schoolName;
      prevSchool = props.value;
      return { schoolName: prevSchool };
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
     let nameTeacherMess = nameValidation(this.state.teacherName);
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
      this.props.history.goBack(); // after saving go back
    }
  };

  render() {
    return (
      <>
        <div className="pageContainer">
          <WhiteBar />
          <div className="formContainer">
            <form className="formData">
              {/* מורה */}
              <label className="fieldTitle ">
                שם המורה:
                <input
                  className="inputFields spaceFromTitles"
                  type="text"
                  placeholder="הכנס את שם המורה..."
                  onBlur={this.saveTeacherName}
                />
              </label>

              {/* בית ספר */}
              <label className="fieldTitle">
                בית ספר:
                <Select
                  className="spaceFromTitles thinnerFont"
                  onChange={this.saveSchoolName}
                  options={this.schoolOptions}
                  styles={SelectStyle()}
                  defaultValue={{ value: "default", label: "שייך לבית ספר" }}
                />
              </label>
              {/* כיתה */}
              <label className="fieldTitle">כיתה:</label>
              <div className="spaceFromTitles">
                {this.state.fieldsData.map((fieldObj) => {
                  return (
                    <div className=" thinnerFont">
                      <ClassSelection
                        id={fieldObj.id}
                        removal={this.triggerRemoval}
                        saveValue={this.saveValue}
                        options={this.classOptions}
                        onChange={this.saveChange}
                      />
                      <br />
                    </div>
                  );
                })}
              </div>
            </form>

            {/* הוספת כיתה */}
            <div
              className="addSomethingNew"
              id="addNewField"
              onClick={this.addNewFieldData}
            >
              <img className="addIcon" src={addicon}></img>
              <p className="addTitle">הוסף כיתה</p>
            </div>

            <form className="formData">
              {/* אימייל */}
              <label className="fieldTitle">
                אימייל:
                <input
                  onBlur={this.saveEmail}
                  className="inputFields spaceFromTitles"
                  type="text"
                  placeholder="הכנס כתובת מייל..."
                />
              </label>
              {/* סיסמא */}
              <label className="fieldTitle pageEnd">
                סיסמא:
                <input
                  onBlur={this.savePassword}
                  className="inputFields spaceFromTitles"
                  type="text"
                  placeholder="הכנס סיסמא..."
                />
              </label>
            </form>
            <button className="saveButton">שמור</button>
          </div>
        </div>
      </>
    );
  }
}

export default AddTeacher;
