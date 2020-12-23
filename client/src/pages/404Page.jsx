import React, { Component } from "react";
import "../style/error_page.scss";
import hilmaicon from "../img/hilmaIcon.svg";
import Menu from "../component/superAdmin/Menu";

class ErrorPage extends Component {
  render() {
    let dispo = true
    if(window.location.pathname == "/superAdmin/:smth") {
      dispo = false;
    } else if(!window.location.pathname.includes('superAdmin')){
      dispo = false
    }
    return (
      <>
          <div className={dispo ? "disp" : "nodisp"}><Menu/></div>
        <div dir="ltr" className="ErrorBackground ErrorWithMenu">
          <h1 className="ErrorNum">4 0 4</h1>
          <h3 className="ErrorExplanation">Page not found.</h3>
          <img className="hilmalogo" src={hilmaicon} />
        </div>
      </>
    );
  }
}

export default ErrorPage
