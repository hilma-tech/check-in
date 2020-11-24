import React from "react";
import { Component } from "react";
import "../style/sign_in.css";
import hilmaicon from "../img/hilmawhite.svg";
import { withRouter } from "react-router-dom";
import { withContext } from "@hilma/tools";
import { nameContext } from "../stores/name.store";
import { errorMsgContext } from "../stores/error.store";
import { observer } from "mobx-react";
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

  updateUser = (props) => {
    this.setState({ username: props.target.value });
  };

  updatePass = (props) => {
    this.setState({ password: props.target.value });
  };

  superAdminRegister = async () => {
    let username = this.state.username;
    let password = this.state.password;
    try {
      const response = await axios.get("/api/super-admin/login")
    } catch (error) {
      console.log("err");
    }
    try {
      const response = await axios.post("/api/super-admin/login", {
        username: username,
        password: password,
      });
      this.props.history.push("/superAdmin/games");
    } catch (error) {
      this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת. לא ניתן להתחבר.');
    }
  };

  saveData = () => {
    let dataArray = [this.state.username, this.state.password];
    // this.props.name.setName('aaaa')
    dataArray.map((value, index) => {
      if (value.length === 0) {
        this.setState((prevState) => {
          prevState.errorMessages[index].toShow = "block";
          prevState.errorMessages[index].mess = "** שדה זה חייב להיות מלא **";
          return { errorMessages: prevState.errorMessages };
        });
      } else if (value.length < 8) {
        this.setState((prevState) => {
          prevState.errorMessages[index].toShow = "block";
          prevState.errorMessages[index].mess =
            "** שדה זה חייב להיות בעל 8 תווים לפחות **";
          return { errorMessages: prevState.errorMessages };
        });
      } else {
        this.setState((prevState) => {
          prevState.errorMessages[index].toShow = "none";
          prevState.errorMessages[index].mess = "";
          return { errorMessages: prevState.errorMessages };
        });
        this.superAdminRegister();
      }
    });
  };
  //EXPERIMENTATION
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
          <h1 className="webName" dir="ltr">
            CheckIn
          </h1>
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
          <h3 className="forgot">שכחת סיסמא?</h3>
          <img alt="hilma logo" className="hilmalogo" src={hilmaicon} />
        </div>
      </div>
    );
  }
}

const mapContextToProps = {
  name: nameContext,
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(withRouter(observer(SignIn)));
