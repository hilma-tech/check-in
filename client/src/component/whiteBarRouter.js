import React, { Component } from "react";
import Games from "../pages/Games.jsx"
import SuspendedGames from "../pages/SuspendedGames.jsx"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { withRouter } from "react-router-dom";

export default withRouter (class WhiteRouter extends Component {
    // constructor() {
    //     super()
    // }
    render() {
        console.log("hi")
        return(
            <div>
                
                    <Switch>
                        <Route path={this.props.match.path} exact component={Games}/>
                        <Route path={this.props.match.path + "/suspended"} component={SuspendedGames}/>
                    </Switch>
            
            </div>
        )
    }
})