import { createMobXContext } from "@hilma/tools";
import { makeObservable, observable, action } from "mobx";

const axios = require("axios").default;

class Schools {
  listDataSchools = [];
  schoolsNames = [];
  searchedSchools=[];
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
      searchSchoolsReplace:action,
      searchedSchools: observable,
      addSchool: action,
    });
  }

  addSchool = async (schoolInfo) => {
    console.log('schoolInfo: ', schoolInfo);
    console.log('this.listDataSchools: ', this.listDataSchools);
    this.listDataSchools = [schoolInfo, ...this.listDataSchools]
  
    // console.log('...this.listDataStudents: ', this.listDataStudents);
    // this.listDataStudents = [...this.listDataStudents]
  
  }

  getAllSchoolsNames = async () => {
    try {
      const { data } = await axios.get("/api/school/getSchoolsNames");
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
      const { data } = await axios.get("/api/school/getSchools", {
        params: { schoolsLength: this.listDataSchools.length },
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
      const { data } = await axios.get("/api/classroom/getSchoolClasses", {
        params: { schoolId: schoolId },
      });
      this.chosenSchool = this.listDataSchools.filter((school) => {
        return school.id === schoolId;
      })[0];
      this.chosenSchool.classrooms = data.map((classroom) => {
        let classInfo = {
          id: classroom.id,
          name: classroom.name,
          classNameError: { toShow: "none", mess: "" },
        };
        classInfo.chosenTeachers = classroom.teachers.map((teacher) => {
          return {
            id: teacher.id,
            name: teacher.first_name + " " + teacher.last_name,
          };
        });
        return classInfo;
      });
      return true
    } catch (error) {
      console.log("choose school error: ", error);
      return false
    }
  };

  searchSchools = async (val) => {
    try{
    let Schools = await axios.get(`/api/school/searchSchools/?val=${val}`);
    if (Schools.data[0] != null) {
        this.searchedSchools = [...Schools.data]
    }}
    catch(err){
console.log("search school err:", err);
    }
}

searchSchoolsReplace = () => {
    this.searchedSchools.replace([])
}
}

const schools = new Schools();
export const [schoolsContext, schoolsProvider, useSchools] = createMobXContext(
  schools
);
