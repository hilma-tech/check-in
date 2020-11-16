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

class SuperAdminRoute extends React.Component {
  render() {
    return (
      <div className="everyPage">
        <Switch>
          <Route path="/superAdmin/games">
            <Menu />
            <GamesRouter />
          </Route>
          <Route path="/superAdmin/schools" exact>
            <Menu />
            <SchoolsList />
          </Route>
          <Route path="/superAdmin/teachers" exact>
            <Menu />
            <TeachersList />
          </Route>
          <Route path="/superAdmin/students" exact>
            <Menu />
            <StudentsList />
          </Route>

          <Route path="/superAdmin/studentsAdd" exact>
            <Menu />
            <AddStudent />
          </Route>
          <Route path="/superAdmin/teachersAdd" exact>
            <Menu />
            <AddTeacher />
          </Route>
          <Route path="/superAdmin/gamesAdd" exact>
            <Menu />
            <AddGame />
          </Route>
          <Route path="/superAdmin/schoolsAdd" exact>
            <Menu />
            <AddSchool />
          </Route>

          <Route path="/superAdmin/gamesEdit" exact>
            <Menu />
            <EditGame />
          </Route>
          <Route path="/superAdmin/schoolsEdit" exact>
            <Menu />
            <EditSchool />
          </Route>
          <Route path="/superAdmin/teachersEdit" exact>
            <Menu />
            <h4>teacher edit</h4>
          </Route>
          <Route path="/superAdmin/studentsEdit" exact>
            <Menu />
            <h4>student edit</h4>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default SuperAdminRoute;
