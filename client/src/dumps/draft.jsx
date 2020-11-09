import React, { Component } from "react";
import Fade from '@material-ui/core/Fade'
import './draft.scss'

class Draft extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
      <Fade in={true}>
        <div>
            <h1 className="practiceFont">שדגכעדגכדגשכדסבנצילעט8ור</h1>
        </div>
        </Fade>
      </>
    );
  }
}

export default Draft;
