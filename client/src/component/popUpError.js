import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { errorMsgContext } from "../stores/error.store";
import { observer } from "mobx-react"
import { withContext } from '@hilma/tools';
import '../style/pop_up_error_style.css'

class PopUpError extends React.Component {
    constructor(props) {
        super();
    }

    approvalButton = () => {
      this.props.errorMsg.approveClick()
      this.props.errorMsg.resetMsg()
      if(!this.props.errorMsg.question){
        if(window.location.pathname !== "/superAdmin/games"){
          window.location.pathname = "/superAdmin/games"
        }
      }
    }

    cancelButton = () => {
      this.props.errorMsg.resetMsg()
      this.props.errorMsg.disapproveClick()
    }

    render() { 
        return ( 
            <Dialog
            PaperProps={{
                style: {
                  backgroundColor: 'white',
                  boxShadow: '0px 3px 6px #00000029',
                  border: '1px solid #707070',
                  padding: '5px'
                },
              }}
        open={this.props.errorMsg.showMsg}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span className='popUpQuesion'>{this.props.errorMsg.errorMsg}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          { 
          this.props.errorMsg.question ?
          <button className='popUpCanselButton' color="primary" onClick={this.cancelButton}>
            ביטול
          </button> : <></>
          }
          <button className='popUpOkButton' onClick={this.approvalButton}>
            אישור
          </button>
          
        </DialogActions>
      </Dialog>
         );
    }
}

const mapContextToProps = {
  errorMsg: errorMsgContext,
}

export default withContext(mapContextToProps)(observer(PopUpError));
