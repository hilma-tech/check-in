import React from "react";
import { Component } from "react";
import "../style/signIn.css";
import hilmaicon from "../img/hilmawhite.svg";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  updateUser = (props) => {
    this.setState({ username: props.target.value });
  };

  updatePass = (props) => {
    this.setState({ password: props.target.value });
  };

  signIn = () => {
      let user = this.state.username;
      let pass = this.state.password;
    //length
      if (user.length<8) {
          console.log("username short");
      } else if (pass.length<8) {
          console.log("password short");
      } else if (user !== /^(a-zA-Z)+$/) {
          console.log("user must include letters");
      } else {
          console.log("all good!");
      }

  }

  render() {
    return (
      <div className="background">
        <div className="centeredPage">
          <h1 className="webName" dir="ltr">CheckIn</h1>
          <input
            className="username input"
            placeholder="שם משתמש"
            onBlur={this.updateUser}
          />
          <br />
          <input
            
            className="password input"
            placeholder="סיסמא"
            onBlur={this.updatePass}
          />
          <br />
          <button className="signInButton" onClick={this.signIn}>
            Sign In
          </button>
          <h3 className="forgot">Forgot password?</h3>
          <img className="hilmalogo" src={hilmaicon} />
        </div>
      </div>
    );
  }
}

export default SignIn;
