import React from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect } from 'react-router-dom'
import './App.css';
import TeachersList from './pages/TeachersList.jsx'
import StudentsList from './pages/StudentsList.jsx'
import GamesRouter from './component/WhiteBarRouter'
import SchoolsList from './pages/SchoolsList.jsx'
import AddGame from './pages/AddGame.jsx'
import AddTeacher from './pages/AddTeacher.jsx'
import EditSchool from './pages/EditSchool.jsx'
import Menu from './component/Menu'
import AddStudent from './pages/AddStudent.jsx'
import EditGame from './pages/EditGame.jsx';
import AddSchool from './pages/AddSchool.jsx'
import SignIn from './pages/SignIn.jsx'


function App() {
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@600;800&display=swap" rel="stylesheet"></link>

      <Router>
        <Switch>
          <Route path='/signin' exact>
            <SignIn/>
          </Route>
        <div className="everyPage">
          <Route path='/' exact> {/* for now */}
            <Redirect to='/teachers'/>
          </Route>
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
