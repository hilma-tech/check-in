import React from "react";
import { Component } from "react";
import "../style/sign_in.scss";
import hilmaicon from "../img/hilmaIcon.svg";
import { withRouter } from "react-router-dom";
import { withContext } from "@hilma/tools";
import { userNameContext } from "../stores/userName.store";
import { errorMsgContext } from "../stores/error.store";
import { observer } from "mobx-react";
import { IsAuthenticatedContext, LoginContext, AuthContext } from "@hilma/auth";
import {
  passwordValidation,
  emailValidation,
} from "../tools/ValidationFunctions";
import axios from "axios";
import { EmptMsg, HideStyle, OnUnauthorizedError } from "../tools/GlobalVarbs";

class SignIn extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessages: [
        { toShow: HideStyle, mess: EmptMsg },
        { toShow: HideStyle, mess: EmptMsg },
      ],
    };
  }

  componentDidMount = async () => {
    //! gives the type picked in the initial page
    if (!this.props.location.state.data) {
      this.props.history.push("/");
    }
    //
  };

  moveToInitialPage = async () => {
    this.props.history.goBack();
  };

  updateUser = (props) => {
    this.setState({ username: props.target.value });
  };

  updatePass = (props) => {
    this.setState({ password: props.target.value });
  };

  teacherForgotPass = async () => {
     await axios.post("/api/teacher/sendNewPassEmail",{email:this.state.username});
     this.props.errorMsg.setErrorMsg('נשלח לך אימייל לשינוי הסיסמה')
  }

  login = async () => {
    let username = this.state.username;
    let password = this.state.password;
    try {
      if (
        emailValidation(username).length === 0 &&
        passwordValidation(password).length === 0
      ) {
        const response = await this.props.LoginContext(
          `/api/${this.props.location.state.data}/login`,
          {
            username,
            password,
          }
        );
        if (response.success) {
          if (response.user.type === "Teacher") {
            this.props.history.push("/teacher/classes");
          } else {
            this.props.history.push("/superAdmin/games");
          }
        } else {
          if (response.msg.status === OnUnauthorizedError) {
            if (response.msg.data.key === "EmailNotVerified") {
              this.props.errorMsg.setErrorMsg("יש לאמת את כתובת האימייל");
            } else {
              this.props.errorMsg.setErrorMsg("שם המשתמש והסיסמא אינם תואמים.");
            }
          } else {
            this.props.errorMsg.setErrorMsg(
              "הייתה שגיאה בשרת. לא ניתן להתחבר."
            );
          }
        }
      } else {
        if (username.length === 0 || password.length === 0) {
          this.props.errorMsg.setErrorMsg("נא למלא את כל השדות.");
        } else {
          throw { status: OnUnauthorizedError };
        }
      }
    } catch (error) {
      if (error.status === OnUnauthorizedError) {
        this.props.errorMsg.setErrorMsg("שם המשתמש והסיסמא אינם תואמים.");
      } else {
        this.props.errorMsg.setErrorMsg("הייתה שגיאה בשרת. לא ניתן להתחבר.");
      }
    }
  };

  render() {
    return (
      <div className="background">
        <img
          alt="small back arrow"
          className="signInBackArrow"
          src="/icons/awesome-arrow-right.svg"
          onClick={this.moveToInitialPage}
        />
        <div className="centeredPage">
          <img className="webName" src="/icons/blueCheckIn.svg"></img>
          <p
            className="error"
            style={{ display: this.state.errorMessages[0].toShow }}
          >
            {this.state.errorMessages[0].mess}
          </p>
          <input
            className="username input"
            placeholder="כתובת מייל"
            onBlur={this.updateUser}
          />
          <br />
          <p
            className="error"
            style={{ display: this.state.errorMessages[1].toShow }}
          >
            {this.state.errorMessages[1].mess}
          </p>
          <input
            type="password"
            className="password input"
            placeholder="סיסמא"
            onBlur={this.updatePass}
          />
          <br />
          <button className="signInButton" onClick={this.login}>
            כניסה
          </button>
          {this.props.location.state.data === "teacher" ? (
            <h3 className="forgot" onClick={this.teacherForgotPass}>שכחתם את הסיסמא? לחצו כאן</h3>
          ) : (
            <></>
          )}

          <img alt="hilma logo" className="hilmalogo" src={hilmaicon} />
        </div>
      </div>
    );
  }
}

const mapContextToProps = {
  name: userNameContext,
  errorMsg: errorMsgContext,
  isAuthenticated: IsAuthenticatedContext,
  LoginContext: LoginContext,
  AuthContext: AuthContext,
};

export default withContext(mapContextToProps)(withRouter(observer(SignIn)));
