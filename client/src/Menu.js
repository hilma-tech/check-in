import React from 'react';
import './MenuStyle.css'


class Menu extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {  }
    // }
    render() { 
        return ( <div className='menu'>
            <div className='optionMenu'>
                <h1 className='appName'>
                    CheckIn
                </h1>
                <a href=''>משחקים</a>
                <a href=''>בתי ספר</a>
                <a><p>מורים</p></a>
                <a href=''>תלמידים</a>
            </div>
            
            <div className='logOut'>
                <span></span>
                <a href=''>התנתק</a>
            </div>
        </div> );
    }
}
 
export default Menu;