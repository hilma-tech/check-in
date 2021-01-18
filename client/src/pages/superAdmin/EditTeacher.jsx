import React from 'react';
import { withRouter } from 'react-router-dom';
import Select from "react-select";
import addicon from "../../img/addicon.svg";
import WhiteBar from "../../component/superAdmin/ArrowNavBar.jsx";
import ClassSelection from "../../component/superAdmin/ClassSelection.jsx";
import "../../style/superAdmin/form_style.scss";
import "../../style/superAdmin/add_game_style.scss";
import SelectStyle from "../../style/superAdmin/select_style";
import { observer } from "mobx-react";
import { withContext } from '@hilma/tools';
import { teachersContext } from '../../stores/teachers.store';
import { errorMsgContext } from '../../stores/error.store';


class EditTeacher extends React.Component {
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
      fieldsData: [],
      email: "",
      password: "",
      teacherNameError: { toShow: "none", mess: "" },
      schoolNameError: { toShow: "none", mess: "" },
      emailNameError: { toShow: "none", mess: "" },
      passwordNameError: { toShow: "none", mess: "" }
    };
  }

  componentDidMount() {
    if (this.props.teachers.chosenTeacher !== null) {
      let fields = this.props.teachers.chosenTeacher.classroomTeacher.map((classroom)=>{
        return {id: classroom.id, value: classroom.name}
      })
      this.setState({
        teacherName: this.props.teachers.chosenTeacher.first_name + ' ' + this.props.teachers.chosenTeacher.last_name,
        email: this.props.teachers.chosenTeacher.username,
        schoolName: this.props.teachers.chosenTeacher.school.name,
        fieldsData: fields
      })
    }
  }

  saveTeacherName = (props) => {
    // let myprops = props.target;
    // this.setState({ teacherName: myprops.value });
  };

  saveSchoolName = (props) => {
    // this.setState((prevState) => {
    //   let prevSchool = prevState.schoolName;
    //   prevSchool = props.value;
    //   return { schoolName: prevSchool };
    // });
  };

  saveValue = (newValue, id) => {
    // this.setState((prevState) => {
    //   let updateData = [...prevState.fieldsData];
    //   updateData[id].value = newValue;
    //   return { fieldsData: updateData };
    // });
  };

  saveEmail = (props) => {
    // let myprops = props.target;
    // this.setState({ email: myprops.value });
  };

  savePassword = (props) => {
    // let myprops = props.target;
    // this.setState({ password: myprops.value });
  };

  addNewFieldData = () => {
    // this.setState((prevState) => {
    //   let tempFieldsData = [...prevState.fieldsData];
    //   tempFieldsData.push({
    //     id: this.state.fieldsData.length,
    //     value: [false],
    //   });
    //   return { fieldsData: tempFieldsData };
    // });
  };

  triggerRemoval = (id) => {
    // this.setState((prevState) => {
    //   let oldFieldArray = prevState.fieldsData;
    //   let newArray = oldFieldArray.filter((field) => field.id !== id);

    //   return { fieldsData: newArray };
    // });
  };

  validateInputFields = (e) => {
    // e.preventDefault();
    // let allOk = true;
    // // ----------teacher name validetion-------------------
    // let nameTeacherMess = nameValidation(this.state.teacherName);
    // if (nameTeacherMess.length !== 0) {
    //   this.setState((prevState) => {
    //     prevState.teacherNameError.toShow = "inline-block";
    //     prevState.teacherNameError.mess = nameTeacherMess;
    //     return { teacherNameError: prevState.teacherNameError };
    //   });
    //   allOk = false;
    // } else {
    //   this.setState({ teacherNameError: { toShow: "none", mess: "" } });
    //   allOk = true;
    // }
    // // ----------school name validetion-------------------
    // let nameSchoolMess = mustInputValidation(this.state.schoolName);
    // if (nameSchoolMess.length !== 0) {
    //   this.setState((prevState) => {
    //     prevState.schoolNameError.toShow = "inline-block";
    //     prevState.schoolNameError.mess = nameSchoolMess;
    //     return { schoolNameError: prevState.schoolNameError };
    //   });
    //   allOk = false;
    // } else {
    //   this.setState({ schoolNameError: { toShow: "none", mess: "" } });
    //   allOk = true;
    // }
    // //------------email validation---------------
    // let emailMess = emailValidation(this.state.email);
    // if (emailMess.length !== 0) {
    //   this.setState((prevState) => {
    //     prevState.emailNameError.toShow = "inline-block";
    //     prevState.emailNameError.mess = emailMess;
    //     return { emailNameError: prevState.emailNameError };
    //   });
    //   allOk = false;
    // } else {
    //   this.setState({ emailNameError: { toShow: "none", mess: "" } });
    //   allOk = true;
    // }
    // // ----------password validetion-------------------
    // let passwordMess = passwordValidation(this.state.password);
    // if (passwordMess.length !== 0) {
    //   this.setState((prevState) => {
    //     prevState.passwordNameError.toShow = "inline-block";
    //     prevState.passwordNameError.mess = passwordMess;
    //     return { passwordNameError: prevState.passwordNameError };
    //   });
    //   allOk = false;
    // } else {
    //   this.setState({ passwordNameError: { toShow: "none", mess: "" } });
    //   allOk = true;
    // }


    // //after all the validetion we need to send the data to sql
    // if (allOk) {
    //   this.props.history.goBack(); // after saving go back
    // }
  };

  render() {
      return (
        <>
          <div className="pageContainer withMenu">
            <WhiteBar />
            <div>
              <form className='formData'>
                {/* מורה */}
                <label className='labelFields'>
                  שם המורה:
                    </label>
                <p className='error' style={{ display: this.state.teacherNameError.toShow }}>{this.state.teacherNameError.mess}</p>
                <input
                  className='inputFields'
                  type="text"
                  placeholder="הכנס את שם המורה..."
                  onBlur={this.saveTeacherName}
                  value={this.state.teacherName}
                  readOnly={true}
                />

                {/* בית ספר */}
                <label className='labelFields'>
                  בית ספר:
                    </label>
                <p className='error' style={{ display: this.state.schoolNameError.toShow }}>{this.state.schoolNameError.mess}</p>
                {console.log('this.state.schoolName   ', this.state.schoolName)}
                <Select
                  className='selectStyle'
                  onChange={this.saveSchoolName}
                  options={this.schoolOptions}
                  styles={SelectStyle()}
                  placeholder={this.state.schoolName}
                  // defaultValue={{ value: "schoolName", label: String(this.state.schoolName) }}
                  // native={true}
                  isDisabled={true}
                />
                {/* כיתה */}
                <label className='labelFields'>כיתה:</label>
                <div>
                  {this.state.fieldsData.map((fieldObj) => {
                    return (
                      <ClassSelection
                        key={fieldObj.id}
                        id={fieldObj.id}
                        removal={this.triggerRemoval}
                        saveValue={this.saveValue}
                        options={this.classOptions}
                        onChange={this.saveChange}
                        reading={true}
                        defaultValue={fieldObj.value}
                      />
                    );
                  })}
                </div>
              </form >
              {/* הוספת כיתה */}
              <div
                style={{ marginRight: '9vw' }}
                className='addSomethingNew'
                onClick={this.addNewFieldData}
              >
                <img className='addIcon' src={addicon} alt="addIcon"></img>
                <p className='addTitle'>הוסף כיתה</p>
              </div>
              <form className='formData' style={{ marginTop: '0' }}>
                {/* אימייל */}
                <label className='labelFields'>
                  אימייל:
                    </label>
                <p className='error' style={{ display: this.state.emailNameError.toShow }}>{this.state.emailNameError.mess}</p>
                <input
                  className='inputFields'
                  onBlur={this.saveEmail}
                  type="text"
                  placeholder="הכנס כתובת מייל..."
                  readOnly={true}
                  value={this.state.email}
                />
                {/* סיסמא */}
                <label className='labelFields'>
                  סיסמא:
                    </label>
                <p className='error' style={{ display: this.state.passwordNameError.toShow }}>{this.state.passwordNameError.mess}</p>
                <input
                  className='inputFields'
                  onBlur={this.savePassword}
                  type="text"
                  placeholder="הכנס סיסמא..."
                  readOnly={true}
                />
              </form>

              {/* <div className='spacerFromSaveButton'></div>
              <div className='saveButtonBackground'>
                <button className="saveButton" onClick={this.validateInputFields}>
                  שמור
                  </button>
              </div> */}
            </div>
          </div>
        </>
      );
    }
}



const mapContextToProps = {
  teachers: teachersContext,
  errorMsg: errorMsgContext
};

export default withContext(mapContextToProps)(observer(withRouter(EditTeacher)));