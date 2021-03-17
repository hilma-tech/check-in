import React from "react";
import { Component } from "react";
import "../style/sign_in.scss";
import hilmaicon from "../img/hilmaIcon.svg";
import { withRouter } from "react-router-dom";

class IconsPage extends Component {
  constructor() {
    super();
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
            <button className="goButton superAGo" onClick={()=>{this.goToLogin("superAdmin")}}>
              התחבר כמנהל מערכת
          </button>
          <img alt="hilma logo " className="initialHilma hilmalogo" src={hilmaicon} />
        </div>
      </div>
    );
  }
}
export default withRouter(IconsPage);