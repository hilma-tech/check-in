import React from 'react';
import './TeacherDataStyle.css'
// npm install --save-dev @iconify/react @iconify/icons-ion
import { Icon, InlineIcon } from '@iconify/react';
import iosArrowBack from '@iconify/icons-ion/ios-arrow-back';

class TeacherData extends React.Component {
    constructor(props) {
        super();
        this.state = {  }
    }
    render() { 
        return ( <a href='' className="teacherData">
            <div className="teacherDetails">
                <p>{this.props.name}</p>
                <p>{this.props.schoolName}</p>
                <div className='classes'>{this.props.classes.map((val)=>{return <p>{val}</p>})}</div>
            </div>
            
            <p><Icon icon={iosArrowBack} /></p>
        </a> );
    }
}
 
export default TeacherData;