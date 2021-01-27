import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'

const axios = require("axios").default;

class Schools {
    listDataSchools = []
    haveMoreSchools = true
    successGettingSchools = true;
    startGetSchools = false;
    chosenSchool = {}
    constructor() {
        makeObservable(this, {
            listDataSchools: observable,
            haveMoreSchools: observable,
            successGettingSchools: observable,
            startGetSchools: observable,
            chosenSchool: observable,
            getSchools: action,
            getChosenSchool: action,
        })
    }

    getSchools = async () => {
        try{
            this.startGetSchools = true;
            const { data } = await axios.get("/api/school/getSchools",{ params:{ schoolsLength: this.listDataSchools.length }});
            this.listDataSchools = this.listDataSchools.concat(data.schoolsInfo)
            this.haveMoreSchools = data.haveMoreSchools;
            this.successGettingSchools = true;
            this.startGetSchools = false;
        } catch (error){
            this.successGettingSchools = false
            this.startGetSchools = false;
        }
    }

    getChosenSchool = async (schoolId) => {
        try{
            const { data } = await axios.get("/api/classroom/getSchoolClasses",{ params:{ schoolId: schoolId }});
            this.chosenSchool = (this.listDataSchools.filter((school)=>{
                return school.id === schoolId
            }))[0]
            this.chosenSchool.classrooms = data.map((classroom)=>{
                let classInfo = {id: classroom.id, name: classroom.name, classNameError: { toShow: 'none', mess: '' }}
                classInfo.chosenTeachers = classroom.teachers.map((teacher)=>{
                    return {id: teacher.id, name: (teacher.first_name + " " + teacher.last_name)}
                })
                return classInfo
            })
            //[{ id: 1, name: "ד'2", chosenTeachers: [], classNameError: { toShow: 'none', mess: '' }, }],    { id: id, name: value }
        } catch (error){
            console.log('choose school error: ', error);
        }
    }
}

const schools = new Schools(); 
export const [schoolsContext, schoolsProvider, useSchools] = createMobXContext(schools);
