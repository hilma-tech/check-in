import React from 'react';
import Menu from './Menu';
import TeacherData from './TeacherData';
import './TeacherListStyle.css'
// npm install --save-dev @iconify/react @iconify/icons-ion
import { Icon, InlineIcon } from '@iconify/react';
import searchOutline from '@iconify/icons-ion/search-outline';

class TeachersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { listDataTeachers: [{
            id: 1,
            name:'נורית כהן',
            schoolName: 'עשה חיל',
            classes: ["א'2","ג'2"]
        },
        {
            id: 2,
            name:'נורית כהן',
            schoolName: 'עשה חיל',
            classes: ["א'2","ג'2"]
        },{
            id: 3,
            name:'נורית כהן',
            schoolName: 'עשה חיל',
            classes: ["א'2","ג'2"]
        },{
            id: 4,
            name:'נורית כהן',
            schoolName: 'עשה חיל',
            classes: ["א'2","ג'2"]
        },{
            id: 5,
            name:'נורית כהן',
            schoolName: 'עשה חיל',
            classes: ["א'2","ג'2"]
        },{
            id: 6,
            name:'נורית כהן',
            schoolName: 'עשה חיל',
            classes: ["א'2","ג'2"]
        },{
            id: 7,
            name:'נורית כהן',
            schoolName: 'עשה חיל',
            classes: ["א'2","ג'2"]
        }], searchVal: '' }
    }
    render() { 
        return ( <div className='page10' dir="rtl">
            <div className='pageMenu'><Menu /></div>
            
            <div className='teachersPageTitles'>
                <p>מורים</p>
                <p><Icon icon={searchOutline} /></p>
                {/* <form>
                    <label></label>
                    <input></input> 
                    <button type='submit'><Icon icon={searchOutline} /></button>
                </form> */}
            </div>
            <div className='teachersTableTitles'>
                <p>שם המורה</p>
                <p>בית ספר</p>
                <p>כיתות</p>
            </div>
            <div className='AllTeachersData'>
                {this.state.listDataTeachers.map((val)=>{return <TeacherData key={val.id} 
                                                                    name={val.name} 
                                                                    schoolName={val.schoolName}
                                                                    classes={val.classes}/>})}
            </div>
            <div className='addTeeadherButton'><p>+</p></div>
        </div> );
    }
}
 
export default TeachersList;