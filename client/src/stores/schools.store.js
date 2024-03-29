import {
  createMobXContext
} from "@hilma/tools";
import {
  makeObservable,
  observable,
  action
} from "mobx";
import { Axios, EmptMsg, HideStyle } from "../tools/GlobalVarbs";

class Schools {
  listDataSchools = [];
  schoolsNames = [];
  searchedSchools = [];
  haveMoreSchools = true;
  successGettingSchools = true;
  startGetSchools = false;
  chosenSchool = {};
  constructor() {
    makeObservable(this, {
      listDataSchools: observable,
      haveMoreSchools: observable,
      successGettingSchools: observable,
      startGetSchools: observable,
      chosenSchool: observable,
      schoolsNames: observable,
      getSchools: action,
      getChosenSchool: action,
      getAllSchoolsNames: action,
      searchSchools: action,
      searchSchoolsReplace: action,
      searchedSchools: observable,
      addSchool: action,
      editSchool: action,
      deleteSchool: action,
    });
  }

  addSchool = async (schoolInfo) => {
    this.listDataSchools = [schoolInfo, ...this.listDataSchools]
  }

  getAllSchoolsNames = async () => {
    try {
      const { data } = await Axios.get("/api/school/getSchoolsNames");
      this.schoolsNames = data
      this.successGettingSchools = true;
    } catch (error) {
      this.successGettingSchools = false;
    }
  }

  //gets 50 schools for the superadmin
  getSchools = async () => {
    try {
      this.startGetSchools = true;
      const {
        data
      } = await Axios.get("/api/school/getSchools", {
        params: {
          schoolsLength: this.listDataSchools.length
        },
      });
      this.listDataSchools = this.listDataSchools.concat(data.schoolsInfo);
      this.haveMoreSchools = data.haveMoreSchools;
      this.successGettingSchools = true;
      this.startGetSchools = false;
    } catch (error) {
      this.successGettingSchools = false;
      this.startGetSchools = false;
    }
  };

  //gets all the information about a specfic school in superadmin
  getChosenSchool = async (schoolId) => {
    try {
      const {
        data
      } = await Axios.get("/api/classroom/getSchoolClasses", {
        params: {
          schoolId: schoolId
        },
      });
      this.chosenSchool = this.listDataSchools.filter((school) => {
        return school.id === schoolId;
      })[0];
      this.chosenSchool.classrooms = data.map((classroom) => {
        let classInfo = {
          id: classroom.id,
          name: classroom.name,
          classNameError: {
            toShow: HideStyle,
            mess: EmptMsg
          },
        };
        classInfo.chosenTeachers = classroom.teachers.map((teacher) => {
          return {
            id: teacher.id,
            name: teacher.first_name + " " + teacher.last_name,
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            email: teacher.email
          };
        });
        return classInfo;
      });
      return true
    } catch (error) {
      return false
    }
  };

  deleteSchool = async () => {
    try {
      await Axios.post("/api/school/deleteSchool", {
        schoolId: this.chosenSchool.id,
      });
      this.listDataSchools = this.listDataSchools.filter((school) => {
        return school.id !== this.chosenSchool.id
      })
      return true
    } catch (err) {
      return false
    }
  }

  searchSchools = async (val) => {
    try {
      let Schools = await Axios.get(`/api/school/searchSchools/?val=${val}`);
      if (Schools.data[0] != null) {
        this.searchedSchools = [...Schools.data]
      }
    } catch (err) {
      return err
    }
  }

  searchSchoolsReplace = () => {
    this.searchedSchools.replace([])
  }

  editSchool = (schoolId, schoolName, schoolCity) => {
    for (let i = 0; i < this.listDataSchools.length; i++) {
      if (this.listDataSchools[i].id === schoolId) {
        this.listDataSchools[i].name = schoolName
        this.listDataSchools[i].city = schoolCity
      }
    }
  }
}

const schools = new Schools();
export const [schoolsContext, schoolsProvider, useSchools] = createMobXContext(
  schools
);