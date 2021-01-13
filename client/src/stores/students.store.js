import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'

const axios = require("axios").default;

class Students {
    listDataStudents = []
    haveMoreStudents = true
    successGettingStudents = true;
    startGetStudents = false;
    constructor() {
        makeObservable(this, {
            listDataStudents: observable,
            haveMoreStudents: observable,
            successGettingStudents: observable,
            startGetStudents: observable,
            getStudents: action,
        })
    }

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
            console.log('newStudents   ',newStudents);
            this.listDataStudents = this.listDataStudents.concat(newStudents)
            this.haveMoreStudents = data.haveMoreStudents;
            this.successGettingStudents = true;
            this.startGetStudents = false;
        }catch (error){
            this.successGettingStudents = false
            this.startGetStudents = false;
        }
    }
}

const students = new Students();
 
export const [studentsContext, studentsProvider, useStudents] = createMobXContext(students);