import React from 'react';
import Select from 'react-select';
import Fade from '@material-ui/core/Fade';
import addicon from "../../img/addicon.svg";
import SelectStyle from '../../style/superAdmin/select_style'


class ClassData extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showClass: true,
        }
        this.teachers = [{ id: 1, name: 'נורית cכהן' }, { id: 2, name: 'נורsית כהן' }, { id: 3, name: 'נוריתa כהן' }] // Will need to get the list from QSL
    }

    //Return the techer list as list of object for the Select.
    makeTeacherOption = (selectKey) => {
        let options = []
        this.teachers.map((teacherData) => {
            if (this.props.classData.chosenTeachers.filter((teacher) => { return teacher.id === teacherData.id }).length === 0) {
                options.push({ value: teacherData.name, label: teacherData.name, name: this.props.classIndex, id: teacherData.id, selectKey: selectKey })
            }
        })
        return options
    }

    //Meke list of select with the teachers. The len is sent becouse in the select the this.state didn't work.
    returnTeahcersSelections = () => {
        let teachersSelections = [];
        let numTeachers = this.props.classData.chosenTeachers.length
        for (let i = 0; i < numTeachers; i++) {
            let teacerDefaultValue = this.props.classData.chosenTeachers[i].name
            let selectOptions = this.makeTeacherOption(i);
            teachersSelections.push(<div className='TeachersSelect' key={this.props.classData.chosenTeachers[i].id}>
                <Select className='editSchoolClassTeacherSelect'
                    styles={SelectStyle()}
                    options={selectOptions}
                    selectKey={i}
                    defaultValue={{ value: teacerDefaultValue, label: teacerDefaultValue }}
                    onChange={this.props.chooseTeacher} />
                <img className="removeTeachersSelectIcon" onClick={() => this.props.removeTeacherFromClass(this.props.classIndex, i)} src="/icons/delete.svg" /></div>)
        }
        return teachersSelections
    }

    //Get the prev state and change the showClass to the opposite value (if it's true it's will be false...).
    transitionIcon = () => {
        this.setState((prevState) => { return { showClass: !prevState.showClass } })
    }


    render() {
        return (
            <>
                <p class='error' style={{ display: this.props.classData.classNameError.toShow }}>{this.props.classData.classNameError.mess}</p>

                <div className='TeachersSelect' >
                    <img src='/icons/ionic-ios-arrow-down.svg' className={this.state.showClass ? 'showClassButton' : 'hideClassButton'} onClick={this.transitionIcon}></img>
                    <input value={this.props.classData.name} onChange={this.props.handleChange} placeholder='הכנס שם בית ספר' name={'name_' + this.props.classIndex} placeholder='הכנס שם כיתה' className='editSchoolClassesInput inputFields'></input>
                    <img className="removeClass" onClick={() => this.props.removeClass(this.props.classIndex)} src="/icons/delete.svg" />

                </div>
                {/*w3-animate-opacity class make sure that the fading will happens only once. */}
                <Fade in={this.state.showClass}>
                    <div className={this.state.showClass ? 'showSchoolClassTeacher' : 'hideSchoolClassTeacher'}>
                        <label for='schoolClassTeacher' className='editSchoolClassTeacherLable'>מורים:</label>
                        <div className='allEditSchoolClassTeacherSelect'>
                            {
                                this.returnTeahcersSelections()
                            }
                        </div>
                        <div className='editSchoolClassTeacherButtons'>
                            {this.props.canAddExistTeacher ?
                            <div className='editSchoolClassAddExistTeacher addSomethingNew' onClick={() => { this.props.addTeacherToClass(this.props.classIndex) }}>
                                <img className='addIcon' src='/icons/addicon.svg'></img>
                                <p className='addTitle'>הוסף מורה קיים</p>
                            </div> : <></>}
                            <div className='addSomethingNew'>
                                <img className='addIcon' src='/icons/addicon.svg'></img>
                                <p className='addTitle'>הוסף מורה חדש</p>
                            </div>
                        </div>
                    </div>
                </Fade>
            </>
        );
    }
}

export default ClassData;