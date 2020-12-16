import React from "react";
import { Component } from "react";
import "../style/sign_in.css";
import hilmaicon from "../img/hilmaIcon.svg";
import { withRouter } from "react-router-dom";
import { withContext } from "@hilma/tools";
import { nameContext } from "../stores/name.store";
import { errorMsgContext } from "../stores/error.store";
import { observer } from "mobx-react";
import { IsAuthenticatedContext } from '@hilma/auth';
import {passwordValidation, emailValidation} from '../tools/ValidationFunctions'

const axios = require("axios").default;

class SignIn extends Component {
  constructor() {
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

  componentDidMount=() => {
    let isAuthed = this.props.isAuthenticated
  if (isAuthed === true) {
    this.props.history.push("/superAdmin/games")
  }
  }

  updateUser = (props) => {
    this.setState({ username: props.target.value });
  };

  updatePass = (props) => {
    this.setState({ password: props.target.value });
  };

  superAdminLogin = async () => {
    let username = this.state.username;
    let password = this.state.password;
    try {
      if (emailValidation(username).length === 0 && passwordValidation(password).length === 0){
        const response = await axios.post("/api/super-admin/login", {
          username: username,
          password: password,
        });
        
        this.props.history.push("/superAdmin/games");
        window.location.pathname = "/superAdmin/games"
      } else {
        if(username.length === 0 || password.length === 0){
          this.props.errorMsg.setErrorMsg('נא למלא את כל השדות.');
        } else{
          throw {status: 401}
        }
      }
    } catch (error) {
      if(error.status === 401){
        this.props.errorMsg.setErrorMsg('שם המשתמש והסיסמא אינם תואמים.');
      } else {
        this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת. לא ניתן להתחבר.');
      }
      }
  };

  saveData = () => {
    this.superAdminLogin();
    // this.props.name.setName('aaaa')
    // dataArray.map((value, index) => {
    //   if (value.length === 0) {
    //     this.setState((prevState) => {
    //       prevState.errorMessages[index].toShow = "block";
    //       prevState.errorMessages[index].mess = "** שדה זה חייב להיות מלא **";
    //       return { errorMessages: prevState.errorMessages };
    //     });
    //   } else if (value.length < 8) {
    //     this.setState((prevState) => {
    //       prevState.errorMessages[index].toShow = "block";
    //       prevState.errorMessages[index].mess =
    //         "** שדה זה חייב להיות בעל 8 תווים לפחות **";
    //       return { errorMessages: prevState.errorMessages };
    //     });
    //   } else {
    //     this.setState((prevState) => {
    //       prevState.errorMessages[index].toShow = "none";
    //       prevState.errorMessages[index].mess = "";
    //       return { errorMessages: prevState.errorMessages };
    //     });
    //   // }
    // });
  };
  

  render() {
    // this.preventBack()
    return (
      <div className="background" /* onunload="this.preventBack()" */>
        <div className="centeredPage">
          <img className="webName" src='/icons/blueCheckIn.svg'>
          </img>
          <p
            className="error"
            style={{ display: this.state.errorMessages[0].toShow }}
          >
            {this.state.errorMessages[0].mess}
          </p>
          <input
            className="username input"
            placeholder="שם משתמש"
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
          <button className="signInButton" onClick={this.saveData}>
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
  name: nameContext,
  errorMsg: errorMsgContext,
  isAuthenticated: IsAuthenticatedContext
};

export default withContext(mapContextToProps)(withRouter(observer(SignIn)));
