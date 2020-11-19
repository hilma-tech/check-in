import React from "react";
import { Switch, Route } from "react-router-dom";
import TeachersList from "../../pages/superAdmin/TeachersList.jsx";
import StudentsList from "../../pages/superAdmin/StudentsList.jsx";
import GamesRouter from "./WhiteBarRouter.jsx";
import SchoolsList from "../../pages/superAdmin/SchoolsList.jsx";
import AddGame from "../../pages/superAdmin/AddGame.jsx";
import AddTeacher from "../../pages/superAdmin/AddTeacher.jsx";
import EditSchool from "../../pages/superAdmin/EditSchool.jsx";
import Menu from "../../component/superAdmin/Menu.jsx";
import AddStudent from "../../pages/superAdmin/AddStudent.jsx";
import EditGame from "../../pages/superAdmin/EditGame.jsx";
import AddSchool from "../../pages/superAdmin/AddSchool.jsx";
import SignIn from "../../pages/SignIn.jsx";
import { PrivateRoute } from "@hilma/auth";

class SuperAdminRoute extends React.Component {
  render() {
    return (
      <div className="everyPage">
        <Switch>
          <PrivateRoute path="/superAdmin/games" componentName="SAdminHome" redirectComponent={SignIn}>
            <Menu />
            <GamesRouter />
          </PrivateRoute>
          <PrivateRoute path="/superAdmin/schools" exact componentName="SAdminSchools" redirectComponent={SignIn}>
            <Menu />
            <SchoolsList />
          </PrivateRoute>
          <PrivateRoute path="/superAdmin/teachers" exact componentName="SAdminTeachers" redirectComponent={SignIn}>
            <Menu />
            <TeachersList />
          </PrivateRoute>
          <PrivateRoute path="/superAdmin/students" exact componentName="SAdminStudents" redirectComponent={SignIn}>
            <Menu />
            <StudentsList />
          </PrivateRoute>

          <PrivateRoute path="/superAdmin/studentsAdd" exact componentName="SAdminAddStudents" redirectComponent={SignIn}>
            <Menu />
            <AddStudent />
          </PrivateRoute>
          <PrivateRoute path="/superAdmin/teachersAdd" exact componentName="SAdminAddTeachers" redirectComponent={SignIn}>
            <Menu />
            <AddTeacher />
          </PrivateRoute>
          <PrivateRoute path="/superAdmin/gamesAdd" exact componentName="SAdminAddGames" redirectComponent={SignIn}>
            <Menu />
            <AddGame />
          </PrivateRoute>
          <PrivateRoute path="/superAdmin/schoolsAdd" exact componentName="SAdminAddSchools" redirectComponent={SignIn}>
            <Menu />
            <AddSchool />
          </PrivateRoute>

          <PrivateRoute path="/superAdmin/gamesEdit" exact componentName="SAdminEditGames" redirectComponent={SignIn}>
            <Menu />
            <EditGame />
          </PrivateRoute>
          <PrivateRoute path="/superAdmin/schoolsEdit" exact componentName="SAdminEditSchools" redirectComponent={SignIn}>
            <Menu />
            <EditSchool />
          </PrivateRoute>
          <PrivateRoute path="/superAdmin/teachersEdit" exact componentName="SAdminEditTeachers" redirectComponent={SignIn}>
            <Menu />
            <h4>teacher edit</h4>
          </PrivateRoute>
          <PrivateRoute path="/superAdmin/studentsEdit" exact componentName="SAdminEditStudents" redirectComponent={SignIn}>
            <Menu />
            <h4>student edit</h4>
          </PrivateRoute>
        </Switch>
      </div>
    );
  }
}

export default SuperAdminRoute;
