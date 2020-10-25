import React from 'react';
import Select from 'react-select';
import SelectStyle from '../style/selectStyle'
import "../style/formStyle.css";
import "../style/AddStudentStyle.css";

class AddStudent extends React.Component {
    constructor(props) { 
        super();
        this.state = { numClasses: 1,
                        studentName: '',
                        userName: '',
                        password: '',
                        school: '',
                        classes: []}
    }

    returnClassesSelections = () => {
        let classesSelections = [];
        for (let i = 0; i < this.state.numClasses; i++) {
            classesSelections.push(<Select className='studentClass'
                                            styles={SelectStyle()} 
                                            options={[{value: "ג'2", label: "ג'2"}, {value: "א'2", label: "א'2"}]} 
                                            placeholder='שייך לכיתה'/>)
        }
        return classesSelections
    }

    addClassOption = () => {
        this.setState((prevState)=>{return {numClasses: prevState.numClasses + 1}})
    }

    handlehanges = () => {

    }

    render() { 
        return ( 
            <div>
                <form className='formData addStudentForm'>
                    <label for='studentName'>שם התלמיד:</label>
                    <input className='inputFields' value={this.state.studentName} placeholder='הכנס את שם התלמיד...' name='studentName'></input>

                    <label for='userName'>שם משתמש:</label>
                    <input className='inputFields' placeholder='הכנס שם משתמש' name='userName'></input>

                    <label for='password'>סיסמא:</label>
                    <input className='inputFields' type='password' placeholder='הכנס סיסמא' name='password'></input>

                    <label>בית ספר:</label>
                    <Select placeholder='בחר...' 
                            styles={SelectStyle()} 
                            options={[{value: 'עשה חיל', label: 'עשה חיל'}]} 
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