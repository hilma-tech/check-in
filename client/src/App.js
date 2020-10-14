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
            <Redirect to='/מורים'/>
          </Route>
          <Route path='/משחקים' exact>
            <GamesRouter/>
          </Route>
          <Route path='/בתי ספר' exact>
            <SchoolsList/>
          </Route>
          <Route path='/מורים' exact>
            <TeachersList />
          </Route>
          <Route path='/תלמידים' exact>
            <StudentsList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
