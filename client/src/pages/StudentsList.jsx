import React from 'react';
import GeneralTable from '../component/GeneralTable';
import '../style/TableStyle.css'



class StudentsList extends React.Component {
    constructor(props) {
        super()
        this.state = { categors:['שם התלמיד','בית ספר','כיתה'],
            listDataStudents: [{
            id: 1,
            'שם התלמיד':'אחיה כהן',
            'בית ספר': 'עשה חיל',
            'כיתה':"א'2"
        },
        {
            id: 2,
            'שם התלמיד':'אחיה כהן',
            'בית ספר': 'עשה חיל',
            'כיתה':"א'2"
        },{
            id: 3,
            'שם התלמיד':'אחיה כהן',
            'בית ספר': 'עשה חיל',
            'כיתה':"א'2"
        },{
            id: 4,
            'שם התלמיד':'אחיה כהן',
            'בית ספר': 'עשה חיל',
            'כיתה':"א'2"
        },{
            id: 5,
            'שם התלמיד':'אחיה כהן',
            'בית ספר': 'עשה חיל',
            'כיתה':"א'2"
        },{
            id: 6,
            'שם התלמיד':'אחיה כהן',
            'בית ספר': 'עשה חיל',
            'כיתה':"א'2"
        },{
            id: 7,
            'שם התלמיד':'אחיה כהן',
            'בית ספר': 'עשה חיל',
            'כיתה':"א'2"
        }], searchVal: '',
        displaySearch: 'none',
        displayIconSearch: 'inline-block'}
    }
    handelChang = (e) => {
        this.setState({searchVal: e.target.value})
    }
    activateSearch = () =>{
        this.setState({displaySearch: 'inline-block', displayIconSearch: 'none'})
    }
    render() { 
        return ( 
        <div className='StudentsList' dir="rtl">
            <div className='PageTitles'>
                <p>תלמידים</p>
                <p className='searchIcon' onClick={this.activateSearch} style={{display: this.state.displayIconSearch}}></p>
                <div style={{display: this.state.displaySearch}}>
                    <form className='search' >
                        <input type="text" name='search' value={this.state.searchVal} placeholder="חיפוש" onChange={this.handelChang}/> 
                        <p className='searchIcon'></p>
                    </form>
                </div>
            </div>
            <GeneralTable allData={this.state.listDataStudents} 
                            categors={this.state.categors} />
            
        </div> );
    }
}
 
export default StudentsList;