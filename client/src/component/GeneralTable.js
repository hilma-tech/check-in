import React from 'react';
import RowData from './RowData'

class GeneralTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className='TableTitles'>
                    {this.props.categors.map((val, index)=>{return <p className={'item'+index}>{val}</p>})}
                </div>
                <div className='AllData'>
                    {this.props.allData.map((val, index)=>{return <RowData key={index} 
                                                                            data={val}
                                                                            categors={this.props.categors}/>})}
                </div>
                <div className='addingButton'><p>+</p></div>
            </div>
         );
    }
}
 
export default GeneralTable;