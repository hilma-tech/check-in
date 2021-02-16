import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SchoolClassData from "../../component/superAdmin/SchoolClassData.jsx";
import WhiteBar from "../../component/superAdmin/ArrowNavBar.jsx";
import "../../style/superAdmin/edit_school_style.scss";
import "../../style/superAdmin/form_style.scss";
import "../../style/superAdmin/white_bar_style.css";
import { schoolsContext } from "../../stores/schools.store.js";
import { errorMsgContext } from "../../stores/error.store.js";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";

class EditSchool extends Component {
  constructor() {
    super();
    this.state = {
      schoolNameError: { toShow: "none", mess: "" },
      schoolName: "",
      //List of all the classes in the school. The numTeachers represent the number of teachers in the class.
      classes: [
        {
          id: 1,
          name: "ד'2",
          chosenTeachers: [],
          classNameError: { toShow: "none", mess: "" },
        },
      ],
    };
  }

  componentDidMount() {
    this.setState({
      schoolName: this.props.schools.chosenSchool.name,
      classes: this.props.schools.chosenSchool.classrooms,
    });
  }
  /*
      Get e, prevent refresh and take the classes in state, 
      copy the array to add a default class and setstate with new array
    */
  addClassToSchool = (e) => {
    e.preventDefault();
    // this.setState((prevState) => {
    //   let tempData = [
    //     ...prevState.classes,
    //     {
    //       id: prevState.classes.length + 1,
    //       name: '',
    //       numTeachers: 1,
    //       chosenTeachers: [],
    //       classNameError: { toShow: 'none', mess: '' },
    //     },
    //   ];
    //   return { classes: tempData };
    // });
  };

  //Need to change but update the class name.
  //It's call when the user change the value.
  chooseTeacher = (e) => {
    // let index = e.name
    // let value = e.value;
    // let selectKey = e.selectKey;
    // let id = e.id;
    // this.setState((prevState) => {
    //   let tempData = [...prevState.classes]
    //   tempData[index].chosenTeachers[selectKey] = { id: id, name: value }
    //   return { classes: tempData }
    // })
  };

  //Get the element and set the schoolName by the info that the user type.
  handleChange = (e) => {
    // if (e.target.name === 'schoolName') {
    //   this.setState({ schoolName: e.target.value });
    // } else {
    //   let [fieldChangeName, classChangeIndex] = e.target.name.split('_')
    //   let classNameValue = e.target.value;
    //   this.setState((prevState) => {
    //     let tempData = [...prevState.classes]
    //     tempData[parseInt(classChangeIndex)][fieldChangeName] = classNameValue
    //     return { classes: tempData }
    //   })
    // }
  };

  addTeacherToClass = (classIndex) => {
    // this.setState((prevState) => {
    //   let tempData = [...prevState.classes]
    //   tempData[classIndex].chosenTeachers.push({ id: -1 * tempData[classIndex].chosenTeachers.length, name: 'בחר...' }) //id -1 did not exist and he wont show him
    //   return { classes: tempData }
    // })
  };

  removeTeacherFromClass = (classIndex, teacherIndex) => {
    // this.setState((prevState) => {
    //   let tempData = [...prevState.classes]
    //   tempData[classIndex].chosenTeachers.splice(teacherIndex, 1)
    //   return { classes: tempData }
    // })
  };

  removeClass = (classIndex) => {
    // this.setState((prevState) => {
    //   let tempData = [...prevState.classes]
    //   tempData.splice(classIndex, 1);
    //   return { classes: tempData }
    // })
  };

  saveData = (e) => {
    e.preventDefault();
    let allOk = true;
    /* data validetion  */
    // ----------school name validetion-------------------
    if (this.state.schoolName.length === 0) {
      this.setState((prevState) => {
        prevState.schoolNameError.toShow = "inline-block";
        prevState.schoolNameError.mess = "** חייב להכניס שם בית ספר **";
        return { schoolNameError: prevState.schoolNameError };
      });
      allOk = false;
    } else if (
      /[a-z]/.test(this.state.schoolName) ||
      /[A-Z]/.test(this.state.schoolName) ||
      /[!@#$%^&*()_+=[\]{};:\\|<>/?~`]/.test(this.state.schoolName)
    ) {
      this.setState((prevState) => {
        prevState.schoolNameError.toShow = "inline-block";
        prevState.schoolNameError.mess = "** שם בית הספר לא תקין **";
        return { schoolNameError: prevState.schoolNameError };
      });
      allOk = false;
    } else if (
      this.state.schoolName.includes('"') ||
      this.state.schoolName.includes("'") ||
      this.state.schoolName.includes(".") ||
      this.state.schoolName.includes(",") ||
      this.state.schoolName.includes("-")
    ) {
      if (
        !/[\u0590-\u05FF]+["',-]+[\u0590-\u05FF]/.test(this.state.schoolName) ||
        !/[\u0590-\u05FF]+[.]/.test(this.state.schoolName)
      ) {
        this.setState((prevState) => {
          prevState.schoolNameError.toShow = "inline-block";
          prevState.schoolNameError.mess = "** שם בית הספר לא תקין **";
          return { schoolNameError: prevState.schoolNameError };
        });
        allOk = false;
      }
    } else {
      this.setState({ schoolNameError: { toShow: "none", mess: "" } });
    }

    for (let i = 0; i < this.state.classes.length; i++) {
      if (this.state.classes[i].name.length === 0) {
        this.setState((prevState) => {
          prevState.classes[i].classNameError.toShow = "inline-block";
          prevState.classes[i].classNameError.mess =
            "** חייב להכניס שם של כיתה **";
          return { classes: prevState.classes };
        });
        allOk = false;
      } else if (this.state.classes[i].name.length > 10) {
        this.setState((prevState) => {
          prevState.classes[i].classNameError.toShow = "inline-block";
          prevState.classes[i].classNameError.mess = "** שם הכיתה ארוך מידי **";
          return { classes: prevState.classes };
        });
        allOk = false;
      } else if (
        /[a-z]/.test(this.state.classes[i].name) ||
        /[A-Z]/.test(this.state.classes[i].name) ||
        /[!@#$%^&*()_+,=[\]{};:\\|<>/?~`]/.test(this.state.classes[i].name)
      ) {
        this.setState((prevState) => {
          prevState.classes[i].classNameError.toShow = "inline-block";
          prevState.classes[i].classNameError.mess = "** שם הכיתה לא תקין **";
          return { classes: prevState.classes };
        });
        allOk = false;
      } else if (
        this.state.classes[i].name.includes('"') ||
        this.state.classes[i].name.includes("'") ||
        this.state.classes[i].name.includes(".") ||
        this.state.classes[i].name.includes("-")
      ) {
        if (
          !(
            /[\u0590-\u05FF]+[",-]+[\u0590-\u05FF]/.test(
              this.state.classes[i].name
            ) ||
            /[\u0590-\u05FF]+[']/.test(this.state.classes[i].name) ||
            /[\u0590-\u05FF]+[.]/.test(this.state.classes[i].name)
          )
        ) {
          this.setState((prevState) => {
            prevState.classes[i].classNameError.toShow = "inline-block";
            prevState.classes[i].classNameError.mess = "** שם הכיתה לא תקין **";
            return { classes: prevState.classes };
          });
          allOk = false;
        }
      } else {
        this.setState((prevState) => {
          prevState.classes[i].classNameError.toShow = "none";
          prevState.classes[i].classNameError.mess = "";
          return { classes: prevState.classes };
        });
      }
    }

    //after all the validetion we need to send the data to sql
    if (allOk) {
      this.props.history.goBack(); // after saving go back
    }
  };

  render() {
    return (
      <div className="withMenu">
        <WhiteBar />
        <form className="formData">
          <label for="schoolName" className="labelFields">
            שם בית ספר:
          </label>
          <p
            class="error"
            style={{ display: this.state.schoolNameError.toShow }}
          >
            {this.state.schoolNameError.mess}
          </p>
          <input
            className="inputFields"
            value={this.state.schoolName} //The input will show schoolName.
            name="schoolName"
            onChange={this.handleChange} //In charge of on the set state of schoolName.
            readOnly={true}
          ></input>

          <label className="labelFields" for="schoolClasses">
            כיתות:
          </label>

          {
            //Pass on all the classes in the list and make them the class component (with the name and the teacher's selects).
            this.state.classes.length === 0 ? (
              <p>לבית ספר זה אין כיתות</p>
            ) : (
              this.state.classes.map((classData, classIndex) => {
                //The component get the class data as props.classData.
                return (
                  <SchoolClassData
                    key={classData.id}
                    canAddExistTeacher={true}
                    classData={classData}
                    classIndex={classIndex}
                    addTeacherToClass={this.addTeacherToClass}
                    handleChange={this.handleChange}
                    chooseTeacher={this.chooseTeacher}
                    removeTeacherFromClass={this.removeTeacherFromClass}
                    removeClass={this.removeClass}
                  />
                );
              })
            )
          }
          {/* <button
            className='editSchoolAddClass'
            type="button"
            onClick={this.addClassToSchool} //Add class to the list.
          >
            הוסף כיתה
            </button> */}
          <div className="spacerFromSaveButton"></div>
          <div className="saveButtonBackground">
            {/* <button className="deletButton">מחק בית ספר</button>
            <button className="saveButton" onClick={this.saveData}>
              שמור
            </button>  */}
          </div>
        </form>
      </div>
    );
  }
}

const mapContextToProps = {
  schools: schoolsContext,
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(observer(withRouter(EditSchool)));
