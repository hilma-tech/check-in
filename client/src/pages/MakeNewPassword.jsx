import React from "react";
import { Component } from "react";
import "../style/sign_in.scss";
import hilmaicon from "../img/hilmaIcon.svg";
import { withRouter } from "react-router-dom";
import { withContext } from "@hilma/tools";
import { AuthContext, IsAuthenticatedContext } from "@hilma/auth";
import { observer } from "mobx-react";
import { gamesContext } from "../stores/games.store";
import axios from "axios";
import { errorMsgContext } from "../stores/error.store";

class MakeNewPassword extends Component {
  constructor() {
    super();
    this.state = {
        email: "",
        errorMessages: [
          { toShow: "none", mess: "" },
        ],
      };
  }

  componentDidMount = async () => {
    await this.props.games.resetGamesStore();
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

  goToLogin = (type) => {
    this.props.match.type = type;
    this.props.history.push({
      pathname: "/",
    });
  };

  teacherForgotPass = async () => {
    try {
      await axios.post("/api/teacher/sendNewPassEmail",{email:this.state.email});
    } catch (error) {
      console.log("error: ",error);
      this.props.errorMsg.setErrorMsg('מייל לא תקין')
    }
     this.props.errorMsg.setErrorMsg('נשלח לך אימייל לשינוי הסיסמה')
  }

  updateEmail = (props) => {
    this.setState({ email: props.target.value });
  };

  render() {
    return (
      <div className="background">
        <img
          alt="small back arrow"
          className="signInBackArrow"
          src="/icons/awesome-arrow-right.svg"
          onClick={this.goToLogin}
        />
        <div className="centeredPage">
            <h1 className="smallerFont">הכניסו כתובת מייל ולחצו על הכפתור</h1>
          <p
            className="error"
            style={{ display: this.state.errorMessages[0].toShow }}
          >
            {this.state.errorMessages[0].mess}
          </p>
          <input
            className="username input"
            placeholder="כתובת מייל"
            onBlur={this.updateEmail}
          />
          <br />

          <button className="signInButton" onClick={this.teacherForgotPass}>
            שליחה
          </button>

          <img alt="hilma logo" className="hilmalogo" src={hilmaicon} />
        </div>
      </div>
    );
  }
}

const mapContextToProps = {
    errorMsg: errorMsgContext,
  games: gamesContext,
  AuthContext: AuthContext,
  isAuthenticated: IsAuthenticatedContext,
};

export default withContext(mapContextToProps)(
  withRouter(observer(MakeNewPassword))
);
