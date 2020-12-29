import Classes from '../../pages/teacher/Classes.jsx'
import React, {Component} from 'react'
import { Switch, Route, withRouter } from "react-router-dom"
import SmallNavRouter from './SmallNavRouter.jsx';
import StudentDetails from '../../pages/teacher/StudentDetails.jsx'
import { PrivateRoute } from '@hilma/auth';
import AddGame from '../../pages/teacher/AddGame.jsx'

class ClassesRouter extends Component {
    constructor() {
        super()
    }
    render() {
      return (
        <div>
          <>
            <PrivateRoute path='/teacher/classes' exact componentName="TeacherClasses" component={Classes} />
            <PrivateRoute path='/teacher/classes/addGame' exact componentName="TeacherAddGame" component={AddGame} />
            {/* <Route path={"/teacher/classes/students/studentInfo"} exact component={StudentDetails} /> */}
            <SmallNavRouter />
          </>
        </div>
      );
    }
  }

  export default withRouter(ClassesRouter)