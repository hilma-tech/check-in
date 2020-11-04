import React from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect } from 'react-router-dom'
import './App.css';
import TeachersList from './pages/superAdmin/TeachersList.jsx'
import StudentsList from './pages/superAdmin/StudentsList.jsx'
import GamesRouter from './component/superAdmin/WhiteBarRouter.jsx'
import SchoolsList from './pages/superAdmin/SchoolsList.jsx'
import AddGame from './pages/superAdmin/AddGame.jsx'
import AddTeacher from './pages/superAdmin/AddTeacher.jsx'
import EditSchool from './pages/superAdmin/EditSchool.jsx'
import Menu from './component/superAdmin/Menu.jsx'
import AddStudent from './pages/superAdmin/AddStudent.jsx'
import EditGame from './pages/superAdmin/EditGame.jsx';
import AddSchool from './pages/superAdmin/AddSchool.jsx'
import SignIn from './pages/SignIn.jsx'
import Classes from './pages/teacher/Classes.jsx'
import Students from './pages/teacher/Student.jsx'
// 
import Draft from './dumps/draft.jsx'


function App() {
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@600;800&display=swap" rel="stylesheet"></link>

      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/signin'/>
          </Route>
          <Route path='/signin' exact>
            <SignIn/>
          </Route>
          <Route path='/draft' exact>
            <Draft/>
          </Route>
          {/* teacher classes */}
        <Route path='/teacher/classes' exact>
            <Classes/>
          </Route>
          <Route path='/teacher/students' exact>
            <Students/>
          </Route>
        <div className="everyPage">
          <Route path='/superAdmin/games'>
          <Menu />
            <GamesRouter/>
          </Route>
          <Route path='/superAdmin/schools' exact>
          <Menu />
            <SchoolsList/>
          </Route>
          <Route path='/superAdmin/teachers' exact>
          <Menu />
            <TeachersList />
          </Route>
          <Route path='/superAdmin/students' exact>
          <Menu />
            <StudentsList />
          </Route>

          <Route path='/superAdmin/studentsAdd' exact>
          <Menu />
            <AddStudent />
          </Route>
          <Route path='/superAdmin/teachersAdd' exact>
          <Menu />
            <AddTeacher/>
          </Route>
          <Route path='/superAdmin/gamesAdd' exact>
          <Menu />
            <AddGame/>
          </Route>
          <Route path='/superAdmin/schoolsAdd' exact>
          <Menu />
            <AddSchool />
          </Route>

          <Route path='/superAdmin/gamesEdit' exact>
          <Menu />
            <EditGame/>
          </Route>
          <Route path='/superAdmin/schoolsEdit' exact>
          <Menu />
            <EditSchool />
          </Route>
          <Route path='/superAdmin/teachersEdit' exact>
          <Menu />
            <h4>teacher edit</h4>
          </Route>
          <Route path='/superAdmin/studentsEdit' exact>
          <Menu />
            <h4>student edit</h4>
          </Route>
        </div>
        
        </Switch>
      </Router>
    </div>
  );
}

export default App;
