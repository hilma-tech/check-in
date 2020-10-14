import React from 'react';
import Games from './pages/Games.js';
import './App.css';
import TeachersList from './pages/TeachersList'
import StudentsList from './pages/StudentsList'
import Routerr from "../src/component/whiteBarRouter.js"

function App() {
  return (
    <div className="App">
      {/* <StudentsList /> */}
      <Routerr/>
      {/* <Games/> */}
      {/* <TeachersList /> */}

    </div>
  );
}

export default App;
