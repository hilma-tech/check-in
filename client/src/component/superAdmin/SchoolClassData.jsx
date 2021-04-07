import React from "react";
import Select from "react-select";
import Fade from "@material-ui/core/Fade";
import SelectStyle from "../../style/superAdmin/select_style";

class SchoolClassData extends React.Component {
  constructor() {
    super();
    this.state = {
      showClass: false,
    };
    // this.teachers = [];
    // lists the options given for the teachers to assign to the class
    //Will need to get the list from SQL
  }

  // componentDidMount = async () => {

  // }

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
  // returnTeacherSelections = () => {
  //   let teachersSelections = [];
  //   let numTeachers = this.props.classData.chosenTeachers.length;
  //   if (numTeachers === 0) {
  //     return <p>לכיתה זו אין מורים</p>;
  //   }
  //   for (let i = 0; i < numTeachers; i++) {
  //     let teacerDefaultValue = this.props.classData.chosenTeachers[i].name;
  //     let selectOptions = this.makeTeacherOption(i);
  //     teachersSelections.push(
  //       <div
  //         className="TeachersSelect"
  //         key={this.props.classData.chosenTeachers[i].id}
  //       >
  //         <Select
  //           className="editSchoolClassTeacherSelect"
  //           styles={SelectStyle()}
  //           options={selectOptions}
  //           selectKey={i}
  //           // defaultValue={{
  //           //   value: teacerDefaultValue,
  //           //   label: teacerDefaultValue,
  //           // }}
  //           placeholder={teacerDefaultValue}
  //           onChange={this.props.chooseTeacher}
  //           isDisabled={true}
  //         />
  //         <img
  //           alt="remove button"
  //           className="removeTeachersSelectIcon"
  //           onClick={() =>
  //             this.props.removeTeacherFromClass(this.props.classIndex, i)
  //           }
  //           src="/icons/delete.svg"
  //         />
  //       </div>
  //     );
  //   }
  //   return teachersSelections;
  // };

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
          {/* <img
            alt="drop down list button"
            src="/icons/ionic-ios-arrow-down.svg"
            className={
              this.state.showClass ? "showClassButton" : "hideClassButton"
            }
            onClick={this.transitionIcon}
          ></img> */}
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
            style= {{height: '20px', marginTop:'15px'}}
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
            {/* <label for="schoolClassTeacher" className="labelFields">
              מורים:
            </label>
            <div className="allEditSchoolClassTeacherSelect">
              {this.returnTeacherSelections()}
            </div>
            <div className="editSchoolClassTeacherButtons">
              {this.props.canAddExistTeacher ? (
                <div
                  className="editSchoolClassAddExistTeacher addSomethingNew"
                  onClick={() => {
                    this.props.addTeacherToClass(this.props.classIndex);
                  }}
                >
                  <img alt="add icon" className="addIcon" src="/icons/addicon.svg"></img>
                  <p className="addTitle">הוסף מורה קיים</p>
                </div>
              ) : (
                  <></>
                )}
              <div className="addSomethingNew">
                <img alt="add icon" className="addIcon" src="/icons/addicon.svg"></img>
                <p className="addTitle">הוסף מורה חדש</p>
              </div>
            </div> */}
          </div>
        </Fade>
      </>
    );
  }
}

export default SchoolClassData;
