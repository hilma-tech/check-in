import React, { Component } from "react";
import Games from "../pages/Games.js"
import Suspended from "../pages/SuspendedGames.js"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class WhiteRouter extends Component {
    constructor() {
        super()
    }
    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Games}/>
                        <Route path="/suspended" component={Suspended}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}