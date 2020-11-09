import Classes from '../../pages/teacher/Classes'
import React, {Component} from 'react'
import { Switch, Route, withRouter } from "react-router-dom"
import SmallNavRouter from './SmallNavRouter.jsx';

class ClassesRouter extends Component {
    render() {
      return (
        <div>
          <Switch>
            <Route path={this.props.match.path} exact component={Classes} />
            <Route
              path={this.props.match.path + "/a'3"}
              component={SmallNavRouter}
            />
          </Switch>
        </div>
      );
    }
  }

  export default withRouter(ClassesRouter)