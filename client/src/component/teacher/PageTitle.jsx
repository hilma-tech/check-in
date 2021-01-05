import React, { Component } from "react";
import "../../style/teacher/page_title_style.css";

class PageTitle extends Component {
  render() {
    return (
      <>
        <div className="titleContain">
          <h1 className="officialTitle">{this.props.title}</h1>
          {this.props.titleTwo === undefined ? (
            <></>
          ) : (
            <h1 className="secondTitle officialTitle">{this.props.titleTwo}</h1>
          )}
        </div>
      </>
    );
  }
}
export default PageTitle;
