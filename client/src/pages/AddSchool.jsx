import React from 'react';
import ArrowNavBar from '../component/ArrowNavBar'
import ClassData from "../component/schoolClassData";
import "../style/formStyle.css";
import { withRouter } from "react-router-dom";


class AddSchool extends React.Component {
    constructor(props) {
        super();
        this.state = {
            schoolNameError: {toShow: 'none', mess: ''},
            schoolName: '',
            //List of all the classes in the school. The numTeachers represent the number of teachers in the class.
            classes: [], 
          };
    }
  /*
    Get the element information, then prevent the refresh and take the state that now save in the class
    copy the classes array from him add to him default class (without name and with 1 teacher to choose)
    and return to setState the new classes array (with the new class).
  */
  addClassToSchool = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      let tempData = [
        ...prevState.classes,
        {
          id: prevState.classes.length + 1,
          name: '',
          numTeachers: 1,
          chosenTeachers: []
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
      tempData[index].chosenTeachers[selectKey] = {id: id, name:value}
      return { classes: tempData }})
  }

  //Get the element and set the schoolName by the info that the user type.
  handleChange = (e) => {
    if(e.target.name === 'schoolName'){
      this.setState({ schoolName: e.target.value });
    } else {
      let [fieldChangeName, classChangeIndex]= e.target.name.split('_')
      let classNameValue = e.target.value;
      this.setState((prevState)=>
        {
          let tempData = [...prevState.classes]
          tempData[parseInt(classChangeIndex)][fieldChangeName] = classNameValue
          return {classes: tempData}})
      }
  };

  addTeacherToClass = (classIndex) => {
    this.setState((prevState) => {
        let tempData = [...prevState.classes]
        tempData[classIndex].chosenTeachers.push({id: -1, name: 'בחר...'}) //id -1 did not exist and he wont show him
        return { classes: tempData }})
    }

    saveData = (e) => {
        e.preventDefault();
        /* data validetion  */
        // ----------school name validetion-------------------
        if(this.state.schoolName.length === 0){
            this.setState((prevState) => {
                prevState.schoolNameError.toShow = 'inline-block'
                prevState.schoolNameError.mess = 'חייב להכניס שם בית ספר'
                return {schoolNameError: prevState.schoolNameError}
            })
            return;
        } else if ((/[a-z]/).test(this.state.schoolName) || (/[A-Z]/).test(this.state.schoolName) || (/[!@#$%^&*()_+-\=\[\]{};:\\|,.<>\/?~`]/).test(this.state.schoolName)){
            this.setState((prevState) => {
                prevState.schoolNameError.toShow = 'inline-block'
                prevState.schoolNameError.mess = 'שם בית הספר לא תקין'
                return {schoolNameError: prevState.schoolNameError}
            })
            return;
        } else if (this.state.schoolName.includes('"') || this.state.schoolName.includes("'") ){
            if (!(/[\u0590-\u05FF]+["']+[\u0590-\u05FF]/).test(this.state.schoolName)){
                this.setState((prevState) => {
                    prevState.schoolNameError.toShow = 'inline-block'
                    prevState.schoolNameError.mess = 'שם בית הספר לא תקין'
                    return {schoolNameError: prevState.schoolNameError}
                })
            }
            return;
        } else{
            this.setState({schoolNameError: {toShow: 'none', mess: ''}})
        }



        //after all the validetion we need to send the data to sql
        this.props.history.goBack() // after saving go back
    }

    render() { 
        return ( <div>
            <ArrowNavBar />
            <form className="form">
          <div className="formData editSchoolForm">
            <label for="schoolName" className="editSchoolNameLable">
              שם בית ספר:
            </label>
            <p class='error' style={{display: this.state.schoolNameError.toShow}}>{this.state.schoolNameError.mess}</p>
            <input
              value={this.state.schoolName} //The input will show schoolName.
              name="schoolName"
              onChange={this.handleChange} //In charge of on the set state of schoolName.
              className="editSchoolNameInput inputFields"
            ></input>

            <label for="schoolClasses" className="editSchoolClassesLable">
              כיתות:
            </label>
            
            {//Pass on all the classes in the list and make them the class component (with the name and the teacher's selects).
            this.state.classes.map((classData, classIndex) => {
              //The component get the class data as props.classData.
              return <ClassData key={classData.id} 
                                classData={classData} 
                                classIndex={classIndex} 
                                addTeacherToClass={this.addTeacherToClass}
                                handleChange={this.handleChange} 
                                chooseTeacher={this.chooseTeacher} />;
            })}
            <button
              type="button"
              className="editSchoolAddClass"
              onClick={this.addClassToSchool} //Add class to the list.
            >
              הוסף כיתה
            </button>
          </div>
          <button className="saveButton" onClick={this.saveData}>שמור</button>
        </form>
        </div> );
    }
}
 
export default withRouter(AddSchool);