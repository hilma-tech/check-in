import { FileInput, withFiles } from '@hilma/fileshandler-client';
import { withContext } from '@hilma/tools';
import { Slide } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { errorMsgContext } from '../../stores/error.store';
import { studentsContext } from '../../stores/students.store';
import "../../style/superAdmin/add_student_pop_up_style.scss"
import { emailValidation, mustInputValidation, nameValidation, passwordValidation, schoolNameValidation, studentPasswordValidation, userNameValidation } from '../../tools/ValidationFunctions';

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

    uploadFile = (props) => {
        props.preventDefault();
        const files = props.target.files;
        const targetFile = files[0];
        if (targetFile === undefined) {
            return;
        }
        let dataParse = "";
        let isOk = true;
        let errorsMsg = []
        let openPopUpError = (msg) => {
            this.props.errorMsg.setErrorMsg(msg);
        }
        let addStudentToTheList = (studentsInfo) => {
            if (!this.props.students.haveMoreStudents) {
                this.props.students.addMultiStudents(studentsInfo)
            } else {
                this.props.students.listDataStudents = []
                this.props.students.getStudents()
            }
            this.props.errorMsg.setErrorMsg('כל התלמידים נשמרו בהצלחה.');
        }
        if (targetFile) {
            if (targetFile.type === "application/vnd.ms-excel" ||
                targetFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                targetFile.type === "application/vnd.oasis.opendocument.spreadsheet") {
                var reader = new FileReader();
                reader.onload = async function (e) {
                    var data = e.target.result;
                    let readedData = xlsxParser.read(data, { type: 'binary' });
                    const wsname = readedData.SheetNames[0];
                    const ws = readedData.Sheets[wsname];
                    /* Convert array to json*/
                    dataParse = xlsxParser.utils.sheet_to_json(ws);
                    if (dataParse.length === 0) {
                        openPopUpError("הקובץ ריק. הכנס מידע בקובץ על מנת לשמור תלמידים")
                    } else {
                        for (let i = 0; i < dataParse.length; i++) {
                            if (dataParse[i].firstName === undefined || dataParse[i].lastName === undefined || dataParse[i].username === undefined || dataParse[i].password === undefined || dataParse[i].schoolName === undefined) {
                                errorsMsg.push(`חסר מידע בשורה ${i + 1}.`)
                            } else if (nameValidation(String(dataParse[i].firstName)).length !== 0) {
                                errorsMsg.push(`השם הפרטי של התלמיד בשורה ${i + 1} לא תקין.`)
                            } else if (nameValidation(String(dataParse[i].lastName)).length !== 0) {
                                errorsMsg.push(`השם המשפחה של התלמיד בשורה ${i + 1} לא תקין.`)
                            } else if (userNameValidation(String(dataParse[i].username)).length !== 0) {
                                errorsMsg.push(`השם משתמש של התלמיד בשורה ${i + 1} לא תקין.`)
                            } else if (studentPasswordValidation(String(dataParse[i].password)).length !== 0) {
                                errorsMsg.push(`הסיסמה של התלמיד בשורה ${i + 1} לא תקינה.`)
                            } else if (schoolNameValidation(String(dataParse[i].schoolName)).length !== 0) {
                                errorsMsg.push(`הבית ספר של התלמיד בשורה ${i + 1} לא תקין.`)
                            }
                        }
                        if (errorsMsg.length === 0) {
                            try {
                                let { data } = await axios.post("/api/student/multiRegister", dataParse);
                                if (data.success) {
                                    addStudentToTheList(data.students)
                                } else {
                                    openPopUpError(data.errorsMsg.map((errMsg, i) => {
                                        return <p key={i}>{errMsg}</p>
                                    }))
                                }
                            }
                            catch (e) {
                                openPopUpError("הייתה שגיאה בשרת. לא ניתן לשמור את התלמידים.")
                            }
                        } else {
                            openPopUpError(errorsMsg.map((errMsg, i) => {
                                return <p key={i}>{errMsg}</p>
                            }))
                        }
                    }
                }
                reader.readAsBinaryString(targetFile);
            }
            else {
                this.props.errorMsg.setErrorMsg(
                    "הפורמט של הקובץ לא מתאים. עליך להעלות קובץ אקסל"
                );
            }
        }
    }
    render() {
        return (<>
            <div className="addStudentPopUpFlex">
                <label>
                    <input type="file"
                        className="hiddenInput"
                        onChange={this.uploadFile}
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