import React from 'react';
import Select from 'react-select';
import SelectStyle from '../../style/superAdmin/select_style'
import "../../style/superAdmin/form_style.css";
import "../../style/superAdmin/add_student_style.css";
import addicon from "../../img/addicon.svg";
import ArrowNavBar from '../../component/superAdmin/ArrowNavBar.jsx'
import { withRouter } from "react-router-dom";
import {userNameValidation, nameValidation, passwordValidation,mustInputValidation} from '../../tools/ValidationFunctions'


class AddStudent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            studentNameError: { toShow: 'none', mess: '' },
            studentName: '',
            userNameError: { toShow: 'none', mess: '' },
            userName: '',
            passwordError: { toShow: 'none', mess: '' },
            password: '',
            schoolNameError: { toShow: 'none', mess: '' },
            school: '',
            chosenClasses: [],
            allClasses: [{id: 1, name:"א'2"},{id: 2, name:"ב'2"},{id: 3, name:"ג'2"}]
        }
        this.allSchoole = ['עשה חיל', 'בית ספר עם שם אחר']
    }

    //Return the classes list as list of object for the Select.
    makeClassesOption = (indexSelect) => {
        let options = []
        this.state.allClasses.map((classData) => {
            if (this.state.chosenClasses.filter((chosenClassData) => { return chosenClassData.name === classData.name }).length === 0) {
                options.push({ value: classData.name, label: classData.name, classIndex: indexSelect, id: classData.id })
            }
        })
        return options
    }

    //Return the schools list as list of object for the Select.
    makeSchoolOption = (indexSelect) => {
        let options = []
        this.allSchoole.map((nameSchool) => {
            if (nameSchool !== this.state.school) {
                options.push({ value: nameSchool, label: nameSchool, SchoolIndex: indexSelect })
            }
        })
        return options
    }

    returnClassesSelections = () => {
        let classesSelections = [];
        for (let i = 0; i < this.state.chosenClasses.length; i++) {
            classesSelections.push(
                <div className='TeachersSelect' key={this.state.chosenClasses[i].id}>
                    <Select className='studentClass'
                        styles={SelectStyle()}
                        options={this.makeClassesOption(i)}
                        onChange={this.chooseClass}
                        defaultValue={{ value: this.state.chosenClasses[i].name, label: this.state.chosenClasses[i].name }} />
                    <img className="removeClass" onClick={() => this.removeClass(i)} src="/icons/delete.svg" />
                </div>)
        }
        return classesSelections
    }

    addClassOption = () => {
        this.setState((prevState) => {
            prevState.chosenClasses.push({id: -1*prevState.chosenClasses.length, name: 'שייך לכיתה'})
            return { chosenClasses: prevState.chosenClasses }
        })
    }

    chooseClass = (e) => {
        this.setState((prevState) => {
            prevState.chosenClasses[e.classIndex] = {id: e.id, name: e.value};
            return { chosenClasses: prevState.chosenClasses }
        })
    }

    handlehanges = (e) => {
        let updateData = e.target
        this.setState((prevState) => {
            prevState[updateData.name] = updateData.value
            return { [updateData.name]: prevState[updateData.name] }
        })
    }

    chooseSchool = (e) => {
        this.setState({ school: e.value })
    }

    removeClass = (classIndex) => {
        this.setState((prevState) => {
            let tempData = [...prevState.chosenClasses]
            tempData.splice(classIndex, 1);
            return { chosenClasses: tempData }
        })
    }

    saveButton = (e) => {
        e.preventDefault();
        let allOk = true
        /* data validetion  */
        // ----------student name validetion-------------------
        let studentNameErrorMess = nameValidation(this.state.studentName)
        if (studentNameErrorMess.length !== 0) {
            this.setState((prevState) => {
                prevState.studentNameError.toShow = 'block'
                prevState.studentNameError.mess = studentNameErrorMess
                return { studentNameError: prevState.studentNameError }
            })
            allOk = false
        } else {
            this.setState({ studentNameError: { toShow: 'none', mess: '' } })
        }
        
        // ----------user name validetion-------------------
        let userNameErrorMess = userNameValidation(this.state.userName)
        if (userNameErrorMess.length !== 0){
            this.setState((prevState) => {
                prevState.userNameError.toShow = 'block'
                prevState.userNameError.mess = userNameErrorMess
                return { userNameError: prevState.userNameError }
            })
            allOk = false
        } else {
            this.setState({ userNameError: { toShow: 'none', mess: '' } })
        }

        // ---------------password validetion-------------------
        let passwordErrorMess = passwordValidation(this.state.password)
        if (passwordErrorMess.length !== 0){
            this.setState((prevState) => {
                prevState.passwordError.toShow = 'block'
                prevState.passwordError.mess = passwordErrorMess
                return { passwordError: prevState.passwordError }
            })
            allOk = false
        } else {
            this.setState({ passwordError: { toShow: 'none', mess: '' } })
        }

        // ---------------school name validetion-------------------
        let schoolNameErrorMess = mustInputValidation(this.state.school)
        if (schoolNameErrorMess.length !== 0){
            this.setState((prevState) => {
                prevState.schoolNameError.toShow = 'block'
                prevState.schoolNameError.mess = schoolNameErrorMess
                return { schoolNameError: prevState.schoolNameError }
            })
            allOk = false
        } else {
            this.setState({ schoolNameError: { toShow: 'none', mess: '' } })
        }


        //after all the validetion we need to send the data to sql
        if (allOk) {
            this.props.history.goBack() // after saving go back
        }
    }

    render() {
        return (
            <div>
                <ArrowNavBar />
                <form className='formData'>
                    <label for='studentName'>שם התלמיד:</label>
                    <p class='error' style={{ display: this.state.studentNameError.toShow }}>{this.state.studentNameError.mess}</p>
                    <input className='inputFields' value={this.state.studentName} onChange={this.handlehanges} placeholder='הכנס את שם התלמיד...' name='studentName'></input>

                    <label for='userName'>שם משתמש:</label>
                    <p class='error' style={{ display: this.state.userNameError.toShow }}>{this.state.userNameError.mess}</p>
                    <input className='inputFields' value={this.state.userName} onChange={this.handlehanges} placeholder='הכנס שם משתמש' name='userName'></input>

                    <label for='password'>סיסמא:</label>
                    <p class='error' style={{ display: this.state.passwordError.toShow }}>{this.state.passwordError.mess}</p>
                    <input className='inputFields' value={this.state.password} onChange={this.handlehanges} type='password' placeholder='הכנס סיסמא' name='password'></input>

                    <label className='addStudentLabel'>בית ספר:</label>
                    <p class='error' style={{ display: this.state.schoolNameError.toShow }}>{this.state.schoolNameError.mess}</p>
                    <Select className='schoolSelection'
                        id='addStudentSchoolSelection'
                        placeholder='בחר...'
                        styles={SelectStyle()}
                        options={this.makeSchoolOption()}
                        onChange={this.chooseSchool}
                        placeholder='שייך לבית ספר' />

                    <label className='addStudentLabel'>כיתה:</label>
                    {
                        this.returnClassesSelections()
                    }

                    <div className='addSomethingNew addClassToStudent' onClick={this.addClassOption}>
                        <img className='addIcon' src={addicon}></img>
                        <p className='addTitle'>הוסף כיתה</p>
                    </div>
                </form>
                <button className="saveButton" onClick={this.saveButton}>שמור</button>
            </div>
        );
    }
}

export default withRouter(AddStudent);