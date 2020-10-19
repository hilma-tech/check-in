import React, { Component } from 'react';
import Menu from '../component/Menu';
import '../style/editSchoolStyle.css';
import Select from 'react-select';

class editSchool extends Component {
    constructor(props) {
        super();
        this.state = {
            schoolName:'עשה חיל',
            classes: ["ד'2"] ,
            teachers: ['נורית כהן']
        }
    }
    makeTeacherOption = ()=>{
        let options = []
        options.push(this.state.teachers.map((teachersName)=>{return { value: teachersName, label: teachersName }}))
        return options
    }
    addClassToSchool = (e) => {
        console.log('addClassToSchool');
        e.preventDefault();
        this.setState((prevState)=>{
            let tempData = [...prevState.classes, "הכנס שם כיתה"]
            return {classes: tempData}})
    }
    render() { 
        return ( 
            <div>
                <header>
                    <img height='20px' width='25px' className='goBackFromEditSchool'/>
                    <h1>עריכת בית ספר</h1>
                </header>
                <form>
                    <label for='schoolName' className='editSchoolNameLable'>שם בית ספר</label>
                    <input value={this.state.schoolName} name='schoolName' className='editSchoolNameInput'></input>

                    <label for='schoolClasses' className='editSchoolClassesLable'>כיתות</label>
                    {this.state.classes.map((claseeData,claseeDataIndex)=>{
                        return <>
                                <input key={claseeDataIndex} value={claseeData} name='schoolClasses' id={claseeData} className='editSchoolClassesInput'></input>      
                                <label for='schoolClassTeacher' className='editSchoolClassTeacherLable'>מורים</label>
                                <Select className='editSchoolClassTeacherSelect' options={this.makeTeacherOption()} />
                                <div className='editSchoolClassTeacherButtons'>
                                    <div className='editSchoolClassAddExistTeacher'>
                                        <img src='/icons/addicon.svg'></img>
                                        <p>הוסף מורה קיים</p>
                                    </div>
                                    <div className='editSchoolClassAddNewTeacher'>
                                        <img src='/icons/addicon.svg'></img>
                                        <p>הוסף מורה חדש</p>
                                    </div>
                                </div>
                               </>
                    })}
                    <button type='button' onClick={this.addClassToSchool}>הוסף כיתה</button>
                    <div>
                        <button>מחק בית ספר</button>
                        <button>שמור</button>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default editSchool;