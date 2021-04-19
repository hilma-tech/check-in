import React, { Component } from "react";
import Select from "react-select";
import addicon from "../../img/addicon.svg";
import WhiteBar from "../../component/superAdmin/ArrowNavBar.jsx";
import ClassSelection from "../../component/superAdmin/ClassSelection.jsx";
import "../../style/superAdmin/form_style.scss";
import "../../style/superAdmin/add_game_style.scss";
import SelectStyle from "../../style/superAdmin/select_style";
import {
    nameValidation,
    mustInputValidation,
    emailValidation,
    teacherPasswordValidation,
} from "../../tools/ValidationFunctions";
import { withRouter } from "react-router-dom";
import { errorMsgContext } from "../../stores/error.store";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import { schoolsContext } from "../../stores/schools.store";
import { teachersContext } from "../../stores/teachers.store";
import "../../style/superAdmin/add_teacher_pop_up_style.scss"
const axios = require("axios").default;

class AddTeacherPopUp extends Component {
    constructor() {
        super();
        this.rakazOptions = [
            { value: "true", label: "כן" },
            { value: "false", label: "לא" },
        ];
        this.state = {
            teacherFirstName: "",
            teacherLastName: "",
            email: "",
            password: "",
            rakaz: "false",
            teacherFirstNameError: { toShow: "none", mess: "" },
            teacherLastNameError: { toShow: "none", mess: "" },
            emailNameError: { toShow: "none", mess: "" },
            passwordNameError: { toShow: "none", mess: "" },
            rakazError: { toShow: "none", mess: "" },
        };
    }

    saveTFirstName = (props) => {
        let myprops = props.target;
        this.setState({ teacherFirstName: myprops.value });
    };
    saveTLastName = (props) => {
        let myprops = props.target;
        this.setState({ teacherLastName: myprops.value });
    };

    saveRole = (props) => {
        this.setState((prevState) => {
            let prevRole = prevState.rakaz;
            prevRole = props.value;
            return { rakaz: prevRole };
        });
    };

    saveEmail = (props) => {
        let myprops = props.target;
        this.setState({ email: myprops.value });
    };

    savePassword = (props) => {
        let myprops = props.target;
        this.setState({ password: myprops.value });
    };


    validateInputFields = (e) => {
        e.preventDefault();
        let allOk = true;
        // ----------teacher name validetion-------------------
        let firstNameTeacherMess = nameValidation(this.state.teacherFirstName);
        if (firstNameTeacherMess.length !== 0) {
            this.setState((prevState) => {
                prevState.teacherFirstNameError.toShow = "inline-block";
                prevState.teacherFirstNameError.mess = firstNameTeacherMess;
                return { teacherFirstNameError: prevState.teacherFirstNameError };
            });
            allOk = false;
        } else {
            this.setState({ teacherFirstNameError: { toShow: "none", mess: "" } });
        }

        let lastNameTeacherMess = nameValidation(this.state.teacherLastName);
        if (lastNameTeacherMess.length !== 0) {
            this.setState((prevState) => {
                prevState.teacherLastNameError.toShow = "inline-block";
                prevState.teacherLastNameError.mess = lastNameTeacherMess;
                return { teacherLastNameError: prevState.teacherLastNameError };
            });
            allOk = false;
        } else {
            this.setState({ teacherLastNameError: { toShow: "none", mess: "" } });
        }
        // ----------rakaz validation-------------------
        let rakazMess = mustInputValidation(this.state.rakaz);
        if (rakazMess.length !== 0) {
            this.setState((prevState) => {
                prevState.rakazError.toShow = "inline-block";
                prevState.rakazError.mess = rakazMess;
                return { rakazError: prevState.rakazError };
            });
            allOk = false;
        } else {
            this.setState({ rakazError: { toShow: "none", mess: "" } });
        }
        //------------email validation---------------
        let emailMess = emailValidation(this.state.email);
        if (emailMess.length !== 0) {
            this.setState((prevState) => {
                prevState.emailNameError.toShow = "inline-block";
                prevState.emailNameError.mess = emailMess;
                return { emailNameError: prevState.emailNameError };
            });
            allOk = false;
        } else {
            this.setState({ emailNameError: { toShow: "none", mess: "" } });
        }
        // ----------password validation-------------------
        let passwordMess = teacherPasswordValidation(this.state.password);
        if (passwordMess.length !== 0) {
            this.setState((prevState) => {
                prevState.passwordNameError.toShow = "inline-block";
                prevState.passwordNameError.mess = passwordMess;
                return { passwordNameError: prevState.passwordNameError };
            });
            allOk = false;
        } else {
            this.setState({ passwordNameError: { toShow: "none", mess: "" } });
        }

        //after all the validetion we need to send the data to sql
        if (allOk) {
            this.saveTeacherInDB();
        }
    };

    saveTeacherInDB = async () => {
        //add in the school page the info and save the teacher after save the school
        this.props.addTeacherToClass(this.props.classIndex ,{
            first_name: this.state.teacherFirstName,
            last_name: this.state.teacherLastName,
            name: this.state.teacherFirstName + " " + this.state.teacherLastName ,
            email: this.state.email,
            password: this.state.password,
            username: this.state.email
        })
        this.props.closeFunc()
    };

    render() {
        return (
            <>
                <div style={{width: "90vw", height: "90vh", paddingTop: "5vh"}}>
                <img
                            onClick={this.props.closeFunc}
                            alt=""
                            className="teacherAddCloseIcon"
                            src="/icons/ionic-ios-close.svg"
                        />
                    <form className="formData">
                        {/* מורה */}
                        <label className="labelFields">* שם פרטי:</label>
                        <p
                            className="error"
                            style={{ display: this.state.teacherFirstNameError.toShow }}
                        >
                            {this.state.teacherFirstNameError.mess}
                        </p>
                        <input
                            className="inputFields"
                            type="text"
                            placeholder="הכנס שם פרטי..."
                            onBlur={this.saveTFirstName}
                        />
                        <label className="labelFields">* שם משפחה:</label>
                        <p
                            className="error"
                            style={{ display: this.state.teacherLastNameError.toShow }}
                        >
                            {this.state.teacherLastNameError.mess}
                        </p>
                        <input
                            className="inputFields"
                            type="text"
                            placeholder="הכנס שם משפחה..."
                            onBlur={this.saveTLastName}
                        />
                        {/* אימייל */}
                        <label className="labelFields">* אימייל:</label>
                        <p
                            className="error"
                            style={{ display: this.state.emailNameError.toShow }}
                        >
                            {this.state.emailNameError.mess}
                        </p>
                        <input
                            className="inputFields"
                            onBlur={this.saveEmail}
                            type="text"
                            placeholder="הכנס כתובת מייל..."
                        />
                        {/* סיסמא */}
                        <label className="labelFields">* סיסמא:</label>
                        <p
                            className="error"
                            style={{ display: this.state.passwordNameError.toShow }}
                        >
                            {this.state.passwordNameError.mess}
                        </p>
                        <input
                            className="inputFields"
                            onBlur={this.savePassword}
                            type="text"
                            placeholder="הכנס סיסמא..."
                        />
                    </form>

                        <button className="saveButtonTAddPopUp" onClick={this.validateInputFields}>
                            שמור
                        </button>
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

export default withContext(mapContextToProps)(withRouter(observer(AddTeacherPopUp)));
