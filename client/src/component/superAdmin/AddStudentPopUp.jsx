import { FileInput, withFiles } from '@hilma/fileshandler-client';
import { withContext } from '@hilma/tools';
import { Slide } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { errorMsgContext } from '../../stores/error.store';
import { studentsContext } from '../../stores/students.store';
import "../../style/superAdmin/add_student_pop_up_style.scss"
import { emailValidation, classNameValidation, mustInputValidation, nameValidation, passwordValidation, schoolNameValidation, studentPasswordValidation, userNameValidation } from '../../tools/ValidationFunctions';

var xlsxParser = require('xlsx');
const axios = require("axios").default;

class AddStudentPopUp extends React.Component {
    constructor(props) {
        super();
        this.fileUploader = props.filesUploader;
    }
    //moves the user to page where they
    //can add a row to the table they came from
    onClickAdd = () => {
        this.props.history.push(this.props.location.pathname + "Add");
    };

    validationAndSavingData = async (e) => {
        let dataParse = "";
        let errorsMsg = []
        var data = e.target.result;
        let readedData = xlsxParser.read(data, { type: 'binary' });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];
        /* Convert array to json*/
        dataParse = xlsxParser.utils.sheet_to_json(ws);
        if (dataParse.length === 0) {
            this.props.errorMsg.setErrorMsg("הקובץ ריק. הכנס מידע בקובץ על מנת לשמור תלמידים")
        } else {
            for (let i = 0; i < dataParse.length; i++) {
                //------------ first name validation -----------------
                if (dataParse[i].firstName === undefined) {
                    errorsMsg.push(`חסר שם פרטי בשורה ${i + 1}.`)
                } else if (nameValidation(String(dataParse[i].firstName)).length !== 0) {
                    errorsMsg.push(`השם הפרטי של התלמיד בשורה ${i + 1} לא תקין.`)
                }

                //------------ last name validation ------------------
                if (dataParse[i].lastName === undefined) {
                    errorsMsg.push(`חסר שם משפחה בשורה ${i + 1}.`)
                } else if (nameValidation(String(dataParse[i].lastName)).length !== 0) {
                    errorsMsg.push(`השם המשפחה של התלמיד בשורה ${i + 1} לא תקין.`)
                }

                //------------ ussername validation --------------------
                if (dataParse[i].username === undefined) {
                    errorsMsg.push(`חסר שם משתמש בשורה ${i + 1}.`)
                } else if (userNameValidation(String(dataParse[i].username)).length !== 0) {
                    errorsMsg.push(`השם משתמש של התלמיד בשורה ${i + 1} לא תקין.`)
                }

                //------------ password validation ---------------------
                if (dataParse[i].password === undefined) {
                    errorsMsg.push(`חסרה סיסמא בשורה ${i + 1}.`)
                } else if (studentPasswordValidation(String(dataParse[i].password)).length !== 0) {
                    errorsMsg.push(`הסיסמא של התלמיד בשורה ${i + 1} לא תקינה.`)
                }

                //--------------- school validation --------------------
                if (dataParse[i].schoolName === undefined) {
                    errorsMsg.push(`חסר בית ספר בשורה ${i + 1}.`)
                } else if (schoolNameValidation(String(dataParse[i].schoolName)).length !== 0) {
                    errorsMsg.push(`הבית ספר של התלמיד בשורה ${i + 1} לא תקין.`)
                }

                //--------------- classes validation --------------------
                if (dataParse[i].classes === undefined) {
                    dataParse[i].classrooms = []
                } else {
                    if (typeof dataParse[i].classes === "string") {
                        let studentClasses = dataParse[i].classes.split(",")
                        studentClasses.forEach((studentClass, index) => {
                            if (classNameValidation(studentClass.trim()).length !== 0) {
                                errorsMsg.push(`הכיתה ה${index + 1} בשורה ${i + 1} לא תקינה.`)
                            }
                            studentClasses[index] = studentClass.trim()
                        })
                        dataParse[i].classrooms = studentClasses
                    } else {
                        errorsMsg.push(`הכיתות של התלמיד בשורה ${i + 1} לא תקינות.`)
                    }
                }
            }

            if (errorsMsg.length === 0) {
                try {
                    let { data } = await axios.post("/api/student/multiRegister", dataParse);
                    if (data.success) {
                        this.props.students.addMultiStudents(data.students)
                        this.props.errorMsg.setErrorMsg('כל התלמידים נשמרו בהצלחה.');
                    } else {
                        this.props.errorMsg.setErrorMsg(data.errorsMsg)
                    }
                }
                catch (e) {
                    this.props.errorMsg.setErrorMsg("הייתה שגיאה בשרת. לא ניתן לשמור את התלמידים.")
                }
            } else {
                this.props.errorMsg.setErrorMsg(errorsMsg)
            }
        }
    }

    uploadFile = (props) => {
        props.preventDefault();
        const files = props.target.files;
        const targetFile = files[0];
        if (targetFile === undefined) {
            return;
        }
        if (targetFile) {
            if (targetFile.type === "application/vnd.ms-excel" ||
                targetFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                targetFile.type === "application/vnd.oasis.opendocument.spreadsheet") {
                var reader = new FileReader();
                reader.onload = this.validationAndSavingData
                reader.readAsBinaryString(targetFile);
            }
            else {
                this.props.errorMsg.setErrorMsg(
                    "הפורמט של הקובץ לא מתאים. עליך להעלות קובץ אקסל"
                );
            }
        }
        props.target.value = ""
    }
    
    render() {
        return (<>
            <div className="addStudentPopUpFlex">
                <label>
                    <input type="file"
                        className="hiddenInput"
                        onChange={this.uploadFile}
                        // onClick={(props)=>{props.target.files = {length: 0}}}
                        accept=".xlr,.xlsx,.xlsm,.xlsb,.xltx,.xltm,.xls,.xlt,.xml,.xlam,.xla,.xlw,.ods"></input>
                    <p>העלאת קובץ</p>
                </label>
                <p onClick={this.onClickAdd}>הוספה ידנית</p>
            </div>
        </>);
    }
}

const mapContextToProps = {
    errorMsg: errorMsgContext,
    students: studentsContext,
};

export default withContext(mapContextToProps)(
    withFiles(withRouter(observer(AddStudentPopUp)))
);