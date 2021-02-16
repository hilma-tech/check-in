import { Slide } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../style/superAdmin/add_student_pop_up_style.scss"

class AddStudentPopUp extends React.Component {
    constructor(props) {
        console.log('props: ', props);
        super(props);
        this.state = {}
    }
    //moves the user to page where they
    //can add a row to the table they came from
    onClickAdd = () => {
        this.props.history.push(this.props.location.pathname + "Add");
    };
    render() {
        return (<>
            <div className="addStudentPopUpFlex">
                <p>העלאת קובץ</p>
                <p  onClick={this.onClickAdd}>הוספה ידנית</p>
            </div>
        </>);
    }
}

export default withRouter(AddStudentPopUp);