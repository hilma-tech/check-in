import React from "react";
import ArrowNavBar from "../../component/superAdmin/ArrowNavBar.jsx";
import "../../style/superAdmin/form_style.scss";
import { withRouter } from "react-router-dom";
import {
  nameValidation,
  classNameValidation,
  schoolNameValidation,
} from "../../tools/ValidationFunctions";
import SchoolClassData from "../../component/superAdmin/SchoolClassData.jsx";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";
import { schoolsContext } from "../../stores/schools.store.js";
import { errorMsgContext } from "../../stores/error.store.js";
import { Axios, EmptMsg, HideStyle, ShowStyle } from "../../tools/GlobalVarbs.js";
import { fadeMsgContext } from "../../stores/fadeMsg.store.js";

class AddSchool extends React.Component {
  constructor() {
    super();
    this.state = {
      schoolNameError: { toShow: HideStyle, mess: EmptMsg },
      schoolCityError: {toShow: HideStyle, mess: EmptMsg},
      schoolName: "",
      schoolCity: "",
      addedClass:false,
      //List of all the classes in the school.
      classes: [],
      existTeachers: []
    };
  }
  /*
      Get e, prevent refresh and take the classes in state, 
      copy the array to add a default class and setstate with new array
    */
  addClassToSchool = (e) => {
    e.preventDefault();
    this.setState({addedClass:true})
    this.setState((prevState) => {
      let tempData = [
        ...prevState.classes,
        {
          id: prevState.classes.length + 1,
          name: "",
          // numTeachers: 0,
          chosenTeachers: [],
          // existChosenTeachers: [],
          classNameError: { toShow: HideStyle, mess: EmptMsg },
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
  //     tempData[index].existChosenTeachers[selectKey] = { id: id, name: value };
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
  addExistTeacherToClass = (classIndex, teacherInfo) => {
    this.setState((prevState) => {
      let tempData = [...prevState.classes];
      tempData[classIndex].chosenTeachers.push(teacherInfo); //id -1 did not exist and he wont show him
      return { classes: tempData };
    });
  };

    //כשמו כן הוא
  addNewTeacherToClass = async (classIndex, teacherInfo) => {
    try{
      let {data} = await Axios.post("/api/teacher/isTeacherExist", {email: teacherInfo.email});
      if(data){
        return "** כתובת אימל כבר קיימת, אנא נסה כתובת אחרת **"
      } else {
        this.setState((prevState) => {
          let tempData = [...prevState.classes];
          teacherInfo.id = prevState.existTeachers[prevState.existTeachers.length - 1] === undefined ? 1 : prevState.existTeachers[prevState.existTeachers.length - 1].id + 1
          tempData[classIndex].chosenTeachers.push(teacherInfo); //id -1 did not exist and he wont show him
          prevState.existTeachers.push(teacherInfo)
          return { classes: tempData, existTeachers: prevState.existTeachers };
        });
        return ""
      }
    } catch(err){
      this.props.errorMsg.setErrorMsg('שגיאה בשרת, מורה לא נשמר.');
      return ""
    }
  };

  //כשמו כן הוא
  removeTeacherFromClass = (classIndex, teacherIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.classes];
      tempData[classIndex].chosenTeachers.splice(teacherIndex, 1);
      return { classes: tempData };
    });
  };

   //כשמו כן הוא
  //  removeExistTeacherFromClass = (classIndex, teacherIndex) => {
  //   this.setState((prevState) => {
  //     let tempData = [...prevState.classes];
  //     tempData[classIndex].existChosenTeachers.splice(teacherIndex, 1);
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
    let nameSchoolMess = schoolNameValidation(this.state.schoolName);
    if (nameSchoolMess.length !== 0) {
      this.setState((prevState) => {
        prevState.schoolNameError.toShow = ShowStyle;
        prevState.schoolNameError.mess = nameSchoolMess;
        return { schoolNameError: prevState.schoolNameError };
      });
      allOk = false;
    } else {
      this.setState({ schoolNameError: { toShow: HideStyle, mess: EmptMsg } });
    }

    // ----------school city validation-------------------
    let citySchoolMess = nameValidation(this.state.schoolCity);
    if (citySchoolMess.length !== 0) {
      this.setState((prevState) => {
        prevState.schoolCityError.toShow = ShowStyle;
        prevState.schoolCityError.mess = citySchoolMess;
        return { schoolCityError: prevState.schoolCityError };
      });
      allOk = false;
    } else {
      this.setState({ schoolCityError: { toShow: HideStyle, mess: EmptMsg } });
    }

    // ----------classes name validation-------------------
    for (let i = 0; i < this.state.classes.length; i++) {
      let nameClassMess = classNameValidation(this.state.classes[i].name);
      if (nameClassMess.length !== 0) {
        this.setState((prevState) => {
          prevState.classes[i].classNameError.toShow = ShowStyle;
          prevState.classes[i].classNameError.mess = nameClassMess;
          return { classes: prevState.classes };
        });
        allOk = false;
      } else {
        for(let z=0; z<i;z++){
          if(this.state.classes[i].name === this.state.classes[z].name){
            nameClassMess = "** שם כיתה זה כבר קיים. אנא נסה שם אחר. **"
          }
        }
        if (nameClassMess.length !== 0) {
          this.setState((prevState) => {
            prevState.classes[i].classNameError.toShow = ShowStyle;
            prevState.classes[i].classNameError.mess = nameClassMess;
            return { classes: prevState.classes };
          });
          allOk = false;
        } else{
          this.setState((prevState) => {
            prevState.classes[i].classNameError.toShow = HideStyle;
            prevState.classes[i].classNameError.mess = EmptMsg;
            return { classes: prevState.classes };
          });
        }
      }
    }

    //after all the validation we need to send the data to sql
    if (allOk) {
      try {
        let { data } = await Axios.post("/api/school/addSchool", 
        {
          schoolName: this.state.schoolName,
          schoolCity: this.state.schoolCity,
          classes: this.state.classes,
          existTeachers: this.state.existTeachers
        }
        );
        if (data) {
          this.props.schools.addSchool({
            city: this.state.schoolCity,
            name: this.state.schoolName,
            id: data.id,
            teachers: data.teachers
          })
      this.props.history.goBack(); // after saving go back
      this.props.fadeMsg.setFadeMsg("בית ספר נשמר בהצלחה")
    }
  } catch (err) {
    this.props.errorMsg.setErrorMsg('שגיאה בשרת, בית הספר לא נשמר, נסו שוב.');
  }};}

  render() {
    
    return (
      <div className="withMenu">
        <ArrowNavBar />
        <form className="formData">
          <label for="schoolName" className="labelFields">
            * שם בית ספר:
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
            placeholder = "הכנס שם בית ספר"
            onBlur={this.handleChange} //In charge of on the set state of schoolName.
          ></input>
          <label for="schoolCity" className="labelFields">
            * עיר:
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
            placeholder="הכנס עיר"
            onBlur={this.handleChange} //In charge of on the set state of schoolCity.
          ></input>

          <label for="schoolClasses" className="labelFields">
            כיתות:
          </label>

          {
            //Passes on all the classes in the list and make them the class component with the name and the teacher's selects.
            this.state.classes.map((classData, classIndex) => {
              console.log('classIndex: ', classIndex);
              //The component get the class data as props.classData.
              return (
                <SchoolClassData
                  key={classData.id}
                  classData={classData}
                  classIndex={classIndex}
                  addedClass={this.state.addedClass}
                  classDataLength={this.state.classes.length}
                  handleChange={this.handleChange}
                  removeClass={this.removeClass}
                  // canAddExistTeacher={false}
                  addNewTeacherToClass={this.addNewTeacherToClass}
                  removeTeacherFromClass={this.removeTeacherFromClass}
                  addExistTeacherToClass={this.addExistTeacherToClass}
                  // removeExistTeacherFromClass={this.removeExistTeacherFromClass}
                  // chooseTeacher={this.chooseTeacher}
                  existTeachers={this.state.existTeachers}
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
          <div className="saveButtonBackground additionPage">
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
  fadeMsg: fadeMsgContext,
};

export default withContext(mapContextToProps)(observer(withRouter(AddSchool)));
