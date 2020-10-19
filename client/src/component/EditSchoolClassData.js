import React from 'react';
import Select from 'react-select';
import SelectStyle from '../style/selectStyle'

class ClassData extends React.Component {
    constructor(props) {
        super();
        this.state = { teachers: ['נורית כהן'] }
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
    addTeacherToClass = (classIndex) => {
        this.setState((prevState) => {
            let tempData = [...prevState.classes]
            //זה משום מה עושה את השורה הבאה פעמים אז הוספתי 0.5 ככה שזה בסוף יוסיף 1
            tempData[classIndex].numTeachers = tempData[classIndex].numTeachers + 0.5;
            return { classes: tempData }
        })
    }
    render() { 
        return ( 
            <>
                <input value={this.props.claseeData.name} name='schoolClasses' className='editSchoolClassesInput inputFields'></input>
                <label for='schoolClassTeacher' className='editSchoolClassTeacherLable'>מורים</label>
                <div>
                    {
                        this.returnTeahcersSelections(this.props.claseeData.numTeachers)
                    }
                </div>
                <div className='editSchoolClassTeacherButtons'>
                    <div className='editSchoolClassAddExistTeacher addSomethingNew' onClick={() => { this.addTeacherToClass(this.props.claseeDataIndex) }}>
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