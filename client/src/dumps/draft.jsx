import React, { Component } from "react";
import Fade from '@material-ui/core/Fade'
import './draft.css'

class Draft extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
      <Fade in={true}>
        <div>
            <h1 className="practiceFont">עשה חיל</h1>
        </div>
        </Fade>
      </>
    );
  }
}

export default Draft;
