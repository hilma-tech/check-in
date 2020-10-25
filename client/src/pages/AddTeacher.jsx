import React, { Component } from "react";
import Select from "react-select";
import WhiteBar from "../component/ArrowNavBar";
import ClassSelection from "../component/ClassSelection";
import "../style/AddGameStyle.css";
import "../style/formStyle.css";
import SelectStyle from "../style/selectStyle";

class AddTeacher extends Component {
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
      fieldsData: [{ id: 0, value: "" }],
      email: "",
      password: ""
    };
  }

  saveTeacherName = (props) => {
    console.log(props.target.value)
  }

  saveSchoolName = (props) => {
    console.log(props.value)
  }

  saveValue = (newValue, id) => {
    this.setState((prevState) => {
      let updateData = [...prevState.fieldsData];
      updateData[id].value = newValue;
      console.log("newValue:", updateData);
      return { fieldsData: updateData };
    });
  };

  saveEmail = (props) => {
    console.log(props.target.value)
  }

  savePassword = (props) => {
    console.log(props.target.value)
  }

  addNewFieldData = () => {
    this.setState((prevState) => {
      let tempFieldsData = [...prevState.fieldsData];
      tempFieldsData.push({
        id: this.state.fieldsData.length,
        value: [false],
      });
      return { fieldsData: tempFieldsData };
    });
  };

  render() {
    return (
      <>
        <div className="pageContainer">
          <WhiteBar />
          <div className="formContainer">
            <form className="formData">
              {/* מורה */}
              <label className="fieldTitle">
                שם המורה:
                <input
                  className="inputFields"
                  type="text"
                  placeholder="הכנס את שם המורה..."
                  onBlur={this.saveTeacherName}
                />
              </label>

              {/* בית ספר */}
              <label className="fieldTitle">
                בית ספר:
                <Select
                onChange={this.saveSchoolName}
                  options={this.schoolOptions}
                  styles={SelectStyle()}
                  defaultValue={{ value: "default", label: "בחר..." }}
                />
              </label>
              {/* כיתה */}
              <label className="fieldTitle">כיתה:</label>
              {this.state.fieldsData.map((fieldObj) => {
                return (
                  <>
                    <ClassSelection
                      id={fieldObj.id}
                      saveValue={this.saveValue}
                      options={this.classOptions}
                      onChange={this.saveChange}
                      defaultValue={{ value: "default", label: "בחר..." }}
                    />
                    <br />
                  </>
                );
              })}
            </form>

            {/* הוספת כיתה */}
            <div
              className="addSomethingNew"
              id="addNewField"
              onClick={this.addNewFieldData}
            >
              <img className="addIcon" src="/icons/addicon.svg"></img>
              <p className="addTitle">הוסף כיתה</p>
            </div>

            <form className="formData">
              {/* אימייל */}
              <label className="fieldTitle">
                אימייל:
                <input
                onBlur={this.saveEmail}
                  className="inputFields"
                  type="text"
                  placeholder="הכנס כתובת מייל..."
                />
              </label>
              {/* סיסמא */}
              <label className="fieldTitle">
                סיסמא:
                <input
                onBlur={this.savePassword}
                  className="inputFields"
                  type="text"
                  placeholder="הכנס סיסמא..."
                />
              </label>
            </form>
            <button className="saveButton">שמור</button>
          </div>
        </div>
      </>
    );
  }
}

export default AddTeacher;
