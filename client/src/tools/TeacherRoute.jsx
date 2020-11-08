import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom'
import Classes from '../pages/teacher/Classes.jsx'
import Students from '../pages/teacher/Student.jsx'
import Games from '../pages/teacher/Games.jsx'


class TeacherRoute extends React.Component {
    render() {
        return (
            <Switch>
                {/* teacher classes */}
                <Route path="/teacher/classes" exact>
                    <Classes />
                </Route>
                <Route path="/teacher/students" exact>
                    <Students />
                </Route>
                <Route path="/teacher/games" exact>
                    <Games />
                </Route>
            </Switch>);
    }
}

export default TeacherRoute;