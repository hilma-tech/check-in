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
import { PrivateRoute, AuthProvider } from "@hilma/auth";


class SuperAdminRoute extends React.Component {
  render() {
    return (
      <div className="everyPage">
        <AuthProvider>
          <Switch>
            <PrivateRoute
              path="/superAdmin/games"
              componentName="SAdminGames"
              redirectComponent={SignIn}
              component={GamesRouter}
            />
            <PrivateRoute
              path="/superAdmin/schools"
              exact
              componentName="SAdminSchools"
              redirectComponent={GamesRouter}
              component={SchoolsList}
            />
            <PrivateRoute
              path="/superAdmin/teachers"
              exact
              componentName="SAdminTeachers"
              redirectComponent={GamesRouter}
              component={TeachersList}
            />
            <PrivateRoute
              path="/superAdmin/students"
              exact
              componentName="SAdminStudents"
              redirectComponent={GamesRouter}
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
              component={AddStudent}
            />
            <PrivateRoute
              path="/superAdmin/gamesAdd"
              exact
              componentName="SAdminAddGames"
              redirectComponent={GamesRouter}
              component={AddGame}
            />
            <PrivateRoute
              path="/superAdmin/schoolsAdd"
              exact
              componentName="SAdminAddSchools"
              redirectComponent={GamesRouter}
              component={AddSchool}
            />

            <PrivateRoute
              path="/superAdmin/gamesEdit"
              exact
              componentName="SAdminEditGames"
              redirectComponent={GamesRouter}
              component={EditGame}
            />
            <PrivateRoute
              path="/superAdmin/schoolsEdit"
              exact
              componentName="SAdminEditSchools"
              redirectComponent={GamesRouter}
              component={EditSchool}
            />
            {/* <PrivateRoute
              path="/superAdmin/teachersEdit"
              exact
              componentName="SAdminEditTeachers"
              redirectComponent={SignIn}
              
            >
              <h4>teacher edit</h4>
            </PrivateRoute> */}
            {/* <PrivateRoute
              path="/superAdmin/studentsEdit"
              exact
              componentName="SAdminEditStudents"
              redirectComponent={SignIn}
            >
              <h4>student edit</h4>
            </PrivateRoute> */}
          </Switch>
        </AuthProvider>
      </div>
    );
  }
}

export default SuperAdminRoute;
