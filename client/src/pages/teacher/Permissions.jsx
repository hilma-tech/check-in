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
import addicon from "../../img/addicon.svg";
import deleteicon from "../../img/delete.svg";
import { PermissionsValidation } from "../../tools/ValidationFunctions";
const axios = require("axios").default;

class Permissions extends Component {
  constructor() {
    super()
    this.state = {
      selectedStartTime: '',
      selectedEndTime: '',
      selectedDay: '',
      extraTimes: [],
      savedPermissions: [],
      err: '',

    }
  }

  componentDidMount = () => {
    if (this.props.chosenClass.classId === 0) {
      this.props.history.push("/teacher/classes");
      return;
    }
  };
  handleStartTimeChange = (e) => {
    this.setState({ selectedStartTime: e.target.value })
  }
  handleEndTimeChange = (e) => {
    this.setState({ selectedEndTime: e.target.value })
  }
  handleStartExtraTimeChange(e, index) {
    var StartTimeChange = this.state.extraTimes
    Object.assign(StartTimeChange[index], { startTime: e.target.value });
    this.setState({ extraTimes: StartTimeChange })
  }
  handleEndExtraTimeChange(e, index) {
    var EndTimeChange = this.state.extraTimes
    Object.assign(EndTimeChange[index], { endTime: e.target.value });
    this.setState({ extraTimes: EndTimeChange })
  }

  dayPermissions = async (day) => {
    this.setState({
      extraTimes: [],
      selectedStartTime: '',
      selectedEndTime: '',
      savedPermissions: [],
    })
    try {
      await this.props.chosenClass.getClassPermissions(day)
      this.setState({ savedPermissions: this.props.chosenClass.classPermissions })
      if (this.state.savedPermissions.length > 0) {
        await this.setState({
          selectedStartTime: this.state.savedPermissions[0].start_time,
          selectedEndTime: this.state.savedPermissions[0].end_time,
        })
        this.state.savedPermissions.shift()
        this.state.savedPermissions.map(async (extra) => {
          let index = this.state.extraTimes.length
          let time = { ...extra }
          await this.setState({
            extraTimes: [...this.state.extraTimes, { index: index, startTime: time.start_time, endTime: time.end_time, }]
          })
        })
        this.setState({ savedPermissions: [...this.state.savedPermissions, {}] })
      }
    }
    catch (err) {
      return
    }
  }

  validatePer = async () => {
    var arr = [...this.state.extraTimes, { startTime: this.state.selectedStartTime, endTime: this.state.selectedEndTime }]
    let Errors = PermissionsValidation(arr)
    await this.setState({ err: Errors[0] })
    if (!this.state.err) {
      this.sendInfo(arr)
    }
  }
  sendInfo = async (arr) => {
    let classId = this.props.chosenClass.classId
    try {
      await axios.post(`/api/permission/setClassPermission`, { permissions: arr, classId: classId, day: this.state.selectedDay });
      this.props.errorMsg.setErrorMsg('הרשאות נשמרו בהצלחה')
      this.setState({
        selectedStartTime: '',
        selectedEndTime: '',
        selectedDay: '',
        extraTimes: [],
        err: ''
      })
    }
    catch (err) {
      this.props.errorMsg.setErrorMsg('תקלה בשרת, נסו לשמור שנית')
    }
  }
  weekDays = ["א", "ב", "ג", "ד", "ה", "ו", "ש"]

  selectDay = async (day) => {
    await this.dayPermissions(day)
    this.setState({ selectedDay: day })
  }
  deleteDay = () => {
    this.setState({
      selectedStartTime: '',
      selectedEndTime: '',
      selectedDay: '',
      extraTimes: [],
      savedPermissions: [],
      err: ''
    })
  }
  addtime = () => {
    let index = this.state.extraTimes.length
    this.setState({
      extraTimes: [...this.state.extraTimes, { index: index, startTime: undefined, endTime: undefined }]
    })
  }
  deleteTime = (index) => {
    var arrForChange = this.state.extraTimes
    arrForChange.splice(index, 1);
    this.setState({ extraTimes: arrForChange })
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
            <form className='scrollTime'>
              <h3 className="text">לפי יום:</h3>
              <div className="days">
                {this.weekDays.map((day, index) => {
                  if (this.state.selectedDay === day) {
                    var found = true
                  }
                  else {
                    var found = false
                  }
                  return (
                    <div
                      key={index}
                      className="day"
                      onClick={found ? () => this.deleteDay(day) : () => this.selectDay(day)}
                      style={found ? { backgroundColor: '#043163' } : {}}><p className="daytext" style={found ? { color: 'white' } : { color: '#043163' }}>{day}</p></div>
                  )
                })}

              </div>

              {this.state.selectedDay ?
                <div>
                  <div>
                    <h3 className="text">יום {this.state.selectedDay}</h3>
                    <div className="scroll">

                      <div className="days">
                        <div className="marginRight time" style={{ direction: 'ltr' }}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            required={true}
                            id="time"
                            type="time"
                            value={this.state.selectedStartTime}
                            onChange={this.handleStartTimeChange}
                          />
                        </div>

                        <p className="dash marginRight">-</p>
                        <div className="marginRight time" style={{ direction: 'ltr' }}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            required={true}
                            id="time"
                            type="time"
                            value={this.state.selectedEndTime}
                            onChange={this.handleEndTimeChange}
                          />
                        </div>
                      </div>
                      {this.state.extraTimes.map((time, index) => {
                        return (
                          <div key={index} className="days">
                            <div className="marginRight time" style={{ direction: 'ltr' }}>
                              <TextField
                                InputProps={{ disableUnderline: true }}
                                required={true}
                                id="time"
                                type="time"
                                value={time.startTime}
                                onChange={(e) => this.handleStartExtraTimeChange(e, index)}
                              />
                            </div>

                            <p className="dash marginRight">-</p>
                            <div className="marginRight time" style={{ direction: 'ltr' }}>
                              <TextField
                                InputProps={{ disableUnderline: true }}
                                required={true}
                                id="time"
                                type="time"
                                value={time.endTime}
                                onChange={(e) => this.handleEndExtraTimeChange(e, index)}
                              />
                            </div>
                            <div onClick={() => this.deleteTime(index)} className='ex'>
                              <img style={{ height: '2.5vh', width: '2.5vh' }} src={deleteicon} alt="deleteicon" />
                            </div>
                          </div>)
                      })}
                    </div>
                  </div>
                  <div onClick={this.addtime} className="addTime">
                    <img style={{ width: '2.5vh', marginLeft: '1vw' }} src={addicon} alt="addIcon" />
                    <p className="addtimetext">הוסף שעה ביום זה</p>
                  </div>
                  <h4 className='inputError'>{this.state.err}</h4>
                  <h3 className='save' onClick={this.validatePer}>{this.state.savedPermissions.length > 0 ? 'עדכן' : 'שמור'}</h3>

                </div>
                : <></>}
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

