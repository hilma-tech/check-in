import React from "react";
import { Switch, Route } from "react-router-dom";
import TeachersList from "../../pages/superAdmin/TeachersList.jsx";
import StudentsList from "../../pages/superAdmin/StudentsList.jsx";
import GamesRouter from "./WhiteBarRouter.jsx";
import SchoolsList from "../../pages/superAdmin/SchoolsList.jsx";
import AddGame from "../../pages/superAdmin/AddGame.jsx";
import EditSchool from "../../pages/superAdmin/EditSchool.jsx";
import Menu from "../../component/superAdmin/Menu.jsx";
import EditGame from "../../pages/superAdmin/EditGame.jsx";
import SignIn from "../../pages/SignIn.jsx";
import { PrivateRoute } from "@hilma/auth";
import ErrorPage from "../../pages/404Page.jsx";
import "../../style/superAdmin/disp.scss";
import EditTeacher from "../../pages/superAdmin/EditTeacher.jsx";
import EditStudent from "../../pages/superAdmin/EditStudent.jsx";

class SuperAdminRoute extends React.Component {
  render() {
    return (
      <>
        <Menu />
        <Switch>
          <PrivateRoute
            path="/superAdmin"
            exact
            redirectPath="/signin"
            componentName="SAdminGames"
            redirectComponent={SignIn}
            component={GamesRouter}
          />
          <PrivateRoute
            path="/superAdmin/games"
            exact
            redirectPath="/signin"
            componentName="SAdminGames"
            redirectComponent={SignIn}
            component={GamesRouter}
          />
          <PrivateRoute
            path="/superAdmin/gamesAdd"
            exact
            componentName="SAdminAddGames"
            redirectPath="/signin"
            redirectComponent={SignIn}
            component={AddGame}
          />
          <PrivateRoute
            path="/superAdmin/gamesEdit"
            exact
            componentName="SAdminEditGames"
            redirectPath="/signin"
            redirectComponent={SignIn}
            component={EditGame}
          />
          <PrivateRoute
            path="/superAdmin/schools"
            exact
            componentName="SAdminSchools"
            redirectPath="/signin"
            redirectComponent={SignIn}
            component={SchoolsList}
          />
          <PrivateRoute
            path="/superAdmin/teachers"
            exact
            componentName="SAdminTeachers"
            redirectPath="/signin"
            redirectComponent={SignIn}
            component={TeachersList}
          />
          <PrivateRoute
            path="/superAdmin/students"
            exact
            componentName="SAdminStudents"
            redirectPath="/signin"
            redirectComponent={SignIn}
            component={StudentsList}
          />
          {/* <PrivateRoute
              path="/superAdmin/studentsAdd"
              exact
              componentName="SAdminAddStudents"
              redirectComponent={GamesRouter}
              component={AddStudent}
            /> 
            <PrivateRoute
              path="/superAdmin/teachersAdd"
              exact
              componentName="SAdminAddTeachers"
              redirectComponent={GamesRouter}
              component={AddStudent}
            />*/}
          {/*<PrivateRoute
              path="/superAdmin/schoolsAdd"
              exact
              componentName="SAdminAddSchools"
              redirectComponent={GamesRouter}
              component={AddSchool}
            /> */}

          <PrivateRoute
            path="/superAdmin/schoolsEdit"
            exact
            componentName="SAdminEditSchools"
            redirectComponent={GamesRouter}
            component={EditSchool}
          />
          <PrivateRoute
            path="/superAdmin/teachersEdit"
            exact
            componentName="SAdminEditTeachers"
            redirectComponent={SignIn}
            component={EditTeacher}
          />
          <PrivateRoute
            path="/superAdmin/studentsEdit"
            exact
            componentName="SAdminEditStudents"
            redirectComponent={SignIn}
            component={EditStudent}
          />
          <Route path="/superAdmin/:smth" component={ErrorPage} />
        </Switch>
      </>
    );
  }
}

export default SuperAdminRoute;
