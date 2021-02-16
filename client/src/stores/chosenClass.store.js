import { createMobXContext } from "@hilma/tools";
import { makeObservable, observable, action } from "mobx";
const axios = require("axios").default;

class ChosenClass {
  classId = 0;
  classroomName = "";
  students = [];
  currStudentIndex = 0;
  studentClassrooms = [];
  successGetInfo = true;
  haveMoreStudents = true;
  startGetInfo = false;
  constructor() {
    makeObservable(this, {
      classId: observable,
      classroomName: observable,
      setClassId: action,
      students: observable,
      callStudents: action,
      currStudentIndex: observable,
      setCurrStudentClasses: action,
      getCurrStudent: action,
      studentClassrooms: observable,
      successGetInfo: observable,
      haveMoreStudents: observable,
      startGetInfo: observable,
      resetChosenClass: action,
    });
  }

  //gets the classrooms the student belongs to (besides the current class)
  setCurrStudentClasses = async (studentIndex) => {
    try {
      this.currStudentIndex = studentIndex;
      let { data } = await axios.get("/api/student/getStudentsClassrooms", {
        params: { id: this.students[studentIndex].id },
      });
      this.studentClassrooms = data
    } catch (err) {
      this.successGetInfo = false;
    }
  };

  //says which student is currently chosen
  getCurrStudent = () => {
    console.log(this.studentClassrooms);
    return this.students[this.currStudentIndex];
  };

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
  }
}

const chosenClass = new ChosenClass();

export const [
  chosenClassContext,
  chosenClassProvider,
  useChosenClass,
] = createMobXContext(chosenClass);
