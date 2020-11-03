import React from 'react';
import Slide from '@material-ui/core/Slide';
import GeneralTable from '../../component/superAdmin/GeneralTable.jsx';
import '../../style/superAdmin/table_style.css'



class StudentsList extends React.Component {
    constructor(props) {
        super()
        this.state = {
            categors: ['שם התלמיד', 'בית ספר', 'כיתה'],
            listDataStudents: [{
                id: 1,
                'שם התלמיד': 'אחיה כהן',
                'בית ספר': 'עשה חיל',
                'כיתה': "א'2"
            },
            {
                id: 2,
                'שם התלמיד': 'אחיה כהן',
                'בית ספר': 'עשה חיל',
                'כיתה': "א'2"
            }, {
                id: 3,
                'שם התלמיד': 'אחיה כהן',
                'בית ספר': 'עשה חיל',
                'כיתה': "א'2"
            }, {
                id: 4,
                'שם התלמיד': 'אחיה כהן',
                'בית ספר': 'עשה חיל',
                'כיתה': "א'2"
            }, {
                id: 5,
                'שם התלמיד': 'אחיה כהן',
                'בית ספר': 'עשה חיל',
                'כיתה': "א'2"
            }, {
                id: 6,
                'שם התלמיד': 'אחיה כהן',
                'בית ספר': 'עשה חיל',
                'כיתה': "א'2"
            }, {
                id: 7,
                'שם התלמיד': 'אחיה כהן',
                'בית ספר': 'עשה חיל',
                'כיתה': "א'2"
            }], searchVal: '',
            displaySearch: false,
        }
    }

    //Save the user search value as searchVal in state.
    handleChang = (e) => {
        this.setState({ searchVal: e.target.value })
    }

    //When the user press the search icon it's start to show the input text for the searching.
    activateSearch = () => {
        this.setState({ displaySearch: true})
    }
    render() {
        return (
            <div className='StudentsList' dir="rtl">
                <div className='PageTitles'>
                    <p>תלמידים</p>
                    <form className='search' >
                        <Slide direction="right" in={this.state.displaySearch} mountOnEnter unmountOnExit>
                            <input type="text" name='search' value={this.state.searchVal} placeholder="חיפוש" onChange={this.handleChang} />
                        </Slide>
                        <p className='searchIcon' onClick={this.activateSearch}></p>
                    </form>
                </div>
                {/*
                Create the school table with the general teble.
            */}
                <GeneralTable allData={this.state.listDataStudents}
                    categors={this.state.categors} />

            </div>);
    }
}

export default StudentsList;