import React from 'react';
import Games from './pages/Games.js';
import logo from './logo.svg';
import TeachersList from './TeachersList'
import './App.css';
import TeachersList from './pages/TeachersList'
import StudentsList from './pages/StudentsList'

function App() {
  return (
    <div className="App">
      <StudentsList />

      {/* <Games/> */}
      {/* <TeachersList /> */}

    </div>
  );
}

export default App;
