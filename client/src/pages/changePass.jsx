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

class SignIn extends Component {
  constructor(props) {
    super();
    this.state = {
      token: "",
      username: "",
      newPassword: "",
      errorMessages: [
        { toShow: "none", mess: "" },
        { toShow: "none", mess: "" },
      ],
    };
  }
  componentDidMount =()=>{
      this.setState({token:this.props.match.params.token})
  }
  updateUser = (props) => {
    this.setState({ username: props.target.value });
  };

  updatePass = (props) => {
    this.setState({ newPassword: props.target.value });
  };



  sendNewPass = async () => {
    const { data } = await axios.post("/api/teacher/SaveNewPassword",{email:this.state.username, password:this.state.newPassword,token:this.state.token });
  };

  render() {
    return (
      <div className="background">
        <div className="centeredPage">
          <img className="webName" src="/icons/blueCheckIn.svg"></img>
          <p
            className="error"
            style={{ display: this.state.errorMessages[1].toShow }}
          >
            {this.state.errorMessages[1].mess}
          </p>
          <input
            type="password"
            className="password input"
            placeholder="סיסמה חדשה"
            onBlur={this.updatePass}
          />
          <br />
          <button
            className="signInButton"
            onClick={this.sendNewPass}
          >
            שינוי סיסמה
          </button>

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
