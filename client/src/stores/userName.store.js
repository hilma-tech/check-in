import { createMobXContext } from "@hilma/tools";
import { makeObservable, observable, action } from "mobx";
const axios = require("axios").default;

class UserName {
  firstName = "";
  lastName = "";
  teacherClasses = [];
  haveMoreClasses = true;
  successGettingClasses = true;
  startGetClasses = false;
  needToLogOut = false;
  constructor() {
    makeObservable(this, {
      firstName: observable,
      lastName: observable,
      teacherClasses: observable,
      haveMoreClasses: observable,
      successGettingClasses: observable,
      startGetClasses: observable,
      needToLogOut: observable,
      getTeacherInfo: action,
      getMoreClasses: action,
      resetUser: action,
    });
  }

  //gets the name of the teacher and his classes in batches of 50
  getTeacherInfo = async () => {
    try {
      this.startGetClasses = true;
      this.successGettingClasses = true;
      let { data } = await axios.get("/api/teacher/getTeacherClasses", {
        params: { classesLength: this.teacherClasses.length },
      });
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.teacherClasses = data.currTeacherClasses;
      this.haveMoreClasses = data.haveMoreClasses;
      this.startGetClasses = false;
    } catch (err) {
      if(err.response.status === 401){
        this.needToLogOut = true
      }
      this.startGetClasses = false;
      this.successGettingClasses = false;
    }
  };

  //gets more classes for the teacher side (50 each time)
  getMoreClasses = async () => {
    try {
      this.startGetClasses = true;
      this.successGettingClasses = true;
      let { data } = await axios.get("/api/teacher/getTeacherClasses", {
        params: { classesLength: this.teacherClasses.length },
      });
      this.teacherClasses = this.teacherClasses.concat(data.currTeacherClasses);
      this.haveMoreClasses = data.haveMoreClasses;
      this.startGetClasses = false;
    } catch (err) {
      this.startGetClasses = false;
      this.successGettingClasses = false;
    }
  };

  //resets all the information about the current teacher
  resetUser = () => {
    this.firstName = "";
    this.lastName = "";
    this.teacherClasses = [];
    this.haveMoreClasses = true;
    this.successGettingClasses = true;
    this.startGetClasses = false;
  };
}

const userName = new UserName();

export const [userNameContext, userNameProvider, useUserName] = createMobXContext(userName);
