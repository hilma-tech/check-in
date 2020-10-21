import React from 'react';
import Select from 'react-select';
import SelectStyle from '../style/selectStyle'
import '../style/AnimationW3School.css'

class ClassData extends React.Component {
    constructor(props) {
        super();
        this.state = { 
            showClass: true,
            numTeachers: 1
        }
        this.props = props
        this.teachers= [{id: 1, name:'נורית כהן'},{id: 2, name:'נורית כהן'}] // Will need to get the list from QSL
    }

    //Return the techer list as list of object for the Select.
    makeTeacherOption = () => {
        let options = []
        this.teachers.map((teachersDats) => {
            if (this.props.classData.chosenTeachers.filter((teacher) => {return teacher.id === teachersDats.id}).length === 0){
                options.push({ value: teachersDats.name, label: teachersDats.name, name: this.props.classIndex,id: teachersDats.id}) 
            }
        })
        return options
    }

    //Meke list of select with the teachers. The len is sent becouse in the select the this.state didn't work.
    returnTeahcersSelections = (numberOfTeachers) => {
        let teachersSelections = [];
        let selectOptions = this.makeTeacherOption();
        for (let i = 0; i < numberOfTeachers; i++) {
            teachersSelections.push(<Select className='editSchoolClassTeacherSelect' 
                                            placeholder='בחר...' 
                                            styles={SelectStyle()} 
                                            options={selectOptions} 
                                            onChange={this.props.chooseTeacher}/>)
        }
        return teachersSelections
    }

    //Get the prev state and change the showClass to the opposite value (if it's true it's will be false...).
    transitionIcon = () => {
        this.setState((prevState)=>{return {showClass: !prevState.showClass}})
    }

       /*
        Add to numTeachers one and then when the returnTeahcersSelections function will return it's will return
        one more teacher's select.
    */
   addTeacherToClass = () => {
    this.setState((prevState) => {
        let tempData = prevState.numTeachers
        tempData++
        return { numTeachers: tempData }})
    }

    render() { 
        return ( 
            <>
                <img src='/icons/ionic-ios-arrow-down.svg' className={this.state.showClass ? 'showClassButton' : 'hideClassButton'} onClick={this.transitionIcon}></img>
                <input value={this.props.classData.name} onChange={this.props.handleChange} name={'name_'+this.props.classIndex} placeholder='הכנס שם כיתה' className='editSchoolClassesInput inputFields'></input>
                {/*w3-animate-opacity class make sure that the fading will happens only once. */}
                <div className={this.state.showClass ? 'w3-animate-fading w3-animate-opacity showSchoolClassTeacher': 'hideSchoolClassTeacher'}>
                        <label for='schoolClassTeacher' className='editSchoolClassTeacherLable'>מורים:</label>
                        <div className='allEditSchoolClassTeacherSelect'>
                            {
                                this.returnTeahcersSelections(this.state.numTeachers)
                            }
                        </div>
                        <div className='editSchoolClassTeacherButtons'>
                            <div className='editSchoolClassAddExistTeacher addSomethingNew' onClick={this.addTeacherToClass}>
                                <img className='addIcon' src='/icons/addicon.svg'></img>
                                <p className='addTitle'>הוסף מורה קיים</p>
                            </div>
                            <div className='addSomethingNew'>
                                <img className='addIcon' src='/icons/addicon.svg'></img>
                                <p className='addTitle'>הוסף מורה חדש</p>
                            </div>
                        </div>
                </div>
            </>
         );
    }
}
 
export default ClassData;