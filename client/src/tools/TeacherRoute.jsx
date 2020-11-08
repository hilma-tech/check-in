import React from "react";
import { Switch, Route } from "react-router-dom";
import ClassesRouter from '../component/teacher/ClassesRouter.jsx'

class TeacherRoute extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/teacher/classes">
          <ClassesRouter />
        </Route>
      </Switch>
    );
  }
}

export default TeacherRoute;
