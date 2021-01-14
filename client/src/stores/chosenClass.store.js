import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'
const axios = require("axios").default;

class ChosenClass {
    classId = 0
    classroomName = ''
    students =[]
    currStudentId = 0
    constructor() {
        makeObservable(this, {
            classId: observable,
            classroomName: observable,
            setClassId: action,
            students: observable,
            callStudents: action,
            currStudentId: observable,
            setCurrStudent:action,
            getCurrStudent:action
        })
    }

    setCurrStudent = (studentId) => {
        this.currStudentId = studentId
    }

    getCurrStudent = () => {
        console.log(this.students[this.currStudentId]);
        return this.students[this.currStudentId]
    }

    callStudents = async (classnum) => {
        let studentsData = await axios.get("/api/classroom/getClassStudents", {
          params: { classId: classnum },
        });
        this.students = studentsData.data;
        console.log("studentsData: ", studentsData.data);
      };

    setClassId=(id, classroomName)=>{
        this.classId = id
        this.classroomName = classroomName
    }
}

const chosenClass = new ChosenClass();
 
export const [chosenClassContext, chosenClassProvider, useChosenClass] = createMobXContext(chosenClass);