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
import { gamesProvider } from "./stores/games.store";
import { AuthProvider, PrivateRoute } from "@hilma/auth";
import PopUpError from './component/popUpError'

function App() {
  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css2?family=Assistant:wght@600;800&display=swap"
        rel="stylesheet"
      ></link>
  <PopUpError />
      <Router>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/signin" />
            </Route>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
            <PrivateRoute path="/superAdmin" componentName="SuperAdminRoute" redirectComponent={SignIn}>
              <SuperAdminRoute />
            </PrivateRoute>
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

export default provide(nameProvider, errorMsgProvider,gamesProvider, AuthProvider)(App);
