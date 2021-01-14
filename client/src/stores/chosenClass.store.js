import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'
const axios = require("axios").default;

class ChosenClass {
    classId = 0
    classroomName = ''
    students =[]
    constructor() {
        makeObservable(this, {
            classId: observable,
            classroomName: observable,
            setClassId: action,
            students: observable,
            callStudents: action,
        })
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