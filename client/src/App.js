import React from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect } from 'react-router-dom'
// import Games from './pages/Games.js';
import './App.css';
import TeachersList from './pages/TeachersList'
import StudentsList from './pages/StudentsList'
import GamesRouter from "../src/component/whiteBarRouter.js"
import SchoolsList from './pages/SchoolsList'

function App() {
  return (
    <div className="App">
      {/* <StudentsList /> */}
      {/* <Routerr/> */}
      {/* <Games/> */}
      {/* <TeachersList /> */}

      <Router>
        <Switch>
          <Route path='/' exact> {/* for now */}
            <Redirect to='/teachers'/>
          </Route>
          <Route path='/games'>
            <Games/>
          </Route>
          <Route path='/schools' exact>
            <SchoolsList/>
          </Route>
          <Route path='/teachers' exact>
            <TeachersList />
          </Route>
          <Route path='/students' exact>
            <StudentsList />
          </Route>


          <Route path='/gamesEdit' exact>
            <h4>game edit</h4>
          </Route>
          <Route path='/schoolsEdit' exact>
            <h4>school edit</h4>
          </Route>
          <Route path='/teachersEdit' exact>
            <h4>teacher edit</h4>
          </Route>
          <Route path='/studentsEdit' exact>
            <h4>student edit</h4>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
