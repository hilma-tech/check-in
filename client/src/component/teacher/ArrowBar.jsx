import React from 'react';
import '../../style/teacher/arrow_bar_style.css'

class ArrowBar extends React.Component {
    constructor() {
        super();
    }
    render() {
        if (this.props.page === 'games') {
            return (
                <div className='gamesChooseDistractions'>
                    <img
                        className="smallBackArrow"
                        src="/icons/awesome-arrow-right.svg"
                    />
                    <p className='gamesChooseDistractionsText'>
                        בחר/י משחק כדי לערוך אותו,<br />
                    על מנת להוסיף משחק חדש לכיתה זו<br />
                    לחץ/י על סמל הפלוס
                </p>
                </div>);
        } else if (this.props.page === 'students') {
            return (
                <div className='studentsArrowBar'>
                    <img
                        className="smallBackArrow"
                        src="/icons/awesome-arrow-right.svg"
                    />
                    <br />
                    <br />
                    {/* search bar */}
                    <h4 className="linkToTeachers">לרשימת המורים של כיתה זו</h4>
                </div>);
        } else if (this.props.page === 'permission') {
            return (
                <div className='permissionArrowBar'>
                    <img
                        className="smallBackArrow"
                        src="/icons/awesome-arrow-right.svg"
                    />
                </div>);
        }
    }
}

export default ArrowBar;