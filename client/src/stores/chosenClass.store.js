import { createMobXContext } from "@hilma/tools";
import { makeObservable, observable, action } from "mobx";
const axios = require("axios").default;

class ChosenClass {
  classId = 0;
  classroomName = "";
  students = [];
  searchedStudents = [];
  currStudentIndex = 0;
  studentClassrooms = [];
  successGetInfo = true;
  haveMoreStudents = true;
  startGetInfo = false;
  classPermissionsStart = []
  classPermissionsEnd = []
  constructor() {
    makeObservable(this, {
      classId: observable,
      classroomName: observable,
      setClassId: action,
      students: observable,
      searchedStudents: observable,
      callStudents: action,
      currStudentIndex: observable,
      setCurrStudentClasses: action,
      getCurrStudent: action,
      studentClassrooms: observable,
      successGetInfo: observable,
      haveMoreStudents: observable,
      startGetInfo: observable,
      resetChosenClass: action,
      classPermissionsStart: observable,
      classPermissionsEnd: observable,
      getClassPermissions: action
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
    this.classPermissionsStart=[];
    this.classPermissionsEnd=[];
  }
  getClassPermissions = async () => {
    let classroom = this.classId
    let { data } = await axios.get("/api/permission/getClassPermissions", {
      params: { classId: classroom },
    });
    if (data.length > 0) {
      this.classPermissionsStart.push(data[0].start_time)
      this.classPermissionsEnd.push(data[0].end_time)
      return true
    }
    else {return false}
  }
}

const chosenClass = new ChosenClass();

export const [
  chosenClassContext,
  chosenClassProvider,
  useChosenClass,
] = createMobXContext(chosenClass);
