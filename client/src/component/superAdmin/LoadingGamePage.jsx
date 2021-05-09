import React from "react";
import "../../style/loading_page_style.scss";

//page that appears while the games are loading
class LoadingPage extends React.Component {
  render() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className="grid" style={{ overflowX: "hidden" }}>
        {arr.map((num) => {
          return (
            <div key={num} className="imageContainerLoading loading item3">
              <h2 className="gameTitleBackgroundLoading">{null}</h2>
              <img
                className="optionIcon"
                alt=""
                src="/icons/greeOptionIcon.svg"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default LoadingPage;
