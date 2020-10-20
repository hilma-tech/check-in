import React, { Component } from "react";
import Games from "../pages/Games.jsx"
import SuspendedGames from "../pages/SuspendedGames.jsx"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class WhiteRouter extends Component {
    // constructor() {
    //     super()
    // }
    render() {
        console.log("hi")
        return(
            <div>
                <Router>
                    <Switch>
                        <Route path="/games" exact component={Games}/>
                        <Route path="/games/suspended" component={SuspendedGames}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}