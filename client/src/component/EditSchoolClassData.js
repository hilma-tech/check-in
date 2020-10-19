import React from 'react';
import Select from 'react-select';
import SelectStyle from '../style/selectStyle'

class ClassData extends React.Component {
    constructor(props) {
        super();
        this.state = { 
            classDataName: props.classData.name,
            numTeachers: props.classData.numTeachers,
            teachers: ['נורית כהן'] 
        }
    }
    makeTeacherOption = () => {
        let options = []
        this.state.teachers.map((teachersName) => {options.push({ value: teachersName, label: teachersName }) })
        console.log(options);
        return options
    }
    returnTeahcersSelections = (numberOfTeachers) => {
        let teachersSelections = [];
        let selectOptions = this.makeTeacherOption();
        for (let i = 0; i < numberOfTeachers; i++) {
            teachersSelections.push(<Select className='editSchoolClassTeacherSelect' placeholder='בחר...' styles={SelectStyle()} options={selectOptions} />)
        }
        return teachersSelections
    }
    addTeacherToClass = () => {
        this.setState((prevState) => {
            let tempData = prevState.numTeachers
            //זה משום מה עושה את השורה הבאה פעמים אז הוספתי 0.5 ככה שזה בסוף יוסיף 1
            tempData++
            return { numTeachers: tempData }
        })
    }
    handelClassNameChange = (e) => {
        this.setState({classDataName: e.target.value})
    }
    render() { 
        return ( 
            <>
                <img src='/icons/ionic-ios-arrow-down.svg'></img>
                <input value={this.state.classDataName} onChange={this.handelClassNameChange} name='schoolClasses' className='editSchoolClassesInput inputFields'></input>
                <label for='schoolClassTeacher' className='editSchoolClassTeacherLable'>מורים:</label>
                <div className='allEditSchoolClassTeacherSelect'>
                    {
                        this.returnTeahcersSelections(this.state.numTeachers)
                    }
                </div>
                <div className='editSchoolClassTeacherButtons'>
                    <div className='editSchoolClassAddExistTeacher addSomethingNew' onClick={() => { this.addTeacherToClass() }}>
                        <img className='addIcon' src='/icons/addicon.svg'></img>
                        <p className='addTitle'>הוסף מורה קיים</p>
                    </div>
                    <div className='addSomethingNew'>
                        <img className='addIcon' src='/icons/addicon.svg'></img>
                        <p className='addTitle'>הוסף מורה חדש</p>
                    </div>
                </div>
            </>
         );
    }
}
 
export default ClassData;