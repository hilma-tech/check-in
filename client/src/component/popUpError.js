import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { errorMsgContext } from "../stores/error.store";
import { observer } from "mobx-react";
import { withContext } from "@hilma/tools";
import "../style/pop_up_error_style.scss";

//generic component for all popup errors
class PopUpError extends React.Component {

  //approval button that activates the function it is sent,
  //otherwise it moves the user to the correct route
  approvalButton = () => {
    if (
      !this.props.errorMsg.question &&
      window.location.pathname.includes("superAdmin")
    ) {
      // if (window.location.pathname.includes("/superAdmin/schoolsEdit")) {
      //   window.location.pathname = "/superAdmin/schoolsEdit";
      // }
      if (window.location.pathname !== "/superAdmin/games" && window.location.pathname !== "/superAdmin/gamesAdd" && this.props.errorMsg.errorMsg.includes("הייתה שגיאה בשרת")) {
        window.location.pathname = "/superAdmin/games";
      }
    } else if (
      !this.props.errorMsg.question &&
      window.location.pathname.includes("teacher")
    ) {
      if (
        window.location.pathname !== "/teacher/classes" &&
        this.props.errorMsg.errorMsg.includes("הייתה שגיאה בשרת")
      ) {
        window.location.pathname = "teacher/classes";
      }
    }
    this.props.errorMsg.approveFunction();

    this.props.errorMsg.resetMsg()
  }

  //cancellation button, removes the popup and allows the user to continue
  cancelButton = () => {
    this.props.errorMsg.resetMsg();
  };

  render() {
    return (
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "white",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #707070",
            padding: "5px",
          },
        }}
        // decides if the popup is hidden or shown
        open={this.props.errorMsg.showMsg}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* it takes the message that's saved in the store and shows it */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
              {this.props.errorMsg.errorMsg.length !== 0 ?
                <span className="popUpQuesion">{this.props.errorMsg.errorMsg}</span> :
                <ul>
                {this.props.errorMsg.arrErrorMsg.map((errMsg, i) => { return <li className="popUpErrorsList" key={i}>{errMsg}<br /></li> })}
                </ul>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* checks if it's a question - if it is it'll allow the user to cancel,
          otherwise only the approval button is shown */}
          {this.props.errorMsg.question ? (
            <button
              className="popUpCancelButton"
              color="primary"
              onClick={this.cancelButton}
            >
              ביטול
            </button>
          ) : (
              <></>
            )}
          <button className="popUpOkButton" onClick={this.approvalButton}>
            {this.props.errorMsg.question ? this.props.errorMsg.approveMsg :'אישור'}
          </button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapContextToProps = {
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(observer(PopUpError));
