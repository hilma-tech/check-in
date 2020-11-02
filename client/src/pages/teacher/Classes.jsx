import React from "react";
import { Component } from "react";
import pinkcircle from "../../img/dottedcirclePink.svg";
import purplecircle from "../../img/dottedcirclePurple.svg";
import greencircle from "../../img/dottedcircleGreen.svg";
import bluecircle from "../../img/dottedcircleBlue.svg"
import "../../style/classes.css";
import SmallMenuBar from "../../component/teacher/SmallMenuBar";

class Classes extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <SmallMenuBar/>
        <div className="griddler">
          <div className="circleCont green">
            <object className="circle" data={greencircle}></object>
            <h3 className="className">א'3</h3>
          </div>
          <div className="circleCont purple">
            <object className="circle" data={purplecircle}></object>
            <h3 className="className">א'6</h3>
          </div>
          <div className="circleCont pink">
            <object className="circle" data={pinkcircle}></object>
            <h3 className="className">ב'1</h3>
          </div>
          <div className="circleCont blue">
            <object className="circle" data={bluecircle}></object>
            <h3 className="className">ד'4</h3>
          </div>
        </div>
      </>
    );
  }
}

export default Classes;
