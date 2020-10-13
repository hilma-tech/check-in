import React from 'react';
import '../style/MenuStyle.css'


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pagesNames : ['משחקים', 'בתי ספר', 'מורים', 'תלמידים'] }
    }
    render() { 
        return ( 
        <div className='pageMenu'>
            <div className='menu'>
                <div className='optionMenu'>
                    <h2 className='appName'>
                        CheckIn
                    </h2>
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