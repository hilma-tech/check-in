import React, { Component } from "react";
import "../../style/teacher/page_title_style.css";

class PageTitle extends Component {
    render() {
        if (!this.props.title.includes('כיתה')) {
            return (
                <>
                    <div className="titleContain">
                        <h1 className="officialTitle">{this.props.title}</h1>
                        {this.props.titleTwo !== undefined ?
                            !this.props.titleTwo.includes('כיתה') ?
                                <h1 className="officialTitle">{this.props.titleTwo}</h1> :
                                <div>{(this.props.titleTwo.split(' '))[1]}</div>
                            :
                            <></>
                        }
                    </div>
                </>
            )
        }
        else {
            // return <div>{(this.props.title.split(' '))[1]}</div>
            return <div className="titleContain">
                <h1 className="officialTitle">{this.props.title}</h1>

                {/* <h1 className="officialTitle">{(this.props.title.split(' '))[0]}</h1>
                <h1 className="officialTitle">{(this.props.title.split(' '))[1]}</h1> */}

                {this.props.titleTwo !== undefined ?
                    !this.props.titleTwo.includes('כיתה') ?
                        <h1 className="officialTitle">{this.props.titleTwo}</h1> :
                        <div>{(this.props.titleTwo.split(' '))[1]}</div>
                    :
                    <></>
                }
            </div>
        }
    }
}
export default PageTitle;
