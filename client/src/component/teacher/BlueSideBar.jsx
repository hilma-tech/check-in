import React from "react";
import Drawer from "@material-ui/core/Drawer";
import "../../style/teacher/blue_side_bar_style.scss";
import { withRouter } from "react-router-dom";
import { LogoutContext } from "@hilma/auth";
import { withContext } from "@hilma/tools";

const mapContextToProps = {
  logout: LogoutContext,
};

class BlueSideBar extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <>
        <Drawer
          anchor="right"
          open={this.props.openSideBar}
          className="drawer "
        >
          <div className="blueSideBar">
            <div className="blueSideBarUserName">
              <img
                src="/icons/closeIcon.svg"
                id="closeIcon"
                onClick={this.props.closeSideBar}
                alt="closeIcon"
              />
              <p id="teacherName">נורית כהן</p>
            </div>
            <div className="blueSideBarOptions">
              <p className="sideBarOption">כיתות</p>
              <p className="sideBarOption">ניהול</p>
            </div>

            <div
              className="blueSideBarLogOut"
              onClick={async () => {
                await this.props.logout();
                this.props.history.push("/signin");
              }}
            >
              <img src="/icons/login.svg" alt="logout"/>
              <button>התנתק</button>
            </div>
          </div>
        </Drawer>
        <div className="webBlueSideBar">
          <div className="blueSideBar">
            <div className="blueSideBarUserName">
              <p id="teacherName">נורית כהן</p>
              <img src="/icons/CheckIn.svg" id="checkInIcon" alt="checkin" />
            </div>
            <div className="blueSideBarOptions">
              <p className="sideBarOption">כיתות</p>
              <p className="sideBarOption">ניהול</p>
            </div>

            <div
              className="blueSideBarLogOut"
              onClick={async () => {
                await this.props.logout();
                this.props.history.push("/signin");
              }}
            >
              <img src="/icons/login.svg" alt="logout"/>
              <button>התנתק</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(withContext(mapContextToProps)(BlueSideBar));
