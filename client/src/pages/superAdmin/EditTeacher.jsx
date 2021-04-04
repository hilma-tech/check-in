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
import EditIcon from '@material-ui/icons/Edit';
import addicon from "../../img/addicon.svg";

import { emailValidation, mustInputValidation, nameValidation, teacherPasswordValidation } from "../../tools/ValidationFunctions.js";

class EditTeacher extends React.Component {
  constructor() {
    super();
    this.rakazOptions = [
      { value: "true", label: "כן" },
      { value: "false", label: "לא" },
    ];
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
      showPassChanger: false,
      teacherName: "",
      schoolName: "",
      fieldsData: [],
      email: "",
      password: "",
      rakaz: "",
      teacherNameError: { toShow: "none", mess: "" },
      schoolNameError: { toShow: "none", mess: "" },
      emailNameError: { toShow: "none", mess: "" },
      passwordNameError: { toShow: "none", mess: "" },
    };
  }

  componentDidMount() {
    if (this.props.teachers.chosenTeacher !== null) {
      let fields = this.props.teachers.chosenTeacher.classroomTeacher.map(
        (classroom) => {
          return { id: classroom.id, value: classroom.name };
        }
      );
      this.setState({
        teacherName:
          this.props.teachers.chosenTeacher.first_name +
          " " +
          this.props.teachers.chosenTeacher.last_name,
        email: this.props.teachers.chosenTeacher.username,
        schoolName: this.props.teachers.chosenTeacher.school.name,
        fieldsData: fields,
        rakaz: this.props.teachers.chosenTeacher.roles[0].name === 'teacher' ? false : true
      });
    }
    else {
      this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת, אנא נסו שנית')
      
    }
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
    if(this.state.showPassChanger){
      let passwordErrorMess = teacherPasswordValidation(this.state.password);
      if (passwordErrorMess.length !== 0) {
        this.setState((prevState) => {
          prevState.passwordError.toShow = "block";
          prevState.passwordError.mess = passwordErrorMess;
          return { passwordError: prevState.passwordError };
        });
        allOk = false;
      } else {
        this.setState({ passwordError: { toShow: "none", mess: "" } });
      }
    }
    //after all the validetion we need to send the data to sql
    if (allOk) {
      this.props.history.goBack(); // after saving go back
    }
  };

  deleteTeacher = () => {
    let success = this.props.teachers.deleteTeacher()
    if(success){
      this.props.history.goBack();
    } else {
      this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת, לא היה ניתן למחוק את המורה.')
    }
  }

  render() {
    return (
      <>
        <div className="pageContainer withMenu">
          <WhiteBar />
          <div>
            <form className="formData">
              {/* מורה */}
              <label className="labelFields">שם המורה:</label>
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
                defaultValue={this.state.teacherName}
        
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
                options={this.schoolOptions}
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
                placeholder={this.state.rakaz === true ? "כן" : "לא"}
                
              />
              {/* כיתה */}
              <label className="labelFields">כיתות:</label>
              <div>
                {this.state.fieldsData.length === 0 ? (
                  <p>למורה זה אין כיתות</p>
                ) : (
                    this.state.fieldsData.map((fieldObj) => {
                      return (
                        <ClassSelection
                          key={fieldObj.id}
                          id={fieldObj.id}
                          removal={this.triggerRemoval}
                          saveValue={this.saveValue}
                          options={this.classOptions}
                          onChange={this.saveChange}
                          
                          defaultValue={fieldObj.value}
                        />
                      );
                    })
                  )}
              </div>
            </form>
            {/* הוספת כיתה */}
            <div
                style={{ marginRight: '9vw' }}
                className='addSomethingNew'
                onClick={this.addNewFieldData}
              >
                <img className='addIcon' src={addicon} alt="addIcon"></img>
                <p className='addTitle'>הוסף כיתה</p>
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
        
                defaultValue={this.state.email}
              />
              {/* סיסמא */}
              {this.state.showPassChanger ?
            <><label className="labelFields">* סיסמא:</label>
              <p
                className="error"
                style={{ display: this.state.passwordError.toShow }}
              >
                {this.state.passwordError.mess}
              </p>
              <input
                className="inputFields"
                defaultValue={this.state.password}
                onChange={this.handlechanges}
                type="text"
                placeholder="הכנס סיסמא"
                name="password"
              ></input>
              <div className="passTeacherChange" onClick={() => {
              this.setState({
                showPassChanger: !this.state.showPassChanger,
                password: ""
              });
            }} >
              <h2 className="changePasstext" >ביטול</h2>
            </div> </> :
            <div className="passTeacherChange" onClick={() => {
              this.setState({
                showPassChanger: !this.state.showPassChanger,
                password: ""
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
          }
            </form>

            <div className='spacerFromSaveButton'></div>
              <div className='saveButtonBackground'>
              <button className="deletButton" onClick={this.deleteTeacher}>מחק מורה</button>
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
  teachers: teachersContext,
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(
  observer(withRouter(EditTeacher))
);
