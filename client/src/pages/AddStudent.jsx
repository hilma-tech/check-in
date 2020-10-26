import React from 'react';
import Select from 'react-select';
import SelectStyle from '../style/selectStyle'
import "../style/formStyle.css";
import "../style/AddStudentStyle.css";
import ArrowNavBar from '../component/ArrowNavBar'

class AddStudent extends React.Component {
    constructor(props) { 
        super();
        this.state = {  studentName: '',
                        userName: '',
                        password: '',
                        school: '',
                        chosenClasses: [],
                        allClasses: ["א'2", "ב'2", "ג'2"]}
        this.allSchoole = ['עשה חיל', 'בית ספר עם שם אחר']
    }

    //Return the classes list as list of object for the Select.
    makeClassesOption = (indexSelect) => {
        let options = []
        this.state.allClasses.map((nameClass) => {
            if (this.state.chosenClasses.filter((chosenClassName) => {return chosenClassName === nameClass}).length === 0){
                options.push({ value: nameClass, label: nameClass, classIndex: indexSelect}) 
            }   
        })
        return options
    }

    //Return the schools list as list of object for the Select.
    makeSchoolOption = (indexSelect) => {
        let options = []
        this.allSchoole.map((nameSchool) => {
            if (nameSchool !== this.state.school){
                options.push({ value: nameSchool, label: nameSchool, SchoolIndex: indexSelect}) 
            }   
        })
        return options
    }

    returnClassesSelections = () => {
        let classesSelections = [];
        for (let i = 0; i < this.state.chosenClasses.length; i++) {
            classesSelections.push(<Select className='studentClass'
                                            styles={SelectStyle()} 
                                            options={this.makeClassesOption(i)} 
                                            onChange={this.chooseClass}
                                            defaultValue={{ value: this.state.chosenClasses[i], label: this.state.chosenClasses[i] }}/>)
        }
        return classesSelections
    }

    addClassOption = () => {
        this.setState((prevState)=>{
            prevState.chosenClasses.push('שייך לכיתה')
            return {chosenClasses: prevState.chosenClasses}})
    }

    chooseClass = (e) => {
        this.setState((prevState)=>{
            prevState.chosenClasses[e.classIndex] = e.value;
            return {chosenClasses: prevState.chosenClasses}
        })
    }

    handlehanges = (e) => {
        let updateData = e.target
        this.setState((prevState) => {
            prevState[updateData.name] = updateData.value
            return {[updateData.name]: prevState[updateData.name]}
        })
    }

    chooseSchool = (e) => {
        this.setState({school: e.value})
    }

    render() { 
        return ( 
            <div>
                <ArrowNavBar />
                <form className='formData addStudentForm'>
                    <label for='studentName'>שם התלמיד:</label>
                    <input className='inputFields' value={this.state.studentName} onChange={this.handlehanges} placeholder='הכנס את שם התלמיד...' name='studentName'></input>

                    <label for='userName'>שם משתמש:</label>
                    <input className='inputFields' value={this.state.userName} onChange={this.handlehanges} placeholder='הכנס שם משתמש' name='userName'></input>

                    <label for='password'>סיסמא:</label>
                    <input className='inputFields' value={this.state.password} onChange={this.handlehanges} type='password' placeholder='הכנס סיסמא' name='password'></input>

                    <label>בית ספר:</label>
                    <Select placeholder='בחר...' 
                            styles={SelectStyle()} 
                            options={this.makeSchoolOption()} 
                            onChange={this.chooseSchool}
                            placeholder='שייך לבית ספר'/>

                    <label>כיתה:</label>
                    {
                        this.returnClassesSelections()
                    }

                    <div className='addSomethingNew' onClick={this.addClassOption}>
                        <img className='addIcon' src='/icons/addicon.svg'></img>
                        <p className='addTitle'>הוסף כיתה</p>
                    </div>
                </form>
                <button className="saveButton">שמור</button>
            </div>
         );
    }
}
 
export default AddStudent;