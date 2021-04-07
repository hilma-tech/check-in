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
import {
  nameValidation,
  classNameValidation,
} from "../../tools/ValidationFunctions";

const axios = require("axios").default;

class EditSchool extends Component {
  constructor() {
    super();
    this.state = {
      schoolNameError: { toShow: "none", mess: "" },
      schoolName: "",
      schoolCityError: { toShow: "none", mess: "" },
      schoolCity: "",
      //List of all the classes in the school. The numTeachers represent the number of teachers in the class.
      classes: [],
      removedClasses: [],
      existClasses: []
    };
  }

  componentDidMount() {
    if (this.props.schools.chosenSchool.classrooms === undefined) {
      this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת, אנא נסו שנית')
    } else {
      this.setState({
        schoolName: this.props.schools.chosenSchool.name,
        schoolCity: this.props.schools.chosenSchool.city,
        classes: this.props.schools.chosenSchool.classrooms,
        existClasses: this.props.schools.chosenSchool.classrooms,
      });
    }
  }


  deleteSchool = (e) => {
    e.preventDefault();
    let success = this.props.schools.deleteSchool()
    if (success) {
      // this.props.history.replace('https://www.youtube.com/watch?v=4G6QDNC4jPs');
      this.props.history.goBack();
    } else {
      this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת, לא היה ניתן למחוק את בית הספר.')
    }
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
          id: prevState.classes.length !== 0 ? prevState.classes[prevState.classes.length - 1].id + 1 : 1,
          name: '',
          numTeachers: 1,
          chosenTeachers: [],
          classNameError: { toShow: 'none', mess: '' },
        },
      ];
      return { classes: tempData };
    });
  };

  //Need to change but update the class name.
  //It's call when the user change the value.
  chooseTeacher = (e) => {
    let index = e.name
    let value = e.value;
    let selectKey = e.selectKey;
    let id = e.id;
    this.setState((prevState) => {
      let tempData = [...prevState.classes]
      tempData[index].chosenTeachers[selectKey] = { id: id, name: value }
      return { classes: tempData }
    })
  };

  //Get the element and set the schoolName by the info that the user type.
  handleChange = (e) => {
    if (e.target.name === 'schoolName') {
      this.setState({ schoolName: e.target.value });
    } else if (e.target.name === 'schoolCity') {
      this.setState({ schoolCity: e.target.value });
    } else {
      let [fieldChangeName, classChangeIndex] = e.target.name.split('_')
      let classNameValue = e.target.value;
      this.setState((prevState) => {
        let tempData = [...prevState.classes]
        tempData[parseInt(classChangeIndex)][fieldChangeName] = classNameValue
        return { classes: tempData }
      })
    }
  };

  addTeacherToClass = (classIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.classes]
      tempData[classIndex].chosenTeachers.push({ id: -1 * tempData[classIndex].chosenTeachers.length, name: 'בחר...' }) //id -1 did not exist and he wont show him
      return { classes: tempData }
    })
  };

  removeTeacherFromClass = (classIndex, teacherIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.classes]
      tempData[classIndex].chosenTeachers.splice(teacherIndex, 1)
      return { classes: tempData }
    })
  };

  removeClass = (classIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.classes]
      let removedClassroom = tempData.splice(classIndex, 1);
      prevState.removedClasses.push(removedClassroom[0])
      return { classes: tempData, removedClasses: prevState.removedClasses }
    })
  };

  saveData = async (e) => {
    e.preventDefault();
    let allOk = true;
    /* data validetion  */
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

    //after all the validetion we need to send the data to sql
    if (allOk) {
      console.log('this.state: ', this.state);
      try {
        let { data } = await axios.post("/api/school/editSchool", {
          info: {
            id: this.props.schools.chosenSchool.id,
            schoolName: this.state.schoolName,
            schoolCity: this.state.schoolCity,
            classes: this.state.classes,
            removedClasses: this.state.removedClasses,
            existClasses: this.state.existClasses
          }
        });
        console.log('data: ', data);
        // if (data) {
        //   this.props.schools.addSchool({
        //     city: this.state.schoolCity,
        //     name: this.state.schoolName,
        //     id: data.id,
        //   })
        // this.props.history.goBack(); // after saving go back
      } catch (err) {
        this.props.errorMsg.setErrorMsg('שגיאה בשרת, בית הספר לא נשמר, נסו שוב.');
      }
    }
  }


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
          <button
            className='editSchoolAddClass'
            type="button"
            onClick={this.addClassToSchool} //Add class to the list.
          >
            הוסף כיתה
            </button>
          <div className="spacerFromSaveButton"></div>
          <div className="saveButtonBackground">
            <button className="deletButton" onClick={this.deleteSchool}>מחק בית ספר</button>
            <button className="saveButton" onClick={this.saveData}>
              שמור
            </button>
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
