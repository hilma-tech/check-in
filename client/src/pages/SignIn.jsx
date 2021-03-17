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

class SignIn extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessages: [
        { toShow: "none", mess: "" },
        { toShow: "none", mess: "" },
      ],
    };
  }

  componentDidMount = async () => {
    //! gives the type picked in the initial page
    console.log("state", this.props.location.state.data );

    
    let isAuthed = this.props.isAuthenticated;
    if (isAuthed === true) {
      let kl = atob(this.props.AuthContext.kls.kl);
      kl = kl.replace('["', "");
      kl = kl.replace('"]', "");
      if (kl == "mlkdsef98uxmwieau89" || kl == "mxdired9432udxjdoi8e") {
        this.props.history.push("/teacher/classes");
      } else {
        this.props.history.push("/superAdmin/games");
      }
    }
  };

  updateUser = (props) => {
    this.setState({ username: props.target.value });
  };

  updatePass = (props) => {
    this.setState({ password: props.target.value });
  };

  login = async () => {
    let username = this.state.username;
    let password = this.state.password;
    try {
      if (
        emailValidation(username).length === 0 &&
        passwordValidation(password).length === 0
      ) {
        const response = await this.props.LoginContext("/api/login", {
          username,
          password,
        });
        if (response.success) {
          if (response.user.type === "Teacher") {
            this.props.history.push("/teacher/classes");
          } else {
            this.props.history.push("/superAdmin/games");
            window.location.pathname = "/superAdmin/games";
          }
        } else {
          if (response.msg.status === 401) {
            this.props.errorMsg.setErrorMsg("שם המשתמש והסיסמא אינם תואמים.");
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
          throw { status: 401 };
        }
      }
    } catch (error) {
      if (error.status === 401) {
        this.props.errorMsg.setErrorMsg("שם המשתמש והסיסמא אינם תואמים.");
      } else {
        this.props.errorMsg.setErrorMsg("הייתה שגיאה בשרת. לא ניתן להתחבר.");
      }
    }
  };

  render() {
    return (
      <div className="background">
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
          {/* <h3 className="forgot">שכחת סיסמא?</h3> */}
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
