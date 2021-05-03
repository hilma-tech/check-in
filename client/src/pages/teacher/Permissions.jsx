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
import { Axios, Delete, GetInfoErrorMsg, HideStyle, OnUnauthorizedError, TeacherDeletedMsg } from "../../tools/GlobalVarbs";
import { userNameContext } from "../../stores/userName.store";

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
      disableButtons: false,

    }
  }

  componentDidMount = async () => {
    if (this.props.chosenClass.classId === 0) {
      if(this.props.location.state === undefined){
        this.props.history.push("/teacher/classes");
        return;
      }
      
      await this.props.name.getTeacherInfo();
      if (!this.props.name.successGettingClasses) {
        if (this.props.name.needToLogOut) {
          this.props.errorMsg.setErrorMsg(
            TeacherDeletedMsg
          );
          await this.props.logout();
        } else {
          this.props.errorMsg.setErrorMsg(
            GetInfoErrorMsg
          );
        }
      }

      let className = await this.props.name.getClassById(this.props.location.state.data)
      if(className.length === 0){
        this.props.history.push("/teacher/classes");
        return;
      }
      this.props.chosenClass.setClassId(this.props.location.state.data, className);
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
    if (!this.state.err && !this.state.disableButtons) {
      await this.setState({ disableButtons: true })
      this.sendInfo(arr)
    }
  }
  sendInfo = async (arr) => {
    let classId = this.props.chosenClass.classId
    try {
      await Axios.post(`/api/permission/setClassPermission`, { permissions: arr, classId: classId, day: this.state.selectedDay });
      this.props.errorMsg.setErrorMsg('הרשאות נשמרו בהצלחה')
      await this.setState({ disableButtons: false })
    }
    catch (err) {
      this.props.errorMsg.setErrorMsg('תקלה בשרת, נסו לשמור שנית')
    }
  }

  sendDelete = async (start, end, index, classId, day) => {
    if (!this.state.disableButtons) {
      await this.setState({ disableButtons: true })
      await Axios.post(`/api/permission/deletePermission`, { start_time: start, end_time: end, classroom_id: classId, day: day })
      if (index !== null) {
        var arrForChange = this.state.extraTimes
        arrForChange.splice(index, 1);
        this.setState({
          extraTimes: arrForChange,
        })
        await this.setState({ disableButtons: false })

      }
      else {
        this.dayPermissions(this.state.selectedDay)
        if (this.props.chosenClass.classPermissions.length === 0) {
          this.setState({
            selectedStartTime: '',
            selectedEndTime: ''
          })
        }
        await this.setState({ disableButtons: false })
      }
    }
  }
  deletePermission = async (start, end, index) => {
    let classId = this.props.chosenClass.classId
    let day = this.state.selectedDay
    try {
      this.props.errorMsg.setQuestion(
        "האם אתה בטוח שברצונך למחוק הרשאה זו?",
        () => this.sendDelete(start, end, index, classId, day)
        ,
        Delete
      )
    }
    catch (err) {
      if(err.status === OnUnauthorizedError){
        this.props.errorMsg.setErrorMsg(
          TeacherDeletedMsg
        );
      } else {
        this.props.errorMsg.setErrorMsg('תקלה בשרת, נסו לשמור שנית')
      }
    }
  }

  weekDays = ["א", "ב", "ג", "ד", "ה", "ו", "ש"]

  selectDay = async (day) => {
    await this.dayPermissions(day)
    this.setState({
      selectedDay: day, err: ''
    })
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
  deleteTime = async (index) => {
    var arrForChange = this.state.extraTimes
    if (arrForChange[index].startTime && arrForChange[index].endTime) {
      await this.deletePermission(arrForChange[index].startTime, arrForChange[index].endTime, index)
    }
    else {
      arrForChange.splice(index, 1);
      this.setState({ extraTimes: arrForChange })
    }
    this.setState({ err: '' })

  }

  deleteFirstTime = async () => {
    await this.deletePermission(this.state.selectedStartTime, this.state.selectedEndTime, null)
    this.setState({ err: '' })
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
                        {this.state.selectedStartTime && this.state.selectedEndTime ? <div onClick={this.deleteFirstTime} className='ex'>
                          <img style={{ height: '2.5vh', width: '2.5vh' }} src={deleteicon} alt="deleteicon" />
                        </div> : <></>}
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
                  <h3 className='save' style={{ pointerEvents: this.state.disableButtons ?  HideStyle : ""}} onClick={this.validatePer}>{this.state.savedPermissions.length > 0 ? 'עדכן' : 'שמור'}</h3>
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
  name: userNameContext,
};

export default withContext(mapContextToProps)(withRouter(observer(Permissions)));

