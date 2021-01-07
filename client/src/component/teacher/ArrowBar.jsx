import React from "react";
import "../../style/teacher/arrow_bar_style.css";

class ArrowBar extends React.Component {
    render() {
        console.log(this.props.page);
        console.log(this.props.page.includes('game'));
        if (this.props.page === 'games') {
            return (
                <div className='gamesChooseDistractions'>
                    <img
                    alt="small back arrow"
                        className="smallBackArrow"
                        src="/icons/awesome-arrow-right.svg"
                    />
                    <p className='gamesChooseDistractionsText'>
                        בחר/י משחק כדי לערוך אותו,<br />
                    על מנת להוסיף משחק חדש לכיתה זו
                    לחץ/י על סמל הפלוס
                </p>
                </div>);
        } else if (this.props.page === 'students') {
            return (
                <div className='studentsArrowBar'>
                    <img
                    alt="small back arrow"
                        className="smallBackArrow"
                        src="/icons/awesome-arrow-right.svg"
                    />
                    <br />
                    <br />
                    {/* search bar */}
                    <h4 className="linkToTeachers">לרשימת המורים של כיתה זו</h4>
                </div>);
        // } else if (this.props.page === 'permission') {
        //     return (
        //         <div className='permissionArrowBar'>
        //             <img
        //             alt="small back arrow"
        //                 className="smallBackArrow"
        //                 src="/icons/awesome-arrow-right.svg"
        //             />
        //         </div>);
        } else {
            return <></>
        }
    }
  }


export default ArrowBar;
