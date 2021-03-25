import React, { Component } from "react";
import PageTitle from "../../component/teacher/PageTitle";
import SmallMenuBar from "../../component/teacher/SmallMenuBar";
import SmallNavBar from "../../component/teacher/SmallNavBar";
import ArrowBar from "../../component/teacher/ArrowBar.jsx";
import '../../style/teacher/premissions.css'
import { makeStyles, TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { withContext } from "@hilma/tools";
import { chosenClassContext } from "../../stores/chosenClass.store";
import { errorMsgContext } from "../../stores/error.store";
import addicon from "../../img/addicon.svg";
import deleteicon from "../../img/delete.svg";
const axios = require("axios").default;

class Permissions extends Component {
  constructor() {
    super()
    this.state = {
      selectedStartTime: "08:00",
      selectedEndTime: "14:00",
      selectedDays: [],
      extraTimes: []
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
      // let t=  this.state.selectedDays.map(async (day) => {
      //   await axios.post(`/api/permission/setClassPermission`, { startTime: this.state.selectedStartTime, endTime: this.state.selectedEndTime, day: day, classId: classId });
      // })
      // console.log('t: ', t);
      this.props.errorMsg.setErrorMsg('הרשאות נשמרו בהצלחה')
      this.setState({
        selectedStartTime: "08:00",
        selectedEndTime: "14:00",
        selectedDays: []
      })
    }
    catch (err) {
      this.props.errorMsg.setErrorMsg('תקלה בשרת, נסו לשמור שנית')

    }
  }
  weekDays = ["א", "ב", "ג", "ד", "ה", "ו", "ז"]
  selectDay = (day) => {
    this.setState({ selectedDays: [...this.state.selectedDays, day] })
  }
  deleteSelectedDay = (day) => {
    let deleteDay = this.state.selectedDays.filter(days => { return days !== day });

    this.setState({ selectedDays: [...deleteDay] })
  }
  addtime = () => {
    console.log('add');
    this.setState({
      extraTimes: [...this.state.extraTimes,
      <div className="days">
        <div className="marginRight time" style={{ direction: 'ltr' }}>
          < TextField
            InputProps={{ disableUnderline: true }}
            required={false}
            id="time"
            type="time"
            defaultValue="08:00"
            onChange={this.handleStartTimeChange}
          />
        </div>

        <p className="dash marginRight">-</p>
        <div className="marginRight time" style={{ direction: 'ltr' }}>
          < TextField
            InputProps={{ disableUnderline: true }}
            required={false}
            id="time"
            type="time"
            defaultValue="14:00"
            onChange={this.handleEndTimeChange}
          />
        </div>
        {/* <img style={{ width: '2.5vh', margin: '0', marginRight: '2vw' }} src={deleteicon} alt="deleteicon" /> */}
      </div>]
    })
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
              <h3 className="text">לפי ימים:</h3>
              <div className="days">
                {this.weekDays.map((day, index) => {
                  var found = this.state.selectedDays.find(days => days === day);
                  return (
                    <div
                      key={index}
                      className="day"
                      onClick={found ? () => this.deleteSelectedDay(day) : () => this.selectDay(day)}
                      style={found ? { backgroundColor: '#043163' } : {}}><p className="daytext" style={found ? { color: 'white' } : { color: '#043163' }}>{day}</p></div>
                  )
                })}

              </div>

              {this.state.selectedDays[0] ?
                <div>
                  {this.state.selectedDays.length > 1 ?

                    <h3 className="text">ימים {this.state.selectedDays.map((day, index) => {
                      if (index === 0) {
                        return ` ${day}`
                      }
                      else { return `, ${day}` }
                    })}</h3>
                    :
                    <h3 className="text">יום {this.state.selectedDays[0]}</h3>
                  }
                  <div className="scroll">
                    <div className="days">
                      <div className="marginRight time" style={{ direction: 'ltr' }}>
                        < TextField
                          InputProps={{ disableUnderline: true }}
                          required={true}
                          id="time"
                          type="time"
                          defaultValue="08:00"
                          onChange={this.handleStartTimeChange}
                        />
                      </div>

                      <p className="dash marginRight">-</p>
                      <div className="marginRight time" style={{ direction: 'ltr' }}>
                        < TextField
                          InputProps={{ disableUnderline: true }}
                          required={true}
                          id="time"
                          type="time"
                          defaultValue="14:00"
                          onChange={this.handleEndTimeChange}
                        />
                      </div>
                    </div>
                    {this.state.extraTimes.map((time) => {
                      return time
                    })}
                  </div>
                  <div onClick={this.addtime} className="addTime">
                    <img style={{ width: '2.5vh', marginLeft: '1vw' }} src={addicon} alt="addIcon" />
                    {this.state.selectedDays.length > 1 ? <p className="addtimetext">הוסף שעה בימים אלו</p> : <p className="addtimetext">הוסף שעה ביום זה</p>}
                  </div>
                  <h3 className='save' onClick={this.sendInfo}>שמור</h3>

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

