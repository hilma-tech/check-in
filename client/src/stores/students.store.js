import {
    createMobXContext
} from '@hilma/tools'
import {
    makeObservable,
    observable,
    action
} from 'mobx'

const axios = require("axios").default;

class Students {
    listDataStudents = []
    searchedStudents = []
    haveMoreStudents = true
    successGettingStudents = true;
    startGetStudents = false;
    chosenStudent = {}
    constructor() {
        makeObservable(this, {
            listDataStudents: observable,
            searchedStudents: observable,
            haveMoreStudents: observable,
            successGettingStudents: observable,
            startGetStudents: observable,
            chosenStudent: observable,
            getStudents: action,
            getChosenStudent: action,
            addStudent: action,
            addMultiStudents: action,
            searchStudents: action,
            searchStudentsReplace: action,
            deleteStudent: action,
            updateStudent: action,
        })
    }

    //gets 50 students from DB for superadmin
    getStudents = async () => {
        try {
            this.startGetStudents = true;
            const {
                data
            } = await axios.get("/api/student/getStudents", {
                params: {
                    studentsLength: this.listDataStudents.length
                }
            });
            let newStudents = data.studentsInfo.map((student) => {
                student.name = student.first_name + " " + student.last_name;
                student.schoolName = student.school.name
                student.classes = student.classroomStudent.map((classroom) => {
                    return classroom.name
                })
                return student
            })
            this.listDataStudents = this.listDataStudents.concat(newStudents)
            this.haveMoreStudents = data.haveMoreStudents;
            this.successGettingStudents = true;
            this.startGetStudents = false;
        } catch (error) {
            this.successGettingStudents = false
            this.startGetStudents = false;
        }
    }

    addStudent = (studentInfo) => {
        this.listDataStudents = [studentInfo, ...this.listDataStudents]
    }

    addMultiStudents = (studentsList) => {
        this.listDataStudents = studentsList.concat(this.listDataStudents)
    }

    searchStudents = async (val) => {
        let Students = await axios.get(`/api/student/searchStudentSuperadmin/?val=${val}`);
        if (Students.data[0] != null) {
            let newStudentsSearch = Students.data.map((student) => {
                student.name = student.first_name + " " + student.last_name;
                student.schoolName = student.school.name
                student.classes = student.classroomStudent.map((classroom) => {
                    return classroom.name
                })
                return student
            })
            this.searchedStudents = [...newStudentsSearch]
        }
    }

    searchStudentsReplace = () => {
        this.searchedStudents.replace([])
    }
    //gets all info on a specific student to display
    getChosenStudent = (studentId) => {
        this.chosenStudent = (this.listDataStudents.filter((student) => {
            return student.id === studentId
        }))[0]
    }

    deleteStudent = async () => {
        try {
            await axios.post("/api/student/deleteStudent", {
                studentId: this.chosenStudent.id,
              });
            this.listDataStudents = this.listDataStudents.filter((student) => {
                return student.id !== this.chosenStudent.id
            })
            return true
        } catch (err) {
            return false
        }
    }

    updateStudent = (newStudentInfo) => {
        let studentId = this.chosenStudent.id
        this.listDataStudents = this.listDataStudents.map((student)=>{
            if(student.id === studentId){
                return newStudentInfo
            } else {
                return student
            }
        })
    }
}

const students = new Students();

export const [studentsContext, studentsProvider, useStudents] = createMobXContext(students);