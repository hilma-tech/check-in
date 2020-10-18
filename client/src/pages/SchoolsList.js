import React from 'react';
import Menu from '../component/Menu';
import GeneralTable from '../component/GeneralTable';
import '../style/TableStyle.css'


class SchoolsList extends React.Component {
    constructor(props) {
        super()
        this.state = { categors:['שם בית הספר', 'עיר'],
            listDataSchools: [{
            id: 1,
            'שם בית הספר':'עשה חיל',
            'עיר': 'אפרת'
        },
        {
            id: 2,
            'שם בית הספר':'עשה חיל',
            'עיר': 'אפרת'
        },{
            id: 3,
            'שם בית הספר':'עשה חיל',
            'עיר': 'אפרת'
        },{
            id: 4,
            'שם בית הספר':'עשה חיל',
            'עיר': 'אפרת'
        },{
            id: 5,
            'שם בית הספר':'עשה חיל',
            'עיר': 'אפרת'
        },{
            id: 6,
            'שם בית הספר':'עשה חיל',
            'עיר': 'אפרת'
        },{
            id: 7,
            'שם בית הספר':'עשה חיל',
            'עיר': 'אפרת'
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
        <div className='SchoolsList' dir="rtl">
            <Menu pageName='בתי ספר'/>
            
            <div className='PageTitles'>
                <p>בתי ספר</p>
                <p className='searchIcon' onClick={this.activateSearch} style={{display: this.state.displayIconSearch}}></p>
                <div style={{display: this.state.displaySearch}}>
                    <form className='search' >
                        <input type="text" name='search' value={this.state.searchVal} placeholder="חיפוש" onChange={this.handelChang}/> 
                        <p className='searchIcon'></p>
                    </form>
                </div>
            </div>
            <GeneralTable allData={this.state.listDataSchools} 
                            categors={this.state.categors} />
        </div> );
    }
}
 
export default SchoolsList;