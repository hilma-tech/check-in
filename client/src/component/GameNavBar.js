import React, { Component } from "react";
import "../style/white_bar_style.css";
import { withRouter } from "react-router-dom";

class GameNavBar extends Component {
  constructor(props) {
    super();
    this.state = {
      active: props.active,
    };
  }

  movePageFunc = (props) => {
    if (props.target.id === "suspended") {
      this.props.history.push(this.props.match.url +"/suspended");
    } else {
      this.props.history.push("/games");
    }
  };

  render() {
    return (
      <>
        <div className="sticky">
          <div className="navbar">
            <h6
              id="active"
              className={
                this.state.active === "games" ? "bold pageName" : "pageName"
              }
              onClick={this.state.active === "games" ? null : this.movePageFunc}
            >
              משחקים
            </h6>
            <h6
              id="suspended"
              className={
                this.state.active === "games" ? "pageName" : "bold pageName"
              }
              onClick={this.state.active === "games" ? this.movePageFunc : null}
            >
              משחקים מושהים
            </h6>
          </div>
        </div>
        <div className="spacer"></div>
      </>
    );
  }
}

export default withRouter(GameNavBar);