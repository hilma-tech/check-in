import React, { Component } from 'react'
import "../style/WhiteBarStyle.css"
import {withRouter} from 'react-router-dom'

class WhiteNavBar extends Component {
    constructor(props) {
        super()
        this.state = {
            active: props.active,
        }
    }

    movePageFunc = (props) => {
        if (props.target.id === "suspended") {
            this.props.history.push("/משחקים/suspended")
        }    
        else {
            this.props.history.push("/משחקים")
        }
    }

    render() {
        if (this.state.active === "games"){
        return(
            <>
           <div className="navbar">
               <h6 id="active" className="bold pageName" >משחקים</h6>
               <h6 id="suspended" className="pageName" onClick={this.movePageFunc}>משחקים מושהים</h6>
           </div>
            </>
        )
        } else {
            return(
                <>
               <div className="navbar">
                   <h6 id="active" className="pageName" onClick={this.movePageFunc}>משחקים</h6>
                   <h6 id="suspended" className="bold pageName">משחקים מושהים</h6>
               </div>
                </>
            )
        }
    }
}

export default withRouter (WhiteNavBar);