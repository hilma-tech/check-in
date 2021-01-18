import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'
const axios = require("axios").default;

class ChosenClass {
    classId = 0
    classroomName = ''
    students =[]
    currStudentIndex = 0
    studentClassrooms = []
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
        })
    }

    setCurrStudent = async (studentIndex) => {
        console.log(studentIndex);
        this.currStudentIndex = studentIndex
        let {data} = await axios.get("/api/student/getStudentsClassrooms", {params: {studentId: this.students[studentIndex].id}})
        let classId = this.classId
        this.studentClassrooms = data.filter((classroom)=>{
            return classroom.id != classId
        })
        console.log('studentClassrooms: ', this.studentClassrooms);
    }

    getCurrStudent = () => {
        console.log(this.students[this.currStudentIndex]);
        return this.students[this.currStudentIndex]
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