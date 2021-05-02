import React from "react";
import Select from "react-select";
import Fade from "@material-ui/core/Fade";
import SelectStyle from "../../style/superAdmin/select_style";
import { Dialog } from "@material-ui/core";
import AddTeacherPopUp from "./AddTeacherPopUp";
import ChooseExistTeacherPopUp from "./ChooseExistTeacherPopUp";

class SchoolClassData extends React.Component {
  constructor() {
    super();
    this.state = {
      showClass: false,
      showAddNewTeacher: false,
      showAddExistTeacher: false
    };
    this.teachers = [];
    // lists the options given for the teachers to assign to the class
    //Will need to get the list from SQL
  }

  componentDidMount() {
    if (this.props.classDataLength === this.props.classIndex + 1 && this.props.addedClass) {
      this.setState({ showClass: true })
    }
  }
  handleNewTeacherPopUpState = () => {
    this.setState((prevState) => { return { showAddNewTeacher: !prevState.showAddNewTeacher } })
  }

  handleExistTeacherPopUpState = () => {
    this.setState((prevState) => { return { showAddExistTeacher: !prevState.showAddExistTeacher } })
  }

  //Return the teacher list as list of objects for the Select.
  //removes the teachers already chosen from the options
  // makeTeacherOption = (selectKey) => {
  //   let options = [];
  //   this.teachers.map((teacherData) => {
  //     if (
  //       this.props.classData.chosenTeachers.filter((teacher) => {
  //         return teacher.id === teacherData.id;
  //       }).length === 0
  //     ) {
  //       options.push({
  //         value: teacherData.name,
  //         label: teacherData.name,
  //         name: this.props.classIndex,
  //         id: teacherData.id,
  //         selectKey: selectKey,
  //       });
  //     }
  //   });
  //   return options;
  // };

  //Make list of select with the teachers.
  //The length is sent because in the select accessing state doesn't work.
  returnTeacherSelections = () => {
    let teachersSelections = [];
    let numTeachers = this.props.classData.chosenTeachers ? this.props.classData.chosenTeachers.length : 0;
    if (numTeachers === 0) {
      return <p>לכיתה זו אין מורים</p>;
    }
    for (let i = 0; i < numTeachers; i++) {
      let teacerDefaultValue = this.props.classData.chosenTeachers[i].name;
      teachersSelections.push(
        <div
          className="TeachersSelect"
          key={this.props.classData.chosenTeachers[i].id}
        >
          {/* <Select
            className="editSchoolClassTeacherSelect"
            styles={SelectStyle()}
            options={selectOptions}
            selectKey={i}
            // defaultValue={{
            //   value: teacerDefaultValue,
            //   label: teacerDefaultValue,
            // }}
            placeholder={teacerDefaultValue}
            onChange={this.props.chooseTeacher}
            isDisabled={true}
          /> */}
          <input
            defaultValue={this.props.classData.chosenTeachers[i].first_name + " " + this.props.classData.chosenTeachers[i].last_name}
            // onBlur={this.props.handleChange}
            name="teacher"
            className="editSchoolClassTeacherSelect inputFields"
            readOnly={true}
          ></input>
          <img
            alt="remove button"
            className="removeTeachersSelectIcon"
            onClick={() =>
              this.props.removeTeacherFromClass(this.props.classIndex, i)
            }
            src="/icons/delete.svg"
          />
        </div>
      );
    }
    return teachersSelections;
  };

  //Get the prev state and change the showClass to the opposite value (if it's true it's will be false...).
  //when clicking on the arrow icon the details of the class appear or disappear
  //changes the state from true to false or the opposite
  transitionIcon = () => {
    this.setState((prevState) => {
      return { showClass: !prevState.showClass };
    });
  };

  render() {
    return (
      <>
        <p
          class="error"
          style={{ display: this.props.classData.classNameError.toShow }}
        >
          {this.props.classData.classNameError.mess}
        </p>

        <div className="TeachersSelect">
          <img
            alt="drop down list button"
            src="/icons/ionic-ios-arrow-down.svg"
            className={
              this.state.showClass ? "showClassButton" : "hideClassButton"
            }
            onClick={this.transitionIcon}
          ></img>
          <input
            defaultValue={this.props.classData.name}
            onBlur={this.props.handleChange}
            name={"name_" + this.props.classIndex}
            placeholder="הכנס שם כיתה"
            className="editSchoolClassesInput inputFields"
          ></input>
          <img
            alt="remove class button"
            className="removeClass"
            onClick={() => this.props.removeClass(this.props.classIndex)}
            src="/icons/delete.svg"
            style={{ height: '25px', marginTop: '15px' }}
          />
        </div>
        <Fade in={this.state.showClass}>
          <div
            className={
              this.state.showClass
                ? "showSchoolClassTeacher"
                : "hideSchoolClassTeacher"
            }
          >
            {this.props.classData.chosenTeachers.length > 0 ? <div>
              <label for="schoolClassTeacher" className="labelFields">
                מורים:
            </label>

              <div className="allEditSchoolClassTeacherSelect">
                {this.returnTeacherSelections()}
              </div></div> : null}
            <div className="editSchoolClassTeacherButtons">
            {this.props.classData.chosenTeachers.length === 0 ?  <></> : 
              <div
                className="editSchoolClassAddExistTeacher addSomethingNew"
                onClick={this.handleExistTeacherPopUpState}
              > 
                <img alt="add icon" className="addIcon" src="/icons/addicon.svg"></img>
                <p className="addTitle">הוסף מורה קיים</p>
              </div>}
              <div className="addSomethingNew" onClick={this.handleNewTeacherPopUpState}>
                <img alt="add icon" className="addIcon" src="/icons/addicon.svg"></img>
                <p className="addTitle" style={{ width: 'max-content' }}>צור מורה חדש</p>
              </div>
            </div>
            <Dialog
              maxWidth="90vw"
              open={this.state.showAddNewTeacher}
            ><AddTeacherPopUp closeFunc={this.handleNewTeacherPopUpState} classIndex={this.props.classIndex} addTeacherToClass={this.props.addNewTeacherToClass} />
            </Dialog>

            <Dialog
              maxWidth="90vw"
              open={this.state.showAddExistTeacher}
            ><ChooseExistTeacherPopUp closeFunc={this.handleExistTeacherPopUpState}
              classIndex={this.props.classIndex}
              addTeacherToClass={this.props.addExistTeacherToClass}
              existTeachers={this.props.existTeachers}
              chosenTeachers={this.props.classData.chosenTeachers === undefined ? [] : this.props.classData.chosenTeachers} />
            </Dialog>
          </div>
        </Fade>
      </>
    );
  }
}

export default SchoolClassData;
