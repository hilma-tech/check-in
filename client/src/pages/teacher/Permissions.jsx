import React, { Component } from "react";
import PageTitle from "../../component/teacher/PageTitle";
import SmallMenuBar from "../../component/teacher/SmallMenuBar";
import SmallNavBar from "../../component/teacher/SmallNavBar";
import ArrowBar from "../../component/teacher/ArrowBar.jsx";
import '../../style/teacher/premissions.css'
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { withContext } from "@hilma/tools";
import { chosenClassContext } from "../../stores/chosenClass.store";
import { errorMsgContext } from "../../stores/error.store";
const axios = require("axios").default;

class Permissions extends Component {
  constructor() {
    super()
    this.state = {
      selectedStartTime: "08:00",
      selectedEndTime: "14:00"
    }
  }
  handleStartTimeChange = (e) => {
    this.setState({ selectedStartTime: e.target.value })
  }
  handleEndTimeChange = (e) => {
    this.setState({ selectedEndTime: e.target.value })
  }
  sendInfo = async () => {
    let classId = this.props.chosenClass.classId
    try {
      await axios.post(`/api/permission/setClassPermission`, { startTime: this.state.selectedStartTime, endTime: this.state.selectedEndTime, classId: classId });
      this.props.errorMsg.setErrorMsg('הרשאות נשמרו בהצלחה')
    }
    catch (err) {
      this.props.errorMsg.setErrorMsg('תקלה בשרת, נסו לשמור שנית')

    }
  }

  render() {
    return (
      <>
        <SmallMenuBar />
        <PageTitle title={"כיתה " + this.props.chosenClass.classroomName} />
        <SmallNavBar active="permissions" />
        <ArrowBar page="permission" />
        <div className="smallPage">
          <div className="smallAlign extramargintop">
            <h4 className="title">אנא בחר את השעה שבה התלמידים יוכלו לשחק:</h4>

            <form>
              <h3 className="text">זמן התחלה:</h3>
              <div style={{ marginRight: '5vw', direction: 'ltr' }}>
                < TextField
                  required={true}
                  style={{ color: 'paleturquoise', height: '4vh', }}
                  id="time"
                  type="time"
                  defaultValue="08:00"
                  onChange={this.handleStartTimeChange}
                />
              </div>


              <h3 className="text">זמן סיום:</h3>
              <div style={{ marginRight: '5vw', direction: 'rtl' }}>
                < TextField
                  required={true}
                  id="time"
                  type="time"
                  defaultValue="14:00"
                  onChange={this.handleEndTimeChange}

                />
              </div>
              <h3 className='save' onClick={this.sendInfo}>שמור</h3>

            </form>
          </div>
        </div>
      </>
    );
  }
}
const mapContextToProps = {
  chosenClass: chosenClassContext,
  errorMsg: errorMsgContext,
};

export default withContext(mapContextToProps)(withRouter(observer(Permissions)));

