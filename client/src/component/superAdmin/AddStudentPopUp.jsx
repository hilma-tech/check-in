import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../style/superAdmin/add_student_pop_up_style.scss"
import { HideStyle } from '../../tools/GlobalVarbs';
import ExcelStudentsAddition from './ExcelStudentsAddition';

class AddStudentPopUp extends React.Component {
    constructor() {
        super()
        this.state = {
            showExcelPopUp: false
        }
    }
    //moves the user to page where they
    //can add a row to the table they came from
    onClickAdd = () => {
        this.props.history.push(this.props.location.pathname + "Add");
    };
    changeStateExcelPopUp = () => {
        this.setState((prevState) => {
            return { showExcelPopUp: !prevState.showExcelPopUp }
        })
    }

    render() {
        return (<>
            <ExcelStudentsAddition toShow={this.state.showExcelPopUp} handleState={this.changeStateExcelPopUp} />
            <div className="addStudentPopUpFlex" style={{display: !this.state.showExcelPopUp ? "" : HideStyle}}>
                <p onClick={this.changeStateExcelPopUp}>העלאת קובץ</p>
                <p onClick={this.onClickAdd}>הוספה ידנית</p>
            </div>
        </>);
    }
}

export default withRouter(AddStudentPopUp);