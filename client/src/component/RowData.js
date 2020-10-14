import React from 'react';
import '../style/RowDataStyle.css'
// npm install --save-dev @iconify/react @iconify/icons-ion
import { Icon } from '@iconify/react';
import iosArrowBack from '@iconify/icons-ion/ios-arrow-back';

class TeacherData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <a href={'/' + this.props.data[this.props.categors[0]]} className="rowData">
            <div className="Details">
                {this.props.categors.map((categor, index)=>{return categor !== 'כיתות' ? <p className={'item'+index} key={index}>{this.props.data[categor]}</p> :
                    <div key={index} className={'item'+index+' classes'}> {this.props.data[categor].map((val, categorIndex)=>{return <p key={categorIndex}>{val}</p>})} </div>
                })}
            </div>
            <p><Icon icon={iosArrowBack} /></p>
        </a> );
    }
}
 
export default TeacherData;