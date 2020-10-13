import React from 'react';
import { withRouter } from 'react-router-dom'
import '../style/MenuStyle.css'


class Menu extends React.Component {
    constructor(props) {
        super(props);//pageName
        this.state = { pagesNames : ['משחקים', 'בתי ספר', 'מורים', 'תלמידים'] }
    }
    render() { 
        return ( 
        <div className='pageMenu'>
            <div className='menu'>
                <div className='optionMenu'>
                    <h1 className='appName'>
                        CheckIn
                    </h1>
                    {this.state.pagesNames.map((pageName)=>{
                        return pageName !== this.props.pageName ? <a href={'/'+pageName}>{pageName}</a> :
                        <a href={'/'+pageName} className='optionBold'>{pageName}</a>
                    })}
                </div>
                
                <div className='logOut'>
                    <span></span>
                    <a href=''>התנתק</a>
                </div>
            </div> 
        </div>);
    }
}
 
export default Menu;