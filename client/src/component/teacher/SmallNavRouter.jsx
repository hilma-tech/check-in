import { Switch, Route, withRouter } from "react-router-dom"
import React, {Component} from 'react'
import Games from '../../pages/teacher/Games.jsx'
import Students from "../../pages/teacher/Student.jsx"
import Permissions from '../../pages/teacher/Permissions.jsx'


class SmallNavRouter extends Component {
    render() {
      return (
        <div>
          <Switch>
            <Route path={this.props.match.path} exact component={Games} />
            <Route path={this.props.match.path + "/games"} component={Games}/>
            <Route
              path={this.props.match.path + "/students"}
              component={Students}
            />
            <Route path={this.props.match.path + "/permissions"}
              component={Permissions}/>
          </Switch>
        </div>
      );
    }
  }

  export default withRouter(SmallNavRouter)