import React from "react";
import { withRouter } from "react-router-dom";
import "../../style/superAdmin/menu_style.scss";
import { LogoutContext } from "@hilma/auth";
import { withContext } from "@hilma/tools";

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      pagesNames: ["משחקים", "בתי ספר", "מורים", "תלמידים"],
      תלמידים: "students",
      מורים: "teachers",
      "בתי ספר": "schools",
      משחקים: "games",
    };
  }

  render() {
    return (
      <div className="pageMenu">
        <div className="menu">
          <div className="optionMenu">
            <div className="appName"></div>
            {
              /*goes over the array of pages, 
              finds the current path and matches it to the corresponding hebrew title
              -which is then displayed*/
              this.state.pagesNames.map((pageName, index) => {
                return !this.props.location.pathname.includes(
                  this.state[pageName]
                ) ? (
                  <h6
                  className="menuBluePages thin"
                  key={index}
                  onClick={()=>{this.props.history.push("/superAdmin/" + this.state[pageName]);}}
                  href={null}
                  >
                    {pageName}
                  </h6>
                ) : (
                  <h3
                    key={index}
                    onClick={()=>{this.props.history.push("/superAdmin/" + this.state[pageName]);}}
                    className="optionBold menuBluePages"
                  >
                    {pageName}
                  </h3>
                );
              })
            }
          </div>

          <div
            className="logOut"
            onClick={async () => {
              await this.props.logout();
              this.props.history.push("/");
            }}
          >
            {/*The img option cut the image so i used the background-image */}
            <span></span>
            <button>התנתק</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapContextToProps = {
  logout: LogoutContext,
};

export default withRouter(withContext(mapContextToProps)(Menu));
