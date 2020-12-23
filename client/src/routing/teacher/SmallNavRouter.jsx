import { Switch, Route, withRouter } from "react-router-dom";
import React, { Component } from "react";
import Games from "../../pages/teacher/Games.jsx";
import Students from "../../pages/teacher/Student.jsx";
import Permissions from "../../pages/teacher/Permissions.jsx";
import SignIn from "../../pages/SignIn.jsx";
import { PrivateRoute } from "@hilma/auth";

class SmallNavRouter extends Component {
  render() {
    return (
      <>
        <PrivateRoute
          path={"/teacher/classes/games"}
          exact
          componentName="SmallTeacherRoute"
          component={Games}
          redirectPath="/signin"
          redirectComponent={SignIn}
        />
        {/* <Route
              path={"/teacher/classes/students"} exact
              component={Students}
            />
            <Route path={"/teacher/classes/permissions"} exact
              component={Permissions}/> */}
      </>
    );
  }
}

export default withRouter(SmallNavRouter);
