import Classes from '../../pages/teacher/Classes'
import React, {Component} from 'react'
import { Switch, Route, withRouter } from "react-router-dom"
import SmallNavRouter from './SmallNavRouter.jsx';
import StudentDetails from '../../pages/teacher/StudentDetails.jsx'

class ClassesRouter extends Component {
    constructor() {
        super()
    }
    render() {
      return (
        <div>
          <Switch>
            <Route path='/teacher/classes' exact component={Classes} />
            <Route path={"/teacher/classes/students/studentInfo"} exact component={StudentDetails} />
            <SmallNavRouter />
          </Switch>
        </div>
      );
    }
  }

  export default withRouter(ClassesRouter)