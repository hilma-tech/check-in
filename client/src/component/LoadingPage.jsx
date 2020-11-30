import React from 'react';
import '../style/loading_page_style.scss'
// import optionicon from "/icons/greeOptionIcon.svg";

class LoadingPage extends React.Component {
    render() {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        return (
            //#626262
            // <img src='/icons/loading.gif' alt='loading...'></img>
            <div className="grid">
                {
                    arr.map((num) => {
                        return (
                            <div key={num} className="imageContainerLoading loading item3">
                                <h2 className="gameTitleBackgroundLoading"></h2>
                                <img
                                    className="optionIcon"
                                    alt=""
                                    src='/icons/greeOptionIcon.svg'
                                />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default LoadingPage;