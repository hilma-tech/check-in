import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import SignIn from "./pages/SignIn.jsx";
import SuperAdminRoute from './routing/superAdmin/SuperAdminRoute.jsx'
import TeacherRoute from './routing/teacher/TeacherRoute.jsx'
import { provide } from '@hilma/tools';
import Draft from "./dumps/draft.jsx";
import { nameProvider } from "./stores/name.store";
import { errorMsgProvider } from "./stores/error.store";
import { AuthProvider } from "@hilma/auth";

function App() {
  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css2?family=Assistant:wght@600;800&display=swap"
        rel="stylesheet"
      ></link>

      <Router>
        <AuthProvider>
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
        </AuthProvider>
      </Router>
    </div>
  );
}

export default provide(nameProvider, errorMsgProvider)(App);
