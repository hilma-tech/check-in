import React from "react";
import { Switch, Route } from "react-router-dom";
import ClassesRouter from './ClassesRouter.jsx'

class TeacherRoute extends React.Component {
  render() {
    return (
      <></>
      // <Switch>
      //   <Route path="/teacher/classes">
      //     <ClassesRouter />
      //   </Route>
      //   <Route path="/teacher/manager">
      //     <h6>Manager router</h6>
      //   </Route>
      // </Switch>
    );
  }
}

export default TeacherRoute;
