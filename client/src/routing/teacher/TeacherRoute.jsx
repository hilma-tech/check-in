import { PrivateRoute } from "@hilma/auth";
import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "../../pages/SignIn.jsx";
import ClassesRouter from "./ClassesRouter.jsx";

class TeacherRoute extends React.Component {
  render() {
    return (
          <div style={{backgroundColor: '#F2F7FC', height: '100vh'}}>
        <Switch>
          <PrivateRoute
            path="/teacher/classes"
            redirectPath="/signin"
            componentName="TeacherRoute"
            redirectComponent={SignIn}
            component={ClassesRouter}
          />
        </Switch>
          </div>
    );
  }
}

export default TeacherRoute;
