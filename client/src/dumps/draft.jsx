import React, { Component } from "react";
import Fade from '@material-ui/core/Fade'

class Draft extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
      <Fade in={true}>
        <div>
            hi
        </div>
        </Fade>
      </>
    );
  }
}

export default Draft;
