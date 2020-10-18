import React, { Component } from 'react'
import "../style/WhiteBarStyle.css"

class WhiteNavBar extends Component {
    constructor(props) {
        super()
        this.state = {
            active: props.active,
        }
    }
    render() {
        if (this.state.active === "games"){
        return(
            <>
           <div className="navbar">
               <h6 id="active" className="bold pageName" >משחקים</h6>
               <h6 id="suspended" className="pageName">משחקים מושהים</h6>
           </div>
            </>
        )
        } else {
            return(
                <>
               <div className="navbar">
                   <h6 id="active" className="pageName" >משחקים</h6>
                   <h6 id="suspended" className="bold pageName">משחקים מושהים</h6>
               </div>
                </>
            )
        }
    }
}

export default WhiteNavBar;