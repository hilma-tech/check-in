import { FileInput, withFiles } from '@hilma/fileshandler-client';
import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../style/superAdmin/add_student_pop_up_style.scss"
import ExcelStudentsAddition from './ExcelStudentsAddition';

class AddStudentPopUp extends React.Component {
    constructor() {
        super()
    }
    //moves the user to page where they
    //can add a row to the table they came from
    onClickAdd = () => {
        this.props.history.push(this.props.location.pathname + "Add");
    };
    
    render() {
        return (<>
        <ExcelStudentsAddition />
            <div className="addStudentPopUpFlex">
                {/* <label>
                    <input type="file"
                        className="hiddenInput"
                        onChange={this.uploadFile}
                        // onClick={(props)=>{props.target.files = {length: 0}}}
                        accept=".xlr,.xlsx,.xlsm,.xlsb,.xltx,.xltm,.xls,.xlt,.xml,.xlam,.xla,.xlw,.ods"></input> */}
                    <p>העלאת קובץ</p>
                {/* </label> */}
                <p onClick={this.onClickAdd}>הוספה ידנית</p>
            </div>
        </>);
    }
}

export default withRouter(AddStudentPopUp);