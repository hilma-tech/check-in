import React, { Component } from "react";
import PageTitle from "../../component/teacher/PageTitle";
import SmallMenuBar from "../../component/teacher/SmallMenuBar";
import "../../style/teacher/student_details_style.css";

class StudentDetails extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <div className="smallPage">
          <SmallMenuBar />
          <PageTitle title="תלמידים" titleTwo="כיתה א'1"/>
          {/* <PageTitle title="כיתה א'1"/> */}
          <img
            className="deetBackArrow"
            src="/icons/awesome-arrow-right.svg"
          />
          <h3 className="smallArrowTitle">כרטיס תלמיד</h3>
          <br />
          <div className="studentDeets top">
            <h1 className="detail">יוסי פפרמן</h1>
          </div>
          <div className="studentDeets">
            <h1 className="detail">yossipepperman</h1>
          </div>
          <div className="studentDeets">
            <h1 className="detail">1234</h1>
          </div>
          <div className="studentDeets">
            <h1 className="detail">ב'3</h1>
          </div>
        </div>
      </>
    );
  }
}

export default StudentDetails;
