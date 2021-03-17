import React from "react";
import { Component } from "react";
import "../style/sign_in.scss";

import hilmaicon from "../img/hilmaIcon.svg";
import { withRouter } from "react-router-dom";

class IconsPage extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="background">
        <div className="splitPage">
          {/* top third */}
          <img className="webName" src="/icons/blueCheckIn.svg"></img>
          {/* middle third */}
          <div className="middleThirdFlex">
            {/* teacher sign in */}

            <div className="signInIcons">
              <img className="initialIcons" src="/icons/teacher-icon.svg"></img>
             
                <h3>התחבר כמורה</h3>
            </div>
            {/* superadmin sign in */}
            <div className="signInIcons">
              <img className="initialIcons" src="/icons/manager.svg" ></img>
               
                <h3>התחבר כמנהל מערכת</h3>
            </div>
          </div>
          {/* <h3 className="forgot">שכחת סיסמא?</h3> */}
          {/* bottom third */}
          <img alt="hilma logo" className="hilmalogo" src={hilmaicon} />
        </div>
      </div>
    );
  }
}
export default withRouter(IconsPage);
