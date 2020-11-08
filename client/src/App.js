import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn.jsx";
import SuperAdminRoute from './tools/SuperAdminRoute.jsx'
import TeacherRoute from './tools/TeacherRoute.jsx'
import Draft from "./dumps/draft.jsx";
function App() {
  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css2?family=Assistant:wght@600;800&display=swap"
        rel="stylesheet"
      ></link>

      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/signin" />
          </Route>
          <Route path="/signin" exact>
            <SignIn />
          </Route>
          <Route path="/superAdmin">
            <SuperAdminRoute />
          </Route>
          <Route path="/teacher">
            <TeacherRoute />
          </Route>
          <Route path="/draft" exact>
            <Draft />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
