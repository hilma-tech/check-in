import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import Games from "../../pages/teacher/Games.jsx";
import Students from "../../pages/teacher/Students.jsx";
import SignIn from "../../pages/SignIn.jsx";
import { PrivateRoute } from "@hilma/auth";
import AddGame from '../../pages/teacher/AddGame.jsx'
import StudentDetails from '../../pages/teacher/StudentDetails.jsx'

class SmallNavRouter extends Component {
  render() {
    console.log(window.location.pathname);
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
          path='/teacher/classes/addGame'
          exact
          componentName="TeacherAddGame"
          component={AddGame}
        />
        {/* <Route path={"/teacher/classes/students/studentInfo"} exact component={StudentDetails} /> */}

      </>
    );
  }
}

export default withRouter(SmallNavRouter);
