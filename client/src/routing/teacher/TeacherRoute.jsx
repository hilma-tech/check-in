import { PrivateRoute } from "@hilma/auth";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "../../pages/SignIn.jsx";
import SmallNavRouter from "./SmallNavRouter.jsx";
import Classes from "../../pages/teacher/Classes.jsx";
import ErrorPage from "../../pages/404Page.jsx";

class TeacherRoute extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#F2F7FC",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <Switch>
          <PrivateRoute path="/teacher" exact>
            <Redirect to="/teacher/classes" />
          </PrivateRoute>
          <PrivateRoute
            path="/teacher/classes"
            exact
            componentName="TeacherClasses"
            component={Classes}
            redirectComponent={SignIn}
          />
          <SmallNavRouter />
        </Switch>
      </div>
    );
  }
}

export default TeacherRoute;
