import React from 'react';
import '../style/RowDataStyle.css'
import { withRouter } from 'react-router-dom'
import { Icon } from '@iconify/react';
import iosArrowBack from '@iconify/icons-ion/ios-arrow-back';

class RowData extends React.Component{
    constructor(props) {
        super();
        this.state = {  }
    }
    onClickEdit = () =>{
        this.props.history.push(this.props.location.pathname + 'Edit');
    }
    render() { 
        return ( <div onClick={this.onClickEdit} className="rowData">
            <div className="Details">
                {this.props.categors.map((categor, index)=>{return categor !== 'כיתות' ? <p className={'item'+index} key={index}>{this.props.data[categor]}</p> :
                    <div key={index} className={'item'+index+' classes'}> {this.props.data[categor].map((val, categorIndex)=>{return <p key={categorIndex}>{val}</p>})} </div>
                })}
            </div>
            <p><Icon icon={iosArrowBack} /></p>
        </div> );
    }
}


export default withRouter(RowData);