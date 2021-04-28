import { createMobXContext } from "@hilma/tools";
import { makeObservable, observable, action } from "mobx";
const axios = require("axios").default;

class ChosenClass {
  classId = 0;
  classroomName = "";
  students = [];
  searchedStudents = [];
  classPermissions = []
  currStudentIndex = 0;
  studentClassrooms = [];
  successGetInfo = true;
  haveMoreStudents = true;
  startGetInfo = false;
  classPermissionsStart = []
  classPermissionsEnd = []
  needToLogOut = false;
  constructor() {
    makeObservable(this, {
      classId: observable,
      classroomName: observable,
      students: observable,
      searchedStudents: observable,
      currStudentIndex: observable,
      studentClassrooms: observable,
      successGetInfo: observable,
      haveMoreStudents: observable,
      startGetInfo: observable,
      classPermissions: observable,
      classPermissionsStart: observable,
      classPermissionsEnd: observable,
      needToLogOut: observable,
      setClassId: action,
      callStudents: action,
      setCurrStudentClasses: action,
      getCurrStudent: action,
      resetChosenClass: action,
      getClassPermissions: action,
    });
  }


  //gets the classrooms the student belongs to (besides the current class)
  setCurrStudentClasses = async (studentId) => {
    try {
      for (let i = 0; i < this.students.length; i++) {
        if (studentId === this.students[i].id) {
          this.currStudentIndex = i;
        }
      }
      let { data } = await axios.get("/api/student/getStudentsClassrooms", {
        params: { id: studentId },
      });
      this.studentClassrooms = data
    } catch (err) {
      this.successGetInfo = false;
    }
  };

  //says which student is currently chosen
  getCurrStudent = () => {
    return this.students[this.currStudentIndex];
  };

  searchStudentsInClass = async (val, classId) => {
    let Students = await axios.get(`/api/student/searchStudentInTeacher`, {
      params: { classId: classId, value: val },
    });
    this.searchedStudents = [...Students.data]
  }

  searchStudentsReplace = () => {
    this.searchedStudents.replace([])
  }

  //gets 50 students of this specific class
  callStudents = async (classnum) => {
    try {
      this.startGetInfo = true;
      let { data } = await axios.get("/api/student/getClassStudents", {
        params: { classId: classnum, dataLength: this.students.length },
      });
      this.students = this.students.concat(data.students);
      this.haveMoreStudents = data.haveMoreStudents;
      this.startGetInfo = false;
    } catch (err) {
      if(err.response.status === 401){
        this.needToLogOut = true
      }
      this.successGetInfo = false;
      this.startGetInfo = false;
    }
  };

  //save in mobx class name & id
  setClassId = (id, classroomName) => {
    this.classId = id;
    this.classroomName = classroomName;
  };

  resetChosenClass = () => {
    this.classId = 0;
    this.classroomName = "";
    this.students = [];
    this.currStudentIndex = 0;
    this.studentClassrooms = [];
    this.classPermissions = []
  }

  getClassPermissions = async (day) => {
    this.classPermissions = []
    let classroom = this.classId
    let { data } = await axios.get("/api/permission/dayPermissions", {
      params: { classId: classroom, day: day },
    });
    if (data.length > 0) {
      this.classPermissions.push(...data)
      return true
    }
    else { return false }
  }
}


const chosenClass = new ChosenClass();

export const [
  chosenClassContext,
  chosenClassProvider,
  useChosenClass,
] = createMobXContext(chosenClass);
