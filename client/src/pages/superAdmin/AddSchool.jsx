import React from "react";
import ArrowNavBar from "../../component/superAdmin/ArrowNavBar.jsx";
import ClassData from "../../component/superAdmin/SchoolClassData.jsx";
import "../../style/superAdmin/form_style.scss";
import { withRouter } from "react-router-dom";
import { nameValidation, classNameValidation } from '../../tools/ValidationFunctions'


class AddSchool extends React.Component {
  constructor(props) {
    super();
    this.state = {
      schoolNameError: { toShow: "none", mess: "" },
      schoolName: "",
      //List of all the classes in the school. The numTeachers represent the number of teachers in the class.
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
          numTeachers: 1,
          chosenTeachers: [],
          classNameError: { toShow: "none", mess: "" },
        },
      ];
      return { classes: tempData };
    });
  };

  //Need to change and update the class name.
  //It's called when the user change the value.
  chooseTeacher = (e) => {
    let index = e.name;
    let value = e.value;
    let selectKey = e.selectKey;
    let id = e.id;
    this.setState((prevState) => {
      let tempData = [...prevState.classes];
      tempData[index].chosenTeachers[selectKey] = { id: id, name: value };
      return { classes: tempData };
    });
  };

  //Get the element and set the schoolName by the user type.
  handleChange = (e) => {
    if (e.target.name === "schoolName") {
      this.setState({ schoolName: e.target.value });
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

  addTeacherToClass = (classIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.classes];
      tempData[classIndex].chosenTeachers.push({
        id: -1 * tempData[classIndex].chosenTeachers.length,
        name: "בחר...",
      }); //id -1 did not exist and he wont show him
      return { classes: tempData };
    });
  };

  removeTeacherFromClass = (classIndex, teacherIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.classes];
      tempData[classIndex].chosenTeachers.splice(teacherIndex, 1);
      return { classes: tempData };
    });
  };

  removeClass = (classIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.classes];
      tempData.splice(classIndex, 1);
      return { classes: tempData };
    });
  };

  saveData = (e) => {
    e.preventDefault();
    let allOk = true;
    /* data validetion  */
    // ----------school name validetion-------------------
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

    // ----------classes name validetion-------------------
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
      this.props.history.goBack(); // after saving go back
    }
  };

  render() {
    return (
      <div>
        <ArrowNavBar />
        <form className='formData'>
            <label for="schoolName" className='labelFields'>
              שם בית ספר:
            </label>
            <p
              class="error"
              style={{ display: this.state.schoolNameError.toShow }}
            >
              {this.state.schoolNameError.mess}
            </p>
            <input
            className='inputFields'
              value={this.state.schoolName} //The input will show schoolName.
              name="schoolName"
              onChange={this.handleChange} //In charge of on the set state of schoolName.
            ></input>

            <label for="schoolClasses" className='labelFields'>
              כיתות:
            </label>

            {
              //Passes on all the classes in the list and make them the class component with the name and the teacher's selects.
              this.state.classes.map((classData, classIndex) => {
                //The component get the class data as props.classData.
                return (
                  <ClassData
                    key={classData.id}
                    canAddExistTeacher={false}
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
            }
            <button
              type="button"
              className='editSchoolAddClass'
              onClick={this.addClassToSchool} //Add class to the list.
            >
              הוסף כיתה
            </button>
          <button className="saveButton" onClick={this.saveData}>
            שמור
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(AddSchool);
