import { withContext } from '@hilma/tools';
import Fade from '@material-ui/core/Fade';
import { observer } from 'mobx-react';
import React from 'react';
import { fadeMsgContext } from '../stores/fadeMsg.store';
import "../style/fade_msg_style.scss"

class FadeMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
            <Fade in={this.props.fadeMsgContext.showMsg} mountOnEnter unmountOnExit>
                 <p className="FadeText">✓ {this.props.fadeMsgContext.fadeMsg}</p>
                
            </Fade>
         );
    }
}

const mapContextToProps = {
    fadeMsgContext: fadeMsgContext,
  };
  
  export default withContext(mapContextToProps)(observer(FadeMsg));