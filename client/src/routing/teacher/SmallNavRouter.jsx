import { Switch, Route, withRouter } from "react-router-dom"
import React, {Component} from 'react'
import Games from '../../pages/teacher/Games.jsx'
import Students from "../../pages/teacher/Student.jsx"
import Permissions from '../../pages/teacher/Permissions.jsx'


class SmallNavRouter extends Component {
    render() {
      return (
          <Switch>
            <Route path={"/teacher/classes/games"} exact component={Games}/>
            <Route
              path={"/teacher/classes/students"} exact
              component={Students}
            />
            <Route path={"/teacher/classes/permissions"} exact
              component={Permissions}/>
          </Switch>
      );
    }
  }

  export default withRouter(SmallNavRouter)