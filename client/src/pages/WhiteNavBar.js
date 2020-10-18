import React, { Component } from 'react'
import "../style/WhiteBarStyle.css"

class WhiteNavBar extends Component {
    constructor(props) {
        super()
    }
    render() {
        return(
            <>
           <div className="navbar">
               <h6 id="active">משחקים</h6>
               <h6 id="suspended">משחקים מושהים</h6>
           </div>
            </>
        )
    }
}

export default WhiteNavBar;