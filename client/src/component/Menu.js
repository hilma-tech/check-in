import React from 'react';
import { withRouter } from 'react-router-dom'
import '../style/MenuStyle.css'


class Menu extends React.Component {
    constructor(props) {
        super();
        this.state = { pagesNames : ['משחקים', 'בתי ספר', 'מורים', 'תלמידים'],
                        'תלמידים': 'students',
                        'מורים':'teachers',
                        'בתי ספר': 'schools',
                        'משחקים':'games' }

    }
    render() { 
        return ( 
        <div className='pageMenu'>
            <div className='menu'>
                <div className='optionMenu'>
                    <div className='appName'></div>
                    {this.state.pagesNames.map((pageName, index)=>{
                        return !window.location.pathname.includes(this.state[pageName]) ? <a className='menuBluePages' key={index} href={'/'+this.state[pageName]}>{pageName}</a> :
                        <a key={index} href={'/'+this.state[pageName]} className='optionBold menuBluePages'>{pageName}</a>

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