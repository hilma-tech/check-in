import React, { Component } from 'react';
import '../style/editSchoolStyle.css';
import '../style/WhiteBarStyle.css';
import '../style/formStyle.css';
import Select from 'react-select';
import SelectStyle from '../style/selectStyle'

class editSchool extends Component {
    constructor(props) {
        super();
        this.state = {
            schoolName: 'עשה חיל',
            classes: [{ id: 1, name: "ד'2", numTeachers: 1 }],
            teachers: ['נורית כהן']
        }
    }
    makeTeacherOption = () => {
        let options = []
        this.state.teachers.map((teachersName) => {options.push({ value: teachersName, label: teachersName }) })
        console.log(options);
        return options
    }
    addClassToSchool = (e) => {
        console.log('addClassToSchool');
        e.preventDefault();
        this.setState((prevState) => {
            let tempData = [...prevState.classes, { id: prevState.classes.length + 1, name: "הכנס שם כיתה", numTeachers: 1 }]
            return { classes: tempData }
        })
    }
    addTeacherToClass = (classIndex) => {
        this.setState((prevState) => {
            let tempData = [...prevState.classes]
            //זה משום מה עושה את השורה הבאה פעמים אז הוספתי 0.5 ככה שזה בסוף יוסיף 1
            tempData[classIndex].numTeachers = tempData[classIndex].numTeachers + 0.5;
            return { classes: tempData }
        })
    }
    returnTeahcersSelections = (numberOfTeachers) => {
        let teachersSelections = [];
        let selectOptions = this.makeTeacherOption();
        for (let i = 0; i < numberOfTeachers; i++) {
            teachersSelections.push(<Select className='editSchoolClassTeacherSelect' placeholder='בחר...' styles={SelectStyle()} options={selectOptions} />)
        }
        return teachersSelections
    }
    render() {
        return (
            <div>
                <header className="navbar">
                    <span className='goBackFromEditSchool pageName'></span>
                    <h1 className="pageName bold editSchoolPageName">עריכת בית ספר</h1>
                </header>
                <form className='form'>
                    <div className='formData'>
                        <label for='schoolName' className='editSchoolNameLable'>שם בית ספר</label>
                        <input value={this.state.schoolName} name='schoolName' className='editSchoolNameInput inputFields'></input>

                        <label for='schoolClasses' className='editSchoolClassesLable'>כיתות</label>
                        {this.state.classes.map((claseeData, claseeDataIndex) => {
                            return <>
                                <input key={claseeData.id} value={claseeData.name} name='schoolClasses' className='editSchoolClassesInput inputFields'></input>
                                <label for='schoolClassTeacher' className='editSchoolClassTeacherLable'>מורים</label>
                                <div>
                                    {

                                        this.returnTeahcersSelections(claseeData.numTeachers)
                                    }
                                </div>
                                <div className='editSchoolClassTeacherButtons'>
                                    <div className='editSchoolClassAddExistTeacher addSomethingNew' onClick={() => { this.addTeacherToClass(claseeDataIndex) }}>
                                        <img className='addIcon' src='/icons/addicon.svg'></img>
                                        <p className='addTitle'>הוסף מורה קיים</p>
                                    </div>
                                    <div className='addSomethingNew'>
                                        <img className='addIcon' src='/icons/addicon.svg'></img>
                                        <p className='addTitle'>הוסף מורה חדש</p>
                                    </div>
                                </div>
                            </>
                        })}
                        <button type='button' onClick={this.addClassToSchool}>הוסף כיתה</button>
                    </div>
                    <button className='deletButton'>מחק בית ספר</button>
                    <button className='saveButton'>שמור</button>
                </form>
            </div>
        );
    }
}

export default editSchool;