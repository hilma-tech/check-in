import React, { Component } from 'react';
import ClassData from '../component/EditSchoolClassData'
import '../style/editSchoolStyle.css';
import '../style/WhiteBarStyle.css';
import '../style/formStyle.css';


class editSchool extends Component {
    constructor(props) {
        super();
        this.state = {
            schoolName: 'עשה חיל',
            classes: [{ id: 1, name: "ד'2", numTeachers: 1 }],
        }
    }
    
    addClassToSchool = (e) => {
        console.log('addClassToSchool');
        e.preventDefault();
        this.setState((prevState) => {
            let tempData = [...prevState.classes, { id: prevState.classes.length + 1, name: "הכנס שם כיתה", numTeachers: 1 }]
            return { classes: tempData }
        })
    }
    handelSchoolNameChange = (e) => {
        this.setState({schoolName: e.target.value})
    }
    render() {
        return (
            <div>
                <header className="navbar">
                    <span className='goBackFromEditSchool pageName'></span>
                    <h1 className="pageName bold editSchoolPageName">עריכת בית ספר</h1>
                </header>
                <form className='form'>
                    <div className='formData editSchoolForm'>
                        <label for='schoolName' className='editSchoolNameLable'>שם בית ספר:</label>
                        <input value={this.state.schoolName} name='schoolName' onChange={this.handelSchoolNameChange} className='editSchoolNameInput inputFields'></input>

                        <label for='schoolClasses' className='editSchoolClassesLable'>כיתות:</label>
                        {this.state.classes.map((classData) => {
                            return <ClassData key={classData.id} classData={classData}/>
                        })}
                        <button type='button' className='editSchoolAddClass' onClick={this.addClassToSchool}>הוסף כיתה</button>
                    </div>
                    <button className='deletButton'>מחק בית ספר</button>
                    <button className='saveButton'>שמור</button>
                </form>
            </div>
        );
    }
}

export default editSchool;