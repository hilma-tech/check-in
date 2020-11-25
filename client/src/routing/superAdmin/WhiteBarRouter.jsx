import React, { Component } from "react";
import Games from "../../pages/superAdmin/Games.jsx";
import SuspendedGames from "../../pages/superAdmin/SuspendedGames.jsx";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { PrivateRoute } from "@hilma/auth";

export default withRouter(class WhiteRouter extends Component {
    componentDidMount() {
    
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
           window.history.pushState(null, document.title,  window.location.href);
        });
      
     }
    render() {
        return (
            <Switch>
                <PrivateRoute path={this.props.match.path} exact component={Games}  componentName="SAdminGamesList"/>
                {/* <PrivateRoute path={this.props.match.path + "/suspended"} component={SuspendedGames} componentName="SAdminSuspendedGames" redirectComponent={SignIn}/> */}
            </Switch>
        )
    }
  }
);
