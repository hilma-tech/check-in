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
      selectedStartTime: "",
      selectedEndTime: "",
      Err: ''
    }
  }

  componentDidMount = async () => {
    if (this.props.chosenClass.classId === 0) {
      this.props.history.push("/teacher/classes");
      return;
    }
    var savedPermissions = await this.props.chosenClass.getClassPermissions()
    if (savedPermissions) {
      this.setState({
        selectedStartTime: this.props.chosenClass.classPermissionsStart[0],
        selectedEndTime: this.props.chosenClass.classPermissionsEnd[0]
      })
    }
  };

  handleStartTimeChange = (e) => {
    this.setState({ selectedStartTime: e.target.value })
  }
  handleEndTimeChange = (e) => {
    this.setState({ selectedEndTime: e.target.value })
  }
  sendInfo = async () => {
    let classId = this.props.chosenClass.classId
    if (!this.state.selectedEndTime || !this.state.selectedStartTime) {
      this.setState({ Err: '*יש למלא את כל השדות*' })
    } else {
      try {
        this.setState({ Err: '' })
        await axios.post(`/api/permission/setClassPermission`, { startTime: this.state.selectedStartTime, endTime: this.state.selectedEndTime, classId: classId });
        this.props.errorMsg.setErrorMsg('הרשאות נשמרו בהצלחה')
      }
      catch (err) {
        this.setState({ Err: '' })

        this.props.errorMsg.setErrorMsg('תקלה בשרת, נסו לשמור שנית')

      }
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
                  value={this.state.selectedStartTime}
                  onChange={this.handleStartTimeChange}
                />

              </div>


              <h3 className="text">זמן סיום:</h3>
              <div style={{ marginRight: '5vw', direction: 'rtl' }}>
                < TextField
                  required={true}
                  id="time"
                  type="time"
                  value={this.state.selectedEndTime}
                  onChange={this.handleEndTimeChange}

                />
              </div>
              <h4 className='inputError'>{this.state.Err}</h4>
              <h3 className='save' onClick={this.sendInfo}>{this.props.chosenClass.classPermissionsStart[0] ? "עדכן" : "שמור"}</h3>


            </form>
          </div>
        </div>
      </>
    );
  }
}
const mapContextToProps = {
  chosenClass: chosenClassContext,
  errorMsg: errorMsgContext
};

export default withContext(mapContextToProps)(withRouter(observer(Permissions)));

