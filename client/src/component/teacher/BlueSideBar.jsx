import React from "react";
import Drawer from "@material-ui/core/Drawer";
import "../../style/teacher/blue_side_bar_style.scss";
import { withRouter } from "react-router-dom";
import { LogoutContext } from "@hilma/auth";
import { withContext } from "@hilma/tools";
import { userNameContext } from "../../stores/userName.store";
import { chosenClassContext } from "../../stores/chosenClass.store";

//gives teacher the ability to switch between pages
//is a pop up in mobile, sidebar in web
class BlueSideBar extends React.Component {

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
              <p id="teacherName">
                {this.props.name.firstName + " " + this.props.name.lastName}
              </p>
            </div>
            <div className="blueSideBarOptions">
              <p
                className="sideBarOption"
                onClick={() => {
                  this.props.history.push("/teacher/classes");
                }}
              >
                כיתות
              </p>
              {/* <p className="sideBarOption">ניהול</p> */}
            </div>

            <div
              className="blueSideBarLogOut"
              onClick={async () => {
                await this.props.logout();
                await this.props.name.resetUser();
                this.props.history.push("/");
              }}
            >
              <img src="/icons/login.svg" alt="logout" />
              <button>התנתק</button>
            </div>
          </div>
        </Drawer>
        <div className="webBlueSideBar">
          <div className="blueSideBar">
            <div className="blueSideBarUserName">
              <p id="teacherName">
                {this.props.name.firstName + " " + this.props.name.lastName}
              </p>
              <img src="/icons/CheckIn.svg" id="checkInIcon" alt="checkin" />
            </div>
            <div className="blueSideBarOptions">
              <p
                className="sideBarOption"
                onClick={() => {
                  this.props.history.push("/teacher/classes");
                }}
              >
                כיתות
              </p>
              {this.props.location.pathname !== "/teacher/classes" ? (
                <>
                  <p
                    className="sideBarClassOption"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/teacher/classes/games",
                        state: { data: this.props.chosenClass.classId }
                      });
                    }}
                  >
                    משחקים
                  </p>
                  <p
                    className="sideBarClassOption"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/teacher/classes/students",
                        state: { data: this.props.chosenClass.classId }
                      });
                    }}
                  >
                    תלמידים
                  </p>
                  <p
                    className="sideBarClassOption"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/teacher/classes/permissions",
                        state: { data: this.props.chosenClass.classId }
                      });
                    }}
                  >
                    הרשאות
              </p>
                </>
              ) : (
                  <></>
                )}
              {/* <p className="sideBarOption">ניהול</p> */}
            </div>

            <div
              className="blueSideBarLogOut"
              onClick={async () => {
                await this.props.logout();
                await this.props.name.resetUser();
                this.props.history.push("/");
              }}
            >
              <img src="/icons/login.svg" alt="logout" />
              <button>התנתק</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapContextToProps = {
  logout: LogoutContext,
  name: userNameContext,
  chosenClass: chosenClassContext,
};

export default withRouter(withContext(mapContextToProps)(BlueSideBar));
