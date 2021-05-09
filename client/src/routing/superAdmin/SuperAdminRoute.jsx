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
import { PrivateRoute } from "@hilma/auth";
import ErrorPage from "../../pages/404Page.jsx";
import "../../style/superAdmin/disp.scss";
import EditTeacher from "../../pages/superAdmin/EditTeacher.jsx";
import EditStudent from "../../pages/superAdmin/EditStudent.jsx";
import AddTeacher from "../../pages/superAdmin/AddTeacher.jsx";
import AddStudent from "../../pages/superAdmin/AddStudent.jsx";
import AddSchool from "../../pages/superAdmin/AddSchool.jsx";
import InitialPage from "../../pages/InitialPage.jsx";

class SuperAdminRoute extends React.Component {
  render() {
    return (
      <>
        <Menu />
        <Switch>
          <PrivateRoute
            path="/superAdmin"
            exact
            redirectPath="/"
            componentName="SAdminGames"
            redirectComponent={InitialPage}
            component={GamesRouter}
          />
          <PrivateRoute
            path="/superAdmin/games"
            exact
            redirectPath="/"
            componentName="SAdminGames"
            redirectComponent={InitialPage}
            component={GamesRouter}
          />
          <PrivateRoute
            path="/superAdmin/gamesAdd"
            exact
            componentName="SAdminAddGames"
            redirectPath="/"
            redirectComponent={InitialPage}
            component={AddGame}
          />
          <PrivateRoute
            path="/superAdmin/gamesEdit"
            exact
            componentName="SAdminEditGames"
            redirectPath="/"
            redirectComponent={InitialPage}
            component={EditGame}
          />
          <PrivateRoute
            path="/superAdmin/schools"
            exact
            componentName="SAdminSchools"
            redirectPath="/"
            redirectComponent={InitialPage}
            component={SchoolsList}
          />
          <PrivateRoute
            path="/superAdmin/teachers"
            exact
            componentName="SAdminTeachers"
            redirectPath="/"
            redirectComponent={InitialPage}
            component={TeachersList}
          />
          <PrivateRoute
            path="/superAdmin/students"
            exact
            componentName="SAdminStudents"
            redirectPath="/"
            redirectComponent={InitialPage}
            component={StudentsList}
          />
          <PrivateRoute
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
              component={AddTeacher}
            />
            <PrivateRoute
              path="/superAdmin/schoolsAdd"
              exact
              componentName="SAdminAddSchools"
              redirectComponent={GamesRouter}
              component={AddSchool}
            />

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
            redirectComponent={InitialPage}
            component={EditTeacher}
          />
          <PrivateRoute
            path="/superAdmin/studentsEdit"
            exact
            componentName="SAdminEditStudents"
            redirectComponent={InitialPage}
            component={EditStudent}
          />
          <Route path="/superAdmin/:smth" component={ErrorPage} />
        </Switch>
      </>
    );
  }
}

export default SuperAdminRoute;
