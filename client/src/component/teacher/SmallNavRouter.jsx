import { Switch, Route, withRouter, Redirect } from "react-router-dom"
import React, {Component} from 'react'
import Games from '../../pages/teacher/Games.jsx'
import Students from "../../pages/teacher/Student.jsx"
import Permissions from '../../pages/teacher/Permissions.jsx'
import StudentDetails from '../../pages/teacher/StudentDetails'

class SmallNavRouter extends Component {
    constructor() {
        super()
    }
    render() {
      return (
        <div>
          <Switch>
            <Route path={this.props.match.path} exact>
                <Redirect to={this.props.match.path + "/games"}/>
                </Route>
            <Route path={this.props.match.path + "/games"} component={Games}/>
            <Route
              path={this.props.match.path + "/students"}
              component={Students}
            />
            <Route path={this.props.match.path + "/:id"} component={StudentDetails}/>
            <Route path={this.props.match.path + "/permissions"}
              component={Permissions}/>
          </Switch>
        </div>
      );
    }
  }

  export default withRouter(SmallNavRouter)