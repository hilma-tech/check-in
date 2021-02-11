import React, { Component } from "react";
import PageTitle from "../../component/teacher/PageTitle";
import SmallMenuBar from "../../component/teacher/SmallMenuBar";
import SmallNavBar from "../../component/teacher/SmallNavBar";
import ArrowBar from "../../component/teacher/ArrowBar.jsx";

//! not in use
export default class Permissions extends Component {
  render() {
    return (
      <div className="smallBackground">
        <div className="smallPage">
          <SmallMenuBar />
          <PageTitle title="כיתה א'3" />
          <SmallNavBar active="permissions" />
          <ArrowBar page="permission" />
          <div className="smallAlign" style={{ top: "27.75vh" }}>
            <h2>hi</h2>
          </div>
        </div>
      </div>
    );
  }
}
