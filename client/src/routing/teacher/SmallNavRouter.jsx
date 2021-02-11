import { Route, Switch, withRouter } from "react-router-dom";
import React, { Component } from "react";
import Games from "../../pages/teacher/Games.jsx";
import Students from "../../pages/teacher/Students.jsx";
import SignIn from "../../pages/SignIn.jsx";
import { PrivateRoute } from "@hilma/auth";
import EditGame from '../../pages/teacher/EditGame.jsx'
import StudentDetails from '../../pages/teacher/StudentDetails.jsx'
import ShowGame from "../../pages/teacher/ShowGame.jsx";
import ErrorPage from "../../pages/404Page.jsx";

class SmallNavRouter extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          path={"/teacher/classes/games"}
          exact
          componentName="SmallTeacherRoute"
          component={Games}
          redirectPath="/signin"
          redirectComponent={SignIn}
        />
        <PrivateRoute
          path={"/teacher/classes/students"}
          exact
          componentName="TeacherStudentsList"
          component={Students}
          redirectComponent={SignIn}
          redirectPath="/signin"
        />
        <PrivateRoute
          path={"/teacher/classes/students/studentInfo"}
          exact
          componentName="TeacherStudentInfo"
          component={StudentDetails}
          redirectComponent={SignIn}
          redirectPath="/signin"
        />
        {/*    <Route path={"/teacher/classes/permissions"} exact
              component={Permissions}/> */}
        <PrivateRoute
          path='/teacher/classes/editGame'
          exact
          componentName="TeacherEditGame"
          component={EditGame}
        />
        <PrivateRoute
          path='/teacher/classes/showGame'
          exact
          componentName="TeacherShowGame"
          component={ShowGame}
        />
        <Route path="/teacher/:smth" exact component={ErrorPage} />
        <Route path="/teacher/classes/:smth" exact component={ErrorPage} />
        <Route path="/teacher/classes/students/:smth" exact component={ErrorPage} />
        {/* <Route path={"/teacher/classes/students/studentInfo"} exact component={StudentDetails} /> */}
      </Switch>
    );
  }
}

export default withRouter(SmallNavRouter);
