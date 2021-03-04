import { createMobXContext } from "@hilma/tools";
import { makeObservable, observable, action } from "mobx";
const axios = require("axios").default;

class Teachers {
  listDataTeachers = [];
  haveMoreTeachers = true;
  successGettingTeachers = true;
  startGetTeachers = false;
  chosenTeacher = null;
  constructor() {
    makeObservable(this, {
      listDataTeachers: observable,
      haveMoreTeachers: observable,
      successGettingTeachers: observable,
      startGetTeachers: observable,
      chosenTeacher: observable,
      getTeachers: action,
      getChosenTeacher: action,
      addTeacher: action,

    });
  }

  addTeacher = (teacherInfo) => {
    console.log('teacherInfo: ', teacherInfo);
    this.listDataTeachers = [teacherInfo, ...this.listDataTeachers]
}

  //get 50 teachers from DB for superadmin
  getTeachers = async () => {
    try {
      this.startGetTeachers = true;
      const { data } = await axios.get("/api/teacher/getTeachers", {
        params: { teachersLength: this.listDataTeachers.length },
      });
      this.listDataTeachers = this.listDataTeachers.concat(
        data.teachersInfo.map((teacher) => {
          teacher.name = teacher.first_name + " " + teacher.last_name;
          teacher.schoolName = teacher.school.name;
          teacher.classes = teacher.classroomTeacher.map((classroom) => {
            return classroom.name;
          });
          return teacher;
        })
      );
      this.haveMoreTeachers = data.haveMoreTeachers;
      this.successGettingTeachers = true;
      this.startGetTeachers = false;
    } catch (error) {
      this.successGettingTeachers = false;
      this.startGetTeachers = false;
    }
  };

  //gets all info about a specific teacher for superadmin
  getChosenTeacher = async (teacherId) => {
    try {
      const { data } = await axios.get("/api/teacher/getTeacherInfo", {
        params: { teacherId: teacherId },
      });
      this.chosenTeacher = data;
    } catch (error) {
      this.successGettingTeachers = false;
    }
  };
}

const teachers = new Teachers();

export const [
  teachersContext,
  teachersProvider,
  useTeachers,
] = createMobXContext(teachers);
