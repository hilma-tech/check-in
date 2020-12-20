import React from "react";
import { withRouter } from "react-router-dom";
import "../../style/superAdmin/menu_style.scss";

import { LogoutContext } from '@hilma/auth';
import { withContext } from "@hilma/tools";

const mapContextToProps = {
  logout: LogoutContext
}

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
                  <a
                    className="menuBluePages"
                    key={index}
                    href={"/superAdmin/" + this.state[pageName]}
                  >
                    {pageName}
                  </a>
                ) : (
                  <a
                    key={index}
                    href={"/superAdmin/" + this.state[pageName]}
                    className="optionBold menuBluePages"
                  >
                    {pageName}
                  </a>
                );
              })
            }
          </div>

          <div
            className="logOut"
            onClick={async () => {
              await this.props.logout();
              this.props.history.push("/signin");
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

export default withRouter(withContext(mapContextToProps)(Menu));
