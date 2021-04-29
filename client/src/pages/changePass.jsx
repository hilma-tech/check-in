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
  teacherPasswordValidation,
  stringValidation,
} from "../tools/ValidationFunctions";
import PopUpError from "../component/popUpError";
import axios from "axios";
import { EmptMsg, HideStyle } from "../tools/GlobalVarbs";

class ChangePass extends Component {
  constructor(props) {
    super();
    this.state = {
      token: "",
      newPassword: "",
      goback: false,
      errorMessages: [
        { toShow: HideStyle, mess: EmptMsg },
        { toShow: HideStyle, mess: EmptMsg },
      ],
    };
  }
  componentDidMount = () => {
    this.setState({ token: this.props.match.params.token });
  };
  updateUser = (props) => {
    this.setState({ username: props.target.value });
  };

  updatePass = (props) => {
    this.setState({ newPassword: props.target.value });
  };

  validateInputFields = () => {
    let passwordErr = teacherPasswordValidation(this.state.newPassword);
    let tokenErr = stringValidation(this.state.token);
    if (passwordErr.length !== 0) {
      //! false;
      this.props.errorMsg.setErrorMsg(`${passwordErr}`);
      return false
    }
    //------------token validation---------------
    else if (tokenErr.length !== 0) {
      //! false;
      this.props.errorMsg.setErrorMsg(`${tokenErr}`);
      return false
    } else {
      console.log("all good");
      return true
    }
  };

  sendNewPass = async () => {
    let validInfo = this.validateInputFields();
    if (validInfo) {
      await axios.post("/api/teacher/SaveNewPassword", {
        password: this.state.newPassword,
        token: this.state.token,
      });
      this.props.errorMsg.setErrorMsg("סיסמה שונתה בהצלחה!");
      this.setState({ goback: true });
    } else {
      return;
    }
  };

  goback = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="background">
        <PopUpError />
        <div className="centeredPage">
          <img className="webName" src="/icons/blueCheckIn.svg"></img>
          <p
            className="error"
            style={{ display: this.state.errorMessages[1].toShow }}
          >
            {this.state.errorMessages[1].mess}
          </p>
          {!this.state.goback ? (
            <input
              type="password"
              className="password input"
              placeholder="סיסמה חדשה"
              onBlur={this.updatePass}
            />
          ) : null}
          <br />

          {this.state.goback ? (
            <button className="signInButton" onClick={this.goback}>
              חזרה להתחברות{" "}
            </button>
          ) : (
            <button className="signInButton" onClick={this.sendNewPass}>
              שינוי סיסמה
            </button>
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

export default withContext(mapContextToProps)(withRouter(observer(ChangePass)));
