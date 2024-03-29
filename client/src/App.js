import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import SignIn from "./pages/SignIn.jsx";
import SuperAdminRoute from "./routing/superAdmin/SuperAdminRoute.jsx";
import TeacherRoute from "./routing/teacher/TeacherRoute.jsx";
import { provide } from "@hilma/tools";
import { userNameProvider } from "./stores/userName.store";
import { errorMsgProvider } from "./stores/error.store";
import { gamesProvider } from "./stores/games.store";
import { chosenGameEditProvider } from "./stores/chosenGameEdit.store";
import { AuthProvider, PrivateRoute } from "@hilma/auth";
import PopUpError from "./component/popUpError";
import ErrorPage from "./pages/404Page";
import { useIsAuthenticated } from "@hilma/auth";
import { studentsProvider } from "./stores/students.store";
import { teachersProvider } from "./stores/teachers.store";
import { schoolsProvider } from "./stores/schools.store";
import { chosenClassProvider } from "./stores/chosenClass.store";

import InitialPage from "./pages/InitialPage";
import ChangePass from "./pages/changePass";
import MakeNewPassword from "./pages/MakeNewPassword";
import FadeMsg from "./component/FadeMsg";
import { fadeMsgProvider } from "./stores/fadeMsg.store";

function App() {
  let isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (
      !isAuthenticated &&
      !(
        window.location.pathname !== "/signin" ||
        window.location.pathname !== "/"
      )
    ) {
      window.location.pathname = "/";
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      <PopUpError />
      <FadeMsg />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/initialPage" />
          </Route>
          <Route path="/initialPage" exact>
            <InitialPage/>
          </Route>
          <Route path="/signin" exact>
            <SignIn />
          </Route>
          <Route path="/makeNewPassword" exact>
            <MakeNewPassword />
          </Route>
          <Route path="/changePass" exact>
            <ChangePass />
          </Route>
          <Route path="/changePass/:token" exact>
            <ChangePass/>
          </Route>
          <PrivateRoute
            path="/superAdmin"
            componentName="SuperAdminRoute"
            redirectPath="/"
            redirectComponent={InitialPage}
            component={SuperAdminRoute}
          />
          <PrivateRoute
            path="/teacher"
            componentName="TeacherRoute"
            redirectPath="/"
            redirectComponent={InitialPage}
            component={TeacherRoute}
          />
          {/* <Route path="/draft" exact>
              <Draft />
            </Route> */}
          <Route path="/:smth" component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default provide(
  [userNameProvider, {}],
  [errorMsgProvider, {}],
  [gamesProvider, {}],
  [chosenGameEditProvider, {}],
  [studentsProvider, {}],
  [teachersProvider, {}],
  [schoolsProvider, {}],
  [chosenClassProvider, {}],
  [fadeMsgProvider, {}],
  [AuthProvider, { accessTokenCookie: "klool", logoutOnUnauthorized: true }]
)(App);
