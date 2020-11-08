import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom'
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

class SuperAdminRoute extends React.Component {
    render() { 
        return ( <Switch>
            
        </Switch> );
    }
}
 
export default SuperAdminRoute;