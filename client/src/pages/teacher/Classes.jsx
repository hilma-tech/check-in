import React from "react";
import { Component } from "react";
import "../../style/teacher/classes.scss";
import SmallMenuBar from "../../component/teacher/SmallMenuBar.jsx";
import PageTitle from "../../component/teacher/PageTitle";
import { withRouter } from "react-router-dom";
const axios = require("axios").default;

class Classes extends Component {
  constructor() {
    super();
    this.colors = [
      "#188749",
      "#f4c90a",
      "#f90258",
      "#8051AB",
      "#0faebd",
      "#fab27f",
      "#160955",
      "#d985b6",
      "#5055ee",
      "#69bda2",
      "#C20865",
      "#68af1c",
      "#ae03e9",
      "#066cbb",
      "#f46615",
      "#9c001b",
      "#411045",
    ];
    this.state = {classes: []}
  }

  componentDidMount = async () => {
    let teacherClasses = await axios.get("/api/teacher/getTeacherClasses");
    this.setState({classes: teacherClasses.data})
  };

  moveToClass = () => {
    this.props.history.push(this.props.location.pathname + "/games");
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className="smallSticky">
          <SmallMenuBar />
        </div>
        <PageTitle className="officialTitle" title="שלום המורה נורית!" />
        <div className="griddler">
          {this.state.classes.map((classObj, index) => {
            return (
              <div
                onClick={this.moveToClass}
                className="circleCont"
                style={{ borderColor: this.colors[index] }}
              >
                <h3 className="className" style={{ color: this.colors[index] }}>
                  {classObj.name}
                </h3>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
export default withRouter(Classes);
