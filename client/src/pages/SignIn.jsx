import React from "react";
import { Component } from "react";
import "../style/sign_in.css";
import hilmaicon from "../img/hilmawhite.svg";
import { withRouter } from "react-router-dom";

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
    if (user.length < 8) {
      console.log("username short");
    } else if (pass.length < 8) {
      console.log("password short");
    } else if (!(/([a-zA-Z])/).test(user)) {
      console.log("user must include letters");
    } else {
      console.log("all good!");
      this.props.history.push('/games');
    }

  }

  // preventBack = () => {
  //   { window.history.forward(); }
  //   setTimeout(this.preventBack(), 0);
  //   // window.onunload = function () { null };
  // }


  render() {
    // this.preventBack()
    return (
      <div className="background" /* onunload="this.preventBack()" */>
        <div className="centeredPage">
          <h1 className="webName" dir="ltr">CheckIn</h1>
          <input
            className="username input"
            placeholder="שם משתמש"
            onBlur={this.updateUser}
          />
          <br />
          <input
            type='password'
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

export default withRouter(SignIn);
