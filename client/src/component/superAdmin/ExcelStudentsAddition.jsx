import { observer } from 'mobx-react';
import { FileInput, withFiles } from '@hilma/fileshandler-client';
import { withContext } from '@hilma/tools';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { errorMsgContext } from '../../stores/error.store';
import { studentsContext } from '../../stores/students.store';
import "../../style/superAdmin/excel_students_addition_style.scss"
import { classNameValidation, nameValidation, schoolNameValidation, studentPasswordValidation, userNameValidation } from '../../tools/ValidationFunctions';
import { CircularProgress, Dialog } from '@material-ui/core';

var xlsxParser = require('xlsx');
const axios = require("axios").default;

class ExcelStudentsAddition extends React.Component {
    constructor(props) {
        super();
        this.state = {
            startSaveStudents: false
        }
        this.fileUploader = props.filesUploader;
    }

    validationAndSavingData = async (e) => {
        let dataParse = "";
        let errorsMsg = []
        var data = e.target.result;
        let readedData = xlsxParser.read(data, { type: 'binary' });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];
        /* Convert array to json*/
        dataParse = xlsxParser.utils.sheet_to_json(ws);

        this.setState({ startSaveStudents: true })
        if (dataParse.length === 0) {
            this.setState({ startSaveStudents: false })
            this.props.errorMsg.setErrorMsg("הקובץ ריק. הכנס מידע בקובץ על מנת לשמור תלמידים")
        } else {
            for (let i = 0; i < dataParse.length; i++) {
                //------------ first name validation -----------------
                if (dataParse[i].firstName === undefined) {
                    errorsMsg.push(`חסר שם פרטי בשורה ${i + 2}`)
                } else if (nameValidation(String(dataParse[i].firstName)).length !== 0) {
                    errorsMsg.push(`שם הפרטי של התלמיד בשורה ${i + 2} לא תקין`)
                }

                //------------ last name validation ------------------
                if (dataParse[i].lastName === undefined) {
                    errorsMsg.push(`חסר שם משפחה בשורה ${i + 2}`)
                } else if (nameValidation(String(dataParse[i].lastName)).length !== 0) {
                    errorsMsg.push(`שם המשפחה של התלמיד בשורה ${i + 2} לא תקין`)
                }

                //------------ ussername validation --------------------
                if (dataParse[i].username === undefined) {
                    errorsMsg.push(`חסר שם משתמש בשורה ${i + 2}`)
                } else if (userNameValidation(String(dataParse[i].username)).length !== 0) {
                    errorsMsg.push(`שם המשתמש של התלמיד בשורה ${i + 2} לא תקין`)
                }

                //------------ password validation ---------------------
                if (dataParse[i].password === undefined) {
                    errorsMsg.push(`חסרה סיסמא בשורה ${i + 2}`)
                } else if (studentPasswordValidation(String(dataParse[i].password)).length !== 0) {
                    errorsMsg.push(`הסיסמא של התלמיד בשורה ${i + 2} לא תקינה`)
                }

                //--------------- school validation --------------------
                if (dataParse[i].schoolName === undefined) {
                    errorsMsg.push(`חסר בית ספר בשורה ${i + 2}`)
                } else if (schoolNameValidation(String(dataParse[i].schoolName)).length !== 0) {
                    errorsMsg.push(`בית הספר של התלמיד בשורה ${i + 2} לא תקין`)
                }

                //--------------- classes validation --------------------
                if (dataParse[i].classes === undefined) {
                    dataParse[i].userClassrooms = []
                } else {
                    dataParse[i].classes = String(dataParse[i].classes)
                    let studentClasses = dataParse[i].classes.split(",")
                    studentClasses.forEach((studentClass, index) => {
                        if (classNameValidation(studentClass.trim()).length !== 0) {
                            errorsMsg.push(`הכיתה ${studentClass.trim()} בשורה ${i + 2} לא תקינה`)
                        }
                        studentClasses[index] = studentClass.trim()
                    })
                    dataParse[i].userClassrooms = studentClasses
                }
            }

            // --------------- usernames dont duplicates ----------------
            let allUsernames = dataParse.map((row) => {
                return row.username
            })
            let uniqueUsernames = [...new Set(allUsernames)]
            if (allUsernames.length !== uniqueUsernames.length) {
                errorsMsg.push('לא יכולים להיות שני משתמשים עם אותו שם משתמש')
            }

            if (errorsMsg.length === 0) {
                try {
                    let { data } = await axios.post("/api/student/multiRegister", dataParse);
                    if (data.success) {
                        this.props.students.addMultiStudents(data.students)
                        this.setState({ startSaveStudents: false })
                        this.props.errorMsg.setErrorMsg('כל התלמידים נשמרו בהצלחה.');
                    } else {
                        this.setState({ startSaveStudents: false })
                        this.props.errorMsg.setErrorMsg(data.errorsMsg)
                    }
                }
                catch (e) {
                    this.setState({ startSaveStudents: false })
                    this.props.errorMsg.setErrorMsg("הייתה שגיאה בשרת. לא ניתן לשמור את התלמידים.")
                }
            } else {
                this.setState({ startSaveStudents: false })
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
        return (
            <>
                <div className="excelStudentAddBackground" style={{ display: this.props.toShow ? "" : "none" }}>
                    <div className="excelStudentAdd">
                        <img
                            onClick={this.props.handleState}
                            alt=""
                            className="excelStudentAddCloseIcon"
                            src="/icons/ionic-ios-close.svg"
                        />
                        <h1 className="excelStudentAddTitle">העלאת קובץ אקסל</h1>
                        <h2 className="excelStudentAddDesc">להלן דוגמה של מבנה קובץ</h2>
                        <img alt="excel example" className="excelStudentAddExample" src="/images/excelExample.png" />
                        <label
                            className="showMoreGamesB"
                            style={{ marginTop: "1vh", paddingRight: "1vw", paddingLeft: "1vw", paddingBottom: "0.25vh" }}
                        >
                            <input type="file"
                                onClick={this.props.handleState}
                                className="hiddenInput"
                                onChange={this.uploadFile}
                                accept=".xlr,.xlsx,.xlsm,.xlsb,.xltx,.xltm,.xls,.xlt,.xml,.xlam,.xla,.xlw,.ods"></input>
                    העלאת קובץ
                  </label>
                    </div>
                </div>
                <Dialog
                    open={this.state.startSaveStudents}
                >
                    <CircularProgress size="1.5rem" style={{ position: 'fixed', top: '50vh' }} />
                </Dialog>
            </>
        );
    }
}

const mapContextToProps = {
    errorMsg: errorMsgContext,
    students: studentsContext,
};

export default withContext(mapContextToProps)(
    withFiles(withRouter(observer(ExcelStudentsAddition)))
);