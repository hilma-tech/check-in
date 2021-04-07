import React from "react";
import ArrowNavBar from "../../component/superAdmin/ArrowNavBar.jsx";
import "../../style/superAdmin/form_style.scss";
import { withRouter } from "react-router-dom";
import {
  nameValidation,
  classNameValidation,
} from "../../tools/ValidationFunctions";
import SchoolClassData from "../../component/superAdmin/SchoolClassData.jsx";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
import { schoolsContext } from "../../stores/schools.store.js";
import { errorMsgContext } from "../../stores/error.store.js";
const axios = require("axios").default;


class AddSchool extends React.Component {
  constructor() {
    super();
    this.state = {
      schoolNameError: { toShow: "none", mess: "" },
      schoolCityError: {toShow: "none", mess: ""},
      schoolName: "",
      schoolCity: "",
      //List of all the classes in the school.
      classes: [],
    };
  }
  /*
      Get e, prevent refresh and take the classes in state, 
      copy the array to add a default class and setstate with new array
    */
  addClassToSchool = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      let tempData = [
        ...prevState.classes,
        {
          id: prevState.classes.length + 1,
          name: "",
          // numTeachers: 0,
          // chosenTeachers: [],
          classNameError: { toShow: "none", mess: "" },
        },
      ];
      return { classes: tempData };
    });
  };

  //Need to change and update the class name.
  //It's called when the user change the value.
  // chooseTeacher = (e) => {
  //   let index = e.name;
  //   let value = e.value;
  //   let selectKey = e.selectKey;
  //   let id = e.id;
  //   this.setState((prevState) => {
  //     let tempData = [...prevState.classes];
  //     tempData[index].chosenTeachers[selectKey] = { id: id, name: value };
  //     return { classes: tempData };
  //   });
  // };

  //Get the element and set the schoolName by the user type.
  handleChange = (e) => {
    if (e.target.name === "schoolName" || e.target.name === "schoolCity") {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      let [fieldChangeName, classChangeIndex] = e.target.name.split("_");
      let classNameValue = e.target.value;
      this.setState((prevState) => {
        let tempData = [...prevState.classes];
        tempData[parseInt(classChangeIndex)][fieldChangeName] = classNameValue;
        return { classes: tempData };
      });
    }
  };

  //כשמו כן הוא
  // addTeacherToClass = (classIndex) => {
  //   this.setState((prevState) => {
  //     let tempData = [...prevState.classes];
  //     tempData[classIndex].chosenTeachers.push({
  //       id: -1 * tempData[classIndex].chosenTeachers.length,
  //       name: "בחר...",
  //     }); //id -1 did not exist and he wont show him
  //     return { classes: tempData };
  //   });
  // };

  //כשמו כן הוא
  // removeTeacherFromClass = (classIndex, teacherIndex) => {
  //   this.setState((prevState) => {
  //     let tempData = [...prevState.classes];
  //     tempData[classIndex].chosenTeachers.splice(teacherIndex, 1);
  //     return { classes: tempData };
  //   });
  // };

  //כשמו כן הוא
  removeClass = (classIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.classes];
      tempData.splice(classIndex, 1);
      return { classes: tempData };
    });
  };

  //right before adding the data to DB we validate the information
  validateData = async (e) => {
    e.preventDefault();
    let allOk = true;
    /* data validation  */
    // ----------school name validation-------------------
    let nameSchoolMess = nameValidation(this.state.schoolName);
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

    // ----------school city validation-------------------
    let citySchoolMess = nameValidation(this.state.schoolCity);
    if (citySchoolMess.length !== 0) {
      this.setState((prevState) => {
        prevState.schoolCityError.toShow = "inline-block";
        prevState.schoolCityError.mess = citySchoolMess;
        return { schoolCityError: prevState.schoolCityError };
      });
      allOk = false;
    } else {
      this.setState({ schoolCityError: { toShow: "none", mess: "" } });
      allOk = true;
    }

    // ----------classes name validation-------------------
    for (let i = 0; i < this.state.classes.length; i++) {
      let nameClassMess = classNameValidation(this.state.classes[i].name);
      if (nameClassMess.length !== 0) {
        this.setState((prevState) => {
          prevState.classes[i].classNameError.toShow = "inline-block";
          prevState.classes[i].classNameError.mess = nameClassMess;
          return { classes: prevState.classes };
        });
        allOk = false;
      } else {
        this.setState((prevState) => {
          prevState.classes[i].classNameError.toShow = "none";
          prevState.classes[i].classNameError.mess = "";
          return { classes: prevState.classes };
        });
        allOk = true;
      }
    }

    //after all the validation we need to send the data to sql
    if (allOk) {
      try {
        let { data } = await axios.post("/api/school/addSchool", {
          info: this.state
          // username: this.state.userName,
          // password: this.state.password,
          // firstName: this.state.schoolFirstName,
          // lastName: this.state.schoolLastName,
          // classrooms: this.state.chosenClasses.filter((classroom)=>{
            //   return classroom.name !== 'שייך לכיתה'
            // }),
            // schoolId: this.state.schoolId
          });
        if (data) {
          this.props.schools.addSchool({
            city: this.state.schoolCity,
            name: this.state.schoolName,
            id: data.id,
          })
      this.props.history.goBack(); // after saving go back
    }
  } catch (err) {
    // console.log('err: ', err);
    this.props.errorMsg.setErrorMsg('שגיאה בשרת, בית הספר לא נשמר, נסו שוב.');
  }};}

  render() {
    
    return (
      <div className="withMenu">
        <ArrowNavBar />
        <form className="formData">
          <label for="schoolName" className="labelFields">
            שם בית ספר:
          </label>
          <p
            className="error"
            style={{ display: this.state.schoolNameError.toShow }}
          >
            {this.state.schoolNameError.mess}
          </p>
          <input
            className="inputFields"
            defaultValue={this.state.schoolName} //The input will show schoolName.
            name="schoolName"
            onBlur={this.handleChange} //In charge of on the set state of schoolName.
          ></input>
          <label for="schoolCity" className="labelFields">
            עיר:
          </label>
          <p
            className="error"
            style={{ display: this.state.schoolCityError.toShow }}
          >
            {this.state.schoolCityError.mess}
          </p>
          <input
            className="inputFields"
            defaultValue={this.state.schoolCity} //The input will show schoolCity.
            name="schoolCity"
            onBlur={this.handleChange} //In charge of on the set state of schoolCity.
          ></input>

          <label for="schoolClasses" className="labelFields">
            כיתות:
          </label>

          {
            //Passes on all the classes in the list and make them the class component with the name and the teacher's selects.
            this.state.classes.map((classData, classIndex) => {
              //The component get the class data as props.classData.
              return (
                <SchoolClassData
                  key={classData.id}
                  classData={classData}
                  classIndex={classIndex}
                  handleChange={this.handleChange}
                  removeClass={this.removeClass}
                  // canAddExistTeacher={false}
                  // addTeacherToClass={this.addTeacherToClass}
                  // chooseTeacher={this.chooseTeacher}
                  // removeTeacherFromClass={this.removeTeacherFromClass}
                />
              );
            })
          }
          <button
            type="button"
            className="editSchoolAddClass"
            onClick={this.addClassToSchool} //Add class to the list.
          >
            הוסף כיתה
          </button>

          <div className="spacerFromSaveButton"></div>
          <div className="saveButtonBackground">
            <button className="saveButton" onClick={this.validateData}>
              שמור
            </button>
          </div>
        </form>
      </div>
    );
  }}


const mapContextToProps = {
  schools: schoolsContext,
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(observer(withRouter(AddSchool)));
