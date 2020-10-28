import React from 'react';
import GeneralTable from '../component/GeneralTable';
import '../style/table_style.css'


class TeachersList extends React.Component {
    constructor(props) {
        super()
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

    //Save the user search value as searchVal in state.
    handleChang = (e) => {
        this.setState({searchVal: e.target.value})
    }

    //When the user press the search icon it's start to show the input text for the searching.
    activateSearch = () =>{
        this.setState({displaySearch: 'inline-block', displayIconSearch: 'none'})
    }
    render() { 
        return ( 
        <div className='TeachersList' dir="rtl">
            <div className='PageTitles'>
                <p>מורים</p>
                <p className='searchIcon' onClick={this.activateSearch} style={{display: this.state.displayIconSearch}}></p>
                <div style={{display: this.state.displaySearch}}>
                    <form className='search' >
                        <input type="text" name='search' value={this.state.searchVal} placeholder="חיפוש" onChange={this.handleChang}/> 
                        <p className='searchIcon'></p>
                    </form>
                </div>
            </div>
            {/*
                Create the school table with the general teble.
            */}
            <GeneralTable allData={this.state.listDataTeachers} 
                            categors={this.state.categors} />
            
        </div> );
    }
}
 
export default TeachersList;