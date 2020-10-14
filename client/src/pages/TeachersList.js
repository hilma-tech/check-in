import React from 'react';
import Menu from '../component/Menu';
import GeneralTable from '../component/GeneralTable';
import '../style/TableStyle.css'
// npm install --save-dev @iconify/react @iconify/icons-ion
import { Icon } from '@iconify/react';
import searchOutline from '@iconify/icons-ion/search-outline';

class TeachersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { categors:['שם המורה','בית ספר','כיתות'],
            listDataTeachers: [{
            id: 1,
            'שם המורה':'נורית כהן',
            'בית ספר': 'עשה חיל',
            'כיתות': ["א'2","ג'2"]
        },
        {
            id: 2,
            'שם המורה':'נורית כהן',
            'בית ספר': 'עשה חיל',
            'כיתות': ["א'2","ג'2"]
        },{
            id: 3,
            'שם המורה':'נורית כהן',
            'בית ספר': 'עשה חיל',
            'כיתות': ["א'2","ג'2"]
        },{
            id: 4,
            'שם המורה':'נורית כהן',
            'בית ספר': 'עשה חיל',
            'כיתות': ["א'2","ג'2"]
        },{
            id: 5,
            'שם המורה':'נורית כהן',
            'בית ספר': 'עשה חיל',
            'כיתות': ["א'2","ג'2"]
        },{
            id: 6,
            'שם המורה':'נורית כהן',
            'בית ספר': 'עשה חיל',
            'כיתות': ["א'2","ג'2"]
        },{
            id: 7,
            'שם המורה':'נורית כהן',
            'בית ספר': 'עשה חיל',
            'כיתות': ["א'2","ג'2"]
        }], searchVal: '',
        displaySearch: 'none',
        displayIconSearch: 'inline-block' }
    }
    handelChang = (e) => {
        this.setState({searchVal: e.target.value})
    }
    activateSearch = () =>{
        this.setState({displaySearch: 'inline-block', displayIconSearch: 'none'})
    }
    render() { 
        return ( 
        <div className='page10' dir="rtl">
            <Menu pageName='מורים'/>
            
            <div className='PageTitles'>
                <p>מורים</p>
                <p className='searchIcon' onClick={this.activateSearch} style={{display: this.state.displayIconSearch}}><Icon icon={searchOutline} /></p>
                <div style={{display: this.state.displaySearch}}>
                    <form className='search' >
                        <input type="text" name='search' value={this.state.searchVal} placeholder="חיפוש" onChange={this.handelChang}/> 
                        <p className='searchIcon'><Icon icon={searchOutline} /></p>
                    </form>
                </div>
            </div>
            <GeneralTable allData={this.state.listDataTeachers} 
                            categors={this.state.categors} />
            
        </div> );
    }
}
 
export default TeachersList;