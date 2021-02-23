import React from "react";
import Select from "react-select";
import SelectStyle from "../../style/superAdmin/select_style";
import "../../style/superAdmin/form_style.scss";
import addicon from "../../img/addicon.svg";
import ArrowNavBar from "../../component/superAdmin/ArrowNavBar.jsx";
import { withRouter } from "react-router-dom";
import {
  emailValidation,
  nameValidation,
  studentPasswordValidation,
  mustInputValidation,
} from "../../tools/ValidationFunctions";
import "../../style/superAdmin/class_selection_style.css";
import { errorMsgContext } from "../../stores/error.store";
import { schoolsContext } from "../../stores/schools.store";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";

const axios = require("axios").default;

class AddStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      studentFirstNameError: { toShow: "none", mess: "" },
      studentFirstName: "",
      studentLastNameError: { toShow: "none", mess: "" },
      studentLastName: "",
      userNameError: { toShow: "none", mess: "" },
      userName: "",
      passwordError: { toShow: "none", mess: "" },
      password: "",
      schoolNameError: { toShow: "none", mess: "" },
      school: "",
      schoolId: 0,
      chosenClasses: [],
      allClasses: [],
    };
    this.allSchools = ["עשה חיל", "בית ספר עם שם אחר"];
  }
  componentDidMount = async () => {
    await this.props.schools.getAllSchoolsNames();
    if (!this.props.schools.successGettingSchools) {
      this.props.errorMsg.setErrorMsg(
        "הייתה שגיאה בשרת. לא ניתן לקבל בתי ספר מהשרת."
      );
    } else {
      this.allSchools = this.props.schools.schoolsNames.map((school) => {
        return school.name
      })
    }
  }


  //Return the classes list as list of object for the Select.
  makeClassesOption = (indexSelect) => {
    let options = [];
    this.state.allClasses.map((classData) => {
      if (
        this.state.chosenClasses.filter((chosenClassData) => {
          return chosenClassData.name === classData.name;
        }).length === 0
      ) {
        options.push({
          value: classData.name,
          label: classData.name,
          classIndex: indexSelect,
          id: classData.id,
        });
      }
    });
    return options;
  };

  returnClassesSelections = () => {
    let classesSelections = [];
    for (let i = 0; i < this.state.chosenClasses.length; i++) {
      classesSelections.push(
        <div key={this.state.chosenClasses[i].id} className="classSelection">
          <Select
            className="classSelectionInAddTecher"
            styles={SelectStyle()}
            options={this.makeClassesOption(i)}
            onChange={this.chooseClass}
            defaultValue={{
              value: this.state.chosenClasses[i].name,
              label: this.state.chosenClasses[i].name,
            }}
          />
          <img
            className="removeFieldIcon"
            onClick={() => this.removeClass(i)}
            src="/icons/delete.svg"
          />
        </div>
      );
    }
    return classesSelections;
  };

  addClassSelection = () => {
    this.setState((prevState) => {
      prevState.chosenClasses.push({
        id: -1 * prevState.chosenClasses.length,
        name: "שייך לכיתה",
      });
      return { chosenClasses: prevState.chosenClasses };
    });
  };

  chooseClass = (e) => {
    this.setState((prevState) => {
      prevState.chosenClasses[e.classIndex] = { id: e.id, name: e.value };
      return { chosenClasses: prevState.chosenClasses };
    });
  };

  removeClass = (classIndex) => {
    this.setState((prevState) => {
      let tempData = [...prevState.chosenClasses];
      tempData.splice(classIndex, 1);
      return { chosenClasses: tempData };
    });
  };

  //Return the schools list as list of object for the Select.
  makeSchoolOption = (indexSelect) => {
    let options = [];
    this.allSchools.map((nameSchool) => {
      if (nameSchool !== this.state.school) {
        options.push({
          value: nameSchool,
          label: nameSchool,
          SchoolIndex: indexSelect,
        });
      }
    });
    return options;
  };

  chooseSchool = async (e) => {
    let chosenScoolId = (this.props.schools.schoolsNames.filter((school) => {
      return school.name === e.value
    }))[0]
    const { data } = await axios.get("/api/classroom/getSchoolClasses", {
      params: { schoolId: chosenScoolId.id },
    });
    this.setState({ school: e.value, allClasses: data, schoolId: chosenScoolId.id });
    // this.setState({ school: e.value });

  };

  //saves changes in entered data to the state
  handlechanges = (e) => {
    let updateData = e.target;
    this.setState((prevState) => {
      prevState[updateData.name] = updateData.value;
      return { [updateData.name]: prevState[updateData.name] };
    });
  };

  //when clicking on save we first validate the information
  saveButton = async (e) => {
    e.preventDefault();
    let allOk = true;
    /* data validation  */
    // ----------student name validation-------------------
    let studentFirstNameErrorMess = nameValidation(this.state.studentFirstName);
    if (studentFirstNameErrorMess.length !== 0) {
      this.setState((prevState) => {
        prevState.studentFirstNameError.toShow = "block";
        prevState.studentFirstNameError.mess = studentFirstNameErrorMess;
        return { studentFirstNameError: prevState.studentFirstNameError };
      });
      allOk = false;
    } else {
      this.setState({ studentFirstNameError: { toShow: "none", mess: "" } });
    }
    let studentLastNameErrorMess = nameValidation(this.state.studentLastName);
    if (studentLastNameErrorMess.length !== 0) {
      this.setState((prevState) => {
        prevState.studentLastNameError.toShow = "block";
        prevState.studentLastNameError.mess = studentLastNameErrorMess;
        return { studentLastNameError: prevState.studentLastNameError };
      });
      allOk = false;
    } else {
      this.setState({ studentLastNameError: { toShow: "none", mess: "" } });
    }

    // ----------user name validation-------------------
    let userNameErrorMess = emailValidation(this.state.userName);
    if (userNameErrorMess.length !== 0) {
      this.setState((prevState) => {
        prevState.userNameError.toShow = "block";
        prevState.userNameError.mess = userNameErrorMess;
        return { userNameError: prevState.userNameError };
      });
      allOk = false;
    } else {
      this.setState({ userNameError: { toShow: "none", mess: "" } });
    }

    // ---------------password validation-------------------
    let passwordErrorMess = studentPasswordValidation(this.state.password);
    console.log('this.state.password: ', this.state.password);
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

    // ---------------school name validation-------------------
    let schoolNameErrorMess = mustInputValidation(this.state.school);
    if (schoolNameErrorMess.length !== 0) {
      this.setState((prevState) => {
        prevState.schoolNameError.toShow = "block";
        prevState.schoolNameError.mess = schoolNameErrorMess;
        return { schoolNameError: prevState.schoolNameError };
      });
      allOk = false;
    } else {
      this.setState({ schoolNameError: { toShow: "none", mess: "" } });
    }

    //after all the validation we need to send the data to sql
    if (allOk) {
      try {
        await axios.post("/api/student/register", {
          username: this.state.userName,
          password: this.state.password,
          firstName: this.state.studentFirstName,
          lastName: this.state.studentLastName,
          classrooms: this.state.chosenClasses,
          schoolId: this.state.schoolId
        });
        this.props.history.goBack(); // after saving go back
      } catch (err) {
        console.log("save student error: ", err);
      }
    }
  };

  render() {
    return (
      <div className='withMenu'>
        <ArrowNavBar />
        <form className="formData">
          <label for="studentFirstName" className="labelFields">
            שם פרטי:
          </label>
          <p
            className="error"
            style={{ display: this.state.studentFirstNameError.toShow }}
          >
            {this.state.studentFirstNameError.mess}
          </p>
          <input
            className="inputFields"
            value={this.state.studentName}
            onChange={this.handlechanges}
            placeholder="הכנס את שם התלמיד..."
            name="studentFirstName"
          ></input>

          <label for="studentLastName" className="labelFields">
            שם משפחה:
          </label>
          <p
            className="error"
            style={{ display: this.state.studentLastNameError.toShow }}
          >
            {this.state.studentLastNameError.mess}
          </p>
          <input
            className="inputFields"
            value={this.state.studentName}
            onChange={this.handlechanges}
            placeholder="הכנס את שם התלמיד..."
            name="studentLastName"
          ></input>

          <label for="userName" className="labelFields">
            שם משתמש:
          </label>
          <p
            className="error"
            style={{ display: this.state.userNameError.toShow }}
          >
            {this.state.userNameError.mess}
          </p>
          <input
            className="inputFields"
            value={this.state.userName}
            onChange={this.handlechanges}
            placeholder="הכנס שם משתמש"
            name="userName"
          ></input>

          {/* <label for="password" className="labelFields">
            סיסמא:
          </label>
          <p
            className="error"
            style={{ display: this.state.passwordError.toShow }}
          >
            {this.state.passwordError.mess}
          </p>
          <input
            className="inputFields"
            value={this.state.password}
            onChange={this.handlechanges}
            type="password"
            placeholder="הכנס סיסמא"
            name="password"
          ></input> */}

          <label className="labelFields">בית ספר:</label>
          <p
            className="error"
            style={{ display: this.state.schoolNameError.toShow }}
          >
            {this.state.schoolNameError.mess}
          </p>
          <Select
            className="selectStyle"
            placeholder="בחר..."
            styles={SelectStyle()}
            options={this.makeSchoolOption()}
            onChange={this.chooseSchool}
            placeholder="שייך לבית ספר"
          />

          {this.state.school.length === 0 ? <></> :
            <>
              <label className="labelFields">כיתה:</label>
              {this.returnClassesSelections()}

              <div className="addSomethingNew" onClick={this.addClassSelection}>
                <img className="addIcon" src={addicon} alt="add icon"></img>
                <p className="addTitle">הוסף כיתה</p>
              </div>
            </>
          }
        </form>

        <div className="spacerFromSaveButton"></div>
        <div className="saveButtonBackground">
          <button className="saveButton" onClick={this.saveButton}>
            שמור
          </button>
        </div>
      </div>
    );
  }
}

const mapContextToProps = {
  schools: schoolsContext,
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(observer(withRouter(AddStudent)));
