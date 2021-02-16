import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'

const axios = require("axios").default;

class Students {
    listDataStudents = []
    haveMoreStudents = true
    successGettingStudents = true;
    startGetStudents = false;
    chosenStudent = {}
    constructor() {
        makeObservable(this, {
            listDataStudents: observable,
            haveMoreStudents: observable,
            successGettingStudents: observable,
            startGetStudents: observable,
            chosenStudent: observable,
            getStudents: action,
            getChosenStudent: action,
        })
    }

    //gets 50 students from DB for superadmin
    getStudents = async () => {
        try{
            this.startGetStudents = true;
            const { data } = await axios.get("/api/student/getStudents",{ params:{ studentsLength: this.listDataStudents.length }});
            let newStudents = data.studentsInfo.map((student) => {
                student.name = student.first_name + " " + student.last_name;
                student.schoolName = student.school.name
                student.classes = student.classroomStudent.map((classroom)=>{return classroom.name})
                return student
              })
            this.listDataStudents = this.listDataStudents.concat(newStudents)
            this.haveMoreStudents = data.haveMoreStudents;
            this.successGettingStudents = true;
            this.startGetStudents = false;
        }catch (error){
            this.successGettingStudents = false
            this.startGetStudents = false;
        }
    }

    //gets all info on a specific student to display
    getChosenStudent = (studentId) => {
        this.chosenStudent = (this.listDataStudents.filter((student)=>{
            return student.id === studentId
        }))[0]
    }
}

const students = new Students();
 
export const [studentsContext, studentsProvider, useStudents] = createMobXContext(students);