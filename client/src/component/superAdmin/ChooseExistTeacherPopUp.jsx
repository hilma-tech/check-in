import React, { Component } from "react";
import "../../style/superAdmin/form_style.scss";
import "../../style/superAdmin/add_game_style.scss";
import { withRouter } from "react-router-dom";
import { errorMsgContext } from "../../stores/error.store";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import { schoolsContext } from "../../stores/schools.store";
import { teachersContext } from "../../stores/teachers.store";
import "../../style/superAdmin/choose_exist_teacher_pop_up_style.scss"

class ChooseExistTeacherPopUp extends Component {
    constructor(props) {
        super();
        this.state = {
            teachers: []
        }
    }

    componentDidMount = () => {
        let existTeachersNotChosen = []
        for (let i = 0; i < this.props.existTeachers.length; i++) {
            let isChosen = false
            for(let z =  0; z < this.props.chosenTeachers.length; z++) {
                if(this.props.chosenTeachers[z].id === this.props.existTeachers[i].id){
                    isChosen = true
                }
            }
            if(!isChosen){
                existTeachersNotChosen.push(this.props.existTeachers[i])
            }
        }
        this.setState({teachers: existTeachersNotChosen})
    }

    render() {
        return (
            <>
                <div style={{ width: "90vw", height: "90vh", paddingTop: "8vh" }}>
                    <img
                        onClick={this.props.closeFunc}
                        alt=""
                        className="teacherAddCloseIcon"
                        src="/icons/ionic-ios-close.svg"
                    />
                    { this.state.teachers.length === 0 ? 
                    <p className="noTeacherCETPU">אין מורים שניתן להוסיף</p> :
                    <>
                    {this.state.teachers.map((teacher)=>{
                        return (
                        <div className="existTeacherOptionInfo" key={teacher.id} onClick={()=>{
                            this.props.addTeacherToClass(this.props.classIndex, teacher)
                            this.props.closeFunc()
                        }}>
                        <p className="existTeacherOptionName">{teacher.first_name + " " + teacher.last_name}</p>
                        <p className="existTeacherOptionEmail">{teacher.username}</p>
                    </div>
                        )})}
                    </>
                    }
                </div>
            </>
        );
    }
}

const mapContextToProps = {
    schools: schoolsContext,
    teachers: teachersContext,
    errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(withRouter(observer(ChooseExistTeacherPopUp)));
