import React, { useEffect } from "react";
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
// import Draft from "./dumps/draft.jsx";
import { nameProvider } from "./stores/name.store";
import { errorMsgProvider } from "./stores/error.store";
import { gamesProvider } from "./stores/games.store";
import { chosenGameEditProvider } from "./stores/chosenGameEdit.store";
import { AuthProvider, PrivateRoute } from "@hilma/auth";
import Menu from "./component/superAdmin/Menu";
import PopUpError from './component/popUpError'
import ErrorPage from "./pages/404Page";
import { useIsAuthenticated } from '@hilma/auth';

function App() {
  let isAuthenticated = useIsAuthenticated();

  useEffect(()=>{
    console.log('njcdjsnvfk');
    if (!isAuthenticated && !(window.location.pathname !== '/signin' || window.location.pathname !== '/')){
      window.location.pathname = '/signin'
    }
  },[isAuthenticated])

  return (
    <div className="App">
      
  <PopUpError />
      <Router>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/signin" />
            </Route>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
            <PrivateRoute path="/superAdmin" 
            componentName="SuperAdminRoute" 
            redirectPath='/signin' 
            // redirectComponent={SignIn}
            component={SuperAdminRoute} />
            {/* <Route path="/teacher">
              <TeacherRoute />
            </Route>
            <Route path="/draft" exact>
              <Draft />
            </Route> */}
             <Route path="/:smth" component={ErrorPage} />
          
          </Switch>
      </Router>
    </div>
  );
}

export default provide([nameProvider, {}], [errorMsgProvider, {}],[gamesProvider, {}],[chosenGameEditProvider,{}], [AuthProvider, {accessTokenCookie: 'klool'}])(App);
