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
import SignIn from './pages/superAdmin/SignIn.jsx'
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
        <Route path='/classes' exact>
            <Classes/>
          </Route>
          <Route path='/teachers/students' exact>
            <Students/>
          </Route>
        <div className="everyPage">
          <Route path='/games'>
          <Menu />
            <GamesRouter/>
          </Route>
          <Route path='/schools' exact>
          <Menu />
            <SchoolsList/>
          </Route>
          <Route path='/teachers' exact>
          <Menu />
            <TeachersList />
          </Route>
          <Route path='/students' exact>
          <Menu />
            <StudentsList />
          </Route>

          <Route path='/studentsAdd' exact>
          <Menu />
            <AddStudent />
          </Route>
          <Route path='/teachersAdd' exact>
          <Menu />
            <AddTeacher/>
          </Route>
          <Route path='/gamesAdd' exact>
          <Menu />
            <AddGame/>
          </Route>
          <Route path='/schoolsAdd' exact>
          <Menu />
            <AddSchool />
          </Route>

          <Route path='/gamesEdit' exact>
          <Menu />
            <EditGame/>
          </Route>
          <Route path='/schoolsEdit' exact>
          <Menu />
            <EditSchool />
          </Route>
          <Route path='/teachersEdit' exact>
          <Menu />
            <h4>teacher edit</h4>
          </Route>
          <Route path='/studentsEdit' exact>
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
