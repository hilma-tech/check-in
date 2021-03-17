import React from "react";
import { Component } from "react";
import "../style/sign_in.scss";
import hilmaicon from "../img/hilmaIcon.svg";
import { withRouter } from "react-router-dom";
import { withContext } from "@hilma/tools";
import { AuthContext, IsAuthenticatedContext } from "@hilma/auth";
import { observer } from "mobx-react";

class InitialPage extends Component {
  constructor(props) {
    super();
  }

  componentDidMount = async () => {
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
  }

  goToLogin = (type) => {
      this.props.match.type = type
      console.log('his.props: ', this.props);
      this.props.history.push({
        pathname: '/signin',
        state: { data: type }
      });
};

  render() {
    return (
        <div className="background">
        <div className="centeredPage">
          <img className="webName initial" src="/icons/blueCheckIn.svg"></img>
          <button className="goButton teacherGo" onClick={()=>{this.goToLogin("teacher")}}>
              התחבר כמורה
          </button>
            <br />
            <button className="goButton superAGo" onClick={()=>{this.goToLogin("super-admin")}}>
              התחבר כמנהל מערכת
          </button>
          <img alt="hilma logo " className="initialHilma hilmalogo" src={hilmaicon} />
        </div>
      </div>
    );
  }
}

const mapContextToProps = {
    AuthContext: AuthContext,
    isAuthenticated: IsAuthenticatedContext,
  };

export default withContext(mapContextToProps)(withRouter(observer(InitialPage)));
