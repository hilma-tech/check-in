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
            <span style={{color: 'black', fontWeight: 'bold', fontSize: '1.5vw'}}>{this.props.errorMsg.errorMsg}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <button className='popUpCanselButton' color="primary">
            ביטול
          </button> */}
          <button className='popUpOkButton' onClick={this.props.errorMsg.resetMsg}>
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
