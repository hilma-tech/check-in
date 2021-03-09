import React from "react";
import Select from "react-select";
import SelectStyle from "../../style/superAdmin/select_style";
import "../../style/superAdmin/form_style.scss";
import ArrowNavBar from "../../component/superAdmin/ArrowNavBar.jsx";
import { withRouter } from "react-router-dom";
import "../../style/superAdmin/class_selection_style.css"
import { studentsContext } from "../../stores/students.store";
import { errorMsgContext } from "../../stores/error.store";
import { withContext } from "@hilma/tools";
import { observer } from "mobx-react";

class EditStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      studentNameError: { toShow: "none", mess: "" },
      studentName: "",
      userNameError: { toShow: "none", mess: "" },
      userName: "",
      passwordError: { toShow: "none", mess: "" },
      password: "",
      schoolNameError: { toShow: "none", mess: "" },
      school: "",
      chosenClasses: [],
      allClasses: [
        { id: 1, name: "א'2" },
        { id: 2, name: "ב'2" },
        { id: 3, name: "ג'2" },
      ],
    };
    this.allSchoole = ["עשה חיל", "בית ספר עם שם אחר"];
  }

  componentDidMount() {
    this.setState({
      studentName: this.props.students.chosenStudent.name,
      userName: this.props.students.chosenStudent.username,
      school: this.props.students.chosenStudent.schoolName,
      chosenClasses: this.props.students.chosenStudent.classroomStudent,
    })
  }

  //Return the classes list as list of object for the Select.
  makeClassesOption = (indexSelect) => {
    // let options = [];
    // this.state.allClasses.map((classData) => {
    //   if (
    //     this.state.chosenClasses.filter((chosenClassData) => {
    //       return chosenClassData.name === classData.name;
    //     }).length === 0
    //   ) {
    //     options.push({
    //       value: classData.name,
    //       label: classData.name,
    //       classIndex: indexSelect,
    //       id: classData.id,
    //     });
    //   }
    // });
    // return options;
  };

  returnClassesSelections = () => {
    let classesSelections = [];
    if (this.state.chosenClasses.length === 0) {
      return <p>לתלמיד זה אין כיתות</p>
    }
    for (let i = 0; i < this.state.chosenClasses.length; i++) {
      classesSelections.push(
        <div key={this.state.chosenClasses[i].id} className='classSelection'>
          <Select
            className='classSelectionInAddTecher'
            styles={SelectStyle()}
            options={this.makeClassesOption(i)}
            onChange={this.chooseClass}
            // defaultValue={{
            //   value: this.state.chosenClasses[i].name,
            //   label: this.state.chosenClasses[i].name,
            // }}
            placeholder={this.state.chosenClasses[i].name}
            isDisabled={true}
          />
          {/* <img
          className='removeFieldIcon'
            onClick={() => this.removeClass(i)}
            src="/icons/delete.svg"
          /> */}
        </div>
      );
    }
    return classesSelections;
  };
  addClassOption = () => {
    // this.setState((prevState) => {
    //   prevState.chosenClasses.push({
    //     id: -1 * prevState.chosenClasses.length,
    //     name: "שייך לכיתה",
    //   });
    //   return { chosenClasses: prevState.chosenClasses };
    // });
  };

  chooseClass = (e) => {
    // this.setState((prevState) => {
    //   prevState.chosenClasses[e.classIndex] = { id: e.id, name: e.value };
    //   return { chosenClasses: prevState.chosenClasses };
    // });
  };
  removeClass = (classIndex) => {
    // this.setState((prevState) => {
    //   let tempData = [...prevState.chosenClasses];
    //   tempData.splice(classIndex, 1);
    //   return { chosenClasses: tempData };
    // });
  };
  //Return the schools list as list of object for the Select.
  makeSchoolOption = (indexSelect) => {
    // let options = [];
    // this.allSchoole.map((nameSchool) => {
    //   if (nameSchool !== this.state.school) {
    //     options.push({
    //       value: nameSchool,
    //       label: nameSchool,
    //       SchoolIndex: indexSelect,
    //     });
    //   }
    // });
    // return options;
  };

  chooseSchool = (e) => {
    // this.setState({ school: e.value });
  };

  handlechanges = (e) => {
    // let updateData = e.target;
    // this.setState((prevState) => {
    //   prevState[updateData.name] = updateData.value;
    //   return { [updateData.name]: prevState[updateData.name] };
    // });
  };
  saveButton = (e) => {
    // e.preventDefault();
    // let allOk = true;
    // /* data validetion  */
    // // ----------student name validetion-------------------
    // let studentNameErrorMess = nameValidation(this.state.studentName);
    // if (studentNameErrorMess.length !== 0) {
    //   this.setState((prevState) => {
    //     prevState.studentNameError.toShow = "block";
    //     prevState.studentNameError.mess = studentNameErrorMess;
    //     return { studentNameError: prevState.studentNameError };
    //   });
    //   allOk = false;
    // } else {
    //   this.setState({ studentNameError: { toShow: "none", mess: "" } });
    // }

    // // ----------user name validetion-------------------
    // let userNameErrorMess = userNameValidation(this.state.userName);
    // if (userNameErrorMess.length !== 0) {
    //   this.setState((prevState) => {
    //     prevState.userNameError.toShow = "block";
    //     prevState.userNameError.mess = userNameErrorMess;
    //     return { userNameError: prevState.userNameError };
    //   });
    //   allOk = false;
    // } else {
    //   this.setState({ userNameError: { toShow: "none", mess: "" } });
    // }

    // // ---------------password validetion-------------------
    // let passwordErrorMess = passwordValidation(this.state.password);
    // if (passwordErrorMess.length !== 0) {
    //   this.setState((prevState) => {
    //     prevState.passwordError.toShow = "block";
    //     prevState.passwordError.mess = passwordErrorMess;
    //     return { passwordError: prevState.passwordError };
    //   });
    //   allOk = false;
    // } else {
    //   this.setState({ passwordError: { toShow: "none", mess: "" } });
    // }

    // // ---------------school name validetion-------------------
    // let schoolNameErrorMess = mustInputValidation(this.state.school);
    // if (schoolNameErrorMess.length !== 0) {
    //   this.setState((prevState) => {
    //     prevState.schoolNameError.toShow = "block";
    //     prevState.schoolNameError.mess = schoolNameErrorMess;
    //     return { schoolNameError: prevState.schoolNameError };
    //   });
    //   allOk = false;
    // } else {
    //   this.setState({ schoolNameError: { toShow: "none", mess: "" } });
    // }

    // //after all the validetion we need to send the data to sql
    // if (allOk) {
    //   this.props.history.goBack(); // after saving go back
    // }
  };

  render() {
    return (
      <div>
        <ArrowNavBar />
        <form className='formData'>
          <label for="studentName" className='labelFields withMenu'>שם התלמיד:</label>
          <p
            className="error"
            style={{ display: this.state.studentNameError.toShow }}
          >
            {this.state.studentNameError.mess}
          </p>
          <input
            className='inputFields'
            value={this.state.studentName}
            onChange={this.handlechanges}
            placeholder="הכנס את שם התלמיד..."
            name="studentName"
            readOnly={true}
          ></input>

          <label for="userName" className='labelFields'>שם משתמש:</label>
          <p className="error" style={{ display: this.state.userNameError.toShow }}>
            {this.state.userNameError.mess}
          </p>
          <input
            className='inputFields'
            value={this.state.userName}
            onChange={this.handlechanges}
            placeholder="הכנס שם משתמש"
            name="userName"
            readOnly={true}
          ></input>

          {/* <label for="password" className='labelFields'>סיסמא:</label>
          <p className="error" style={{ display: this.state.passwordError.toShow }}>
            {this.state.passwordError.mess}
          </p>
          <input
          className='inputFields'
            value={this.state.password}
            onChange={this.handlechanges}
            type="password"
            placeholder="הכנס סיסמא"
            name="password"
            readOnly={true}
          ></input> */}

          <label className='labelFields'>בית ספר:</label>
          <p
            className="error"
            style={{ display: this.state.schoolNameError.toShow }}
          >
            {this.state.schoolNameError.mess}
          </p>
          <Select
            className='selectStyle'
            placeholder="בחר..."
            styles={SelectStyle()}
            options={this.makeSchoolOption()}
            onChange={this.chooseSchool}
            placeholder={this.state.school}
            isDisabled={true}
          />

          <label className='labelFields'>כיתה:</label>
          {this.returnClassesSelections()}
          {/* 
          <div
          className='addSomethingNew'
            onClick={this.addClassOption}
          >
            <img className="addIcon" src={addicon} alt="add icon"></img>
            <p className="addTitle">הוסף כיתה</p>
          </div> */}
        </form>

        {/* <div className='spacerFromSaveButton'></div>
          <div className='saveButtonBackground'>
            <button className="saveButton" onClick={this.saveButton}>
              שמור
            </button>
          </div> */}
      </div>
    );
  }
}




const mapContextToProps = {
  students: studentsContext,
  errorMsg: errorMsgContext
};

export default withContext(mapContextToProps)(observer(withRouter(EditStudent)));

