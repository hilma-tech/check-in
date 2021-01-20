import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'
const axios = require("axios").default;

class ChosenClass {
    classId = 0
    classroomName = ''
    students =[]
    currStudentIndex = 0
    studentClassrooms = []
    successGetInfo = true
    constructor() {
        makeObservable(this, {
            classId: observable,
            classroomName: observable,
            setClassId: action,
            students: observable,
            callStudents: action,
            currStudentIndex: observable,
            setCurrStudent:action,
            getCurrStudent:action,
            studentClassrooms: observable,
            successGetInfo: observable,
        })
    }

    setCurrStudent = async (studentIndex) => {
        try{    
            this.currStudentIndex = studentIndex
            let {data} = await axios.get("/api/student/getStudentsClassrooms", {params: {studentId: this.students[studentIndex].id}})
            let classId = this.classId
            this.studentClassrooms = data.filter((classroom)=>{
                return classroom.id != classId
            })
          } catch(err){
            this.successGetInfo = false
          }

    }

    getCurrStudent = () => {
        return this.students[this.currStudentIndex]
    }

    callStudents = async (classnum) => {
        try{    
            let studentsData = await axios.get("/api/classroom/getClassStudents", {
              params: { classId: classnum },
            });
            this.students = studentsData.data;
            console.log("studentsData: ", studentsData.data);
        } catch(err){
         this.successGetInfo = false
        }
      };

    setClassId=(id, classroomName)=>{
        this.classId = id
        this.classroomName = classroomName
    }
}

const chosenClass = new ChosenClass();
 
export const [chosenClassContext, chosenClassProvider, useChosenClass] = createMobXContext(chosenClass);