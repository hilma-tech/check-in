import {
  createMobXContext
} from "@hilma/tools";
import {
  makeObservable,
  observable,
  action,
} from "mobx";
import {
  Axios
} from "../tools/GlobalVarbs";

class Teachers {
  listDataTeachers = [];
  searchedTeachers = [];
  haveMoreTeachers = true;
  successGettingTeachers = true;
  startGetTeachers = false;
  chosenTeacher = null;
  constructor() {
    makeObservable(this, {
      listDataTeachers: observable,
      searchedTeachers: observable,
      haveMoreTeachers: observable,
      successGettingTeachers: observable,
      startGetTeachers: observable,
      chosenTeacher: observable,
      getTeachers: action,
      getChosenTeacher: action,
      addTeacher: action,
      searchTeachersReplace: action,
      searchTeachers: action,
      updateTeacher: action,
    });
  }

  addTeacher = (teacherInfo) => {
    this.listDataTeachers = [teacherInfo, ...this.listDataTeachers];
  };

  //get 50 teachers from DB for superadmin
  getTeachers = async () => {
    try {
      this.startGetTeachers = true;
      const {
        data
      } = await Axios.get("/api/teacher/getTeachers", {
        params: {
          teachersLength: this.listDataTeachers.length
        },
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

  searchTeachers = async (val) => {
    try{
      let Teachers = await Axios.get(
        `/api/teacher/searchTeacherSuperadmin/?val=${val}`
      );
      if (Teachers.data[0] != null) {
        let newTeachersSearch = Teachers.data.map((teacher) => {
          teacher.name = teacher.first_name + " " + teacher.last_name;
          teacher.schoolName = teacher.school.name;
          teacher.classes = teacher.classroomTeacher.map((classroom) => {
            return classroom.name;
          });
          return teacher;
        });
        this.searchedTeachers = [...newTeachersSearch];
      }
    } catch(err){
return err    }
  };

  updateTeacher = (newTeacherInfo) => {
    let teacherId = newTeacherInfo.id
    this.listDataTeachers = this.listDataTeachers.map((teacher) => {
      if (teacher.id === teacherId) {
        return newTeacherInfo
      } else {
        return teacher
      }
    })
  }

  deleteTeacher = async () => {
    try {
      await Axios.post("/api/teacher/deleteTeacher", {
        teacherId: this.chosenTeacher.id,
      });
      this.listDataTeachers = this.listDataTeachers.filter((teacher) => {
        return teacher.id !== this.chosenTeacher.id;
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  searchTeachersReplace = () => {
    this.searchedTeachers.replace([]);
  };

  //gets all info about a specific teacher for superadmin
  getChosenTeacher = async (teacherId) => {
    try {
      const {
        data
      } = await Axios.get("/api/teacher/getTeacherInfo", {
        params: {
          teacherId: teacherId
        },
      });
      this.chosenTeacher = data;
    } catch (error) {
      this.successGettingTeachers = false;
    }
  };

  removeDeletedTeacher = (schoolId) => {
    this.listDataTeachers = this.listDataTeachers.filter((teacher) => {
        return teacher.school.id !== schoolId
    })
}
}

const teachers = new Teachers();

export const [
  teachersContext,
  teachersProvider,
  useTeachers,
] = createMobXContext(teachers);