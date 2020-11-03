import React from 'react';
import { withRouter } from 'react-router-dom'
import '../../style/superAdmin/menu_style.css'

class Menu extends React.Component {
    constructor(props) {
        super();
        this.state = {
            pagesNames: ['משחקים', 'בתי ספר', 'מורים', 'תלמידים'],
            'תלמידים': 'students',
            'מורים': 'teachers',
            'בתי ספר': 'schools',
            'משחקים': 'games'
        }

    }
    render() {
        return (
            <div className='pageMenu'>
                <div className='menu'>
                    <div className='optionMenu'>
                        <div className='appName'></div>
                        {
                            /*
                            עובר על מערך השמות של העמודים
                            תוך כדי מעבר בודק אם המשתמש נמצא בעמוד שמכיל את השם של העמוד באנגלית
                            (זה מחזיר את השם באנגלית state כששמים את השם של העמוד בעברית בוך האובייקט )
                            של עיצוב כתב מודגש className כאשר הוא מוצא את האופציה של העמוד הוא מוסיך לו 
                            וככה זה מראה רק את השם של העמוד שבחרנו מודגש ואת שאר העמודים זה מראה רגיל
                            */
                            this.state.pagesNames.map((pageName, index) => {
                                return !this.props.location.pathname.includes(this.state[pageName]) ? <a className='menuBluePages' key={index} href={'/' + this.state[pageName]}>{pageName}</a> :
                                    <a key={index} href={'/' + this.state[pageName]} className='optionBold menuBluePages'>{pageName}</a>

                            })}
                    </div>

                    <div className='logOut' onClick={() => {
                        this.props.history.push("/signin");
                    }}>
                        {/*The img option cut the image so i used th background-image */}
                        <span></span>
                        <a>התנתק</a>
                    </div>
                </div>
            </div>);
    }
}

export default withRouter(Menu);