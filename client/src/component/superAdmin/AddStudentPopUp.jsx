import { FileInput, withFiles } from '@hilma/fileshandler-client';
import { withContext } from '@hilma/tools';
import { Slide } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { errorMsgContext } from '../../stores/error.store';
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
        console.log('props: ', props.target.files);
        props.preventDefault();
        const files = props.target.files;
        const targetFile = files[0];
        if(targetFile === undefined){
            return;
        }
        console.log('targetFile.type: ', targetFile.type);
        let dataParse = "";
        let isOk = true;
        let errorsMsg = []
        let openPopUpError = (msg) => {
            this.props.errorMsg.setErrorMsg(msg);
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
                    dataParse = xlsxParser.utils.sheet_to_json(ws, { header: 1 });
                    console.log('dataParse: ', dataParse);
                    if (dataParse.length === 0) {
                        openPopUpError("הקובץ ריק. הכנס מידע בקובץ על מנת לשמור תלמידים")
                    } else {
                        for (let i = 0; i < dataParse.length; i++) {
                            console.log('i: ', i);
                            for (let j = 0; j < 5; j++) {
                                if (dataParse[i][j] === undefined) {
                                    errorsMsg.push(`חסר מידע בשורה ${i + 1}.`)
                                } else if (j === 0 && nameValidation(String(dataParse[i][j])).length !== 0) {
                                    errorsMsg.push(`השם הפרטי של התלמיד בשורה ${i + 1} לא תקין.`)
                                } else if (j === 1 && nameValidation(String(dataParse[i][j])).length !== 0) {
                                    errorsMsg.push(`השם המשפחה של התלמיד בשורה ${i + 1} לא תקין.`)
                                } else if (j === 2 && userNameValidation(String(dataParse[i][j])).length !== 0) {
                                    errorsMsg.push(`השם משתמש של התלמיד בשורה ${i + 1} לא תקין.`)
                                } else if (j === 3 && studentPasswordValidation(String(dataParse[i][j])).length !== 0) {
                                    errorsMsg.push(`הסיסמה של התלמיד בשורה ${i + 1} לא תקינה.`)
                                } else if (j === 4 && schoolNameValidation(String(dataParse[i][j])).length !== 0) {
                                    errorsMsg.push(`הבית ספר של התלמיד בשורה ${i + 1} לא תקין.`)
                                }
                            }
                        }
                        if (errorsMsg.length === 0) {
                            try {
                                let {data} = await axios.post("/api/student/multiRegister", dataParse);
                                if (!data.success){
                                    openPopUpError(data.errorsMsg.map((errMsg, i)=>{
                                        return <p key={i}>{errMsg}</p>
                                    }))
                                }else {
                                    openPopUpError('כל התלמידים נשמרו בהצלחה.')
                                }
                                // console.log('response: ', response);
                            }
                            catch (e) {
                                console.log(e);
                                openPopUpError("הייתה שגיאה בשרת. לא ניתן לשמור את התלמידים.")
                            }
                        } else {
                            openPopUpError(errorsMsg.map((errMsg, i)=>{
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
                        accept=".xls,.xlt,.xlm,.xlsxParser,.xlsm,.xltx,.xltm,.xlsb,.xla,.xlam,.xll,.xlw,.ods"></input>
                    <p>העלאת קובץ</p>
                </label>
                <p onClick={this.onClickAdd}>הוספה ידנית</p>
            </div>
        </>);
    }
}

const mapContextToProps = {
    errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(
    withFiles(withRouter(observer(AddStudentPopUp)))
);