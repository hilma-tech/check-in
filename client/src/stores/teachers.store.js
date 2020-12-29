import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'

const axios = require("axios").default;

class Teachers {
    listDataTeachers = []
    haveMoreTeachers = true
    successGettingTeachers = true;
    startGetTeachers = false;
    constructor() {
        makeObservable(this, {
            listDataTeachers: observable,
            haveMoreTeachers: observable,
            successGettingTeachers: observable,
            startGetTeachers: observable,
            setTeachers: action,
        })
    }

    setTeachers = async () => {
        try{
            this.startGetGames = true;
            const { data } = await axios.get("/api/teacher/getTeachers",{ params:{ teachersLength: this.listDataTeachers.length }});
            this.listDataTeachers = this.listDataTeachers.concat(data.teachersInfo.map((teacher) => {
                teacher.schoolName = teacher.School.name
                return teacher
              }))
            this.haveMoreTeachers = data.haveMoreTeachers;
            this.successGettingTeachers = true;
            this.startGetTeachers = false;
        }catch (error){
            this.successGettingTeachers = false
            this.startGetTeachers = false;
        }
    }
}

const teachers = new Teachers();
 
export const [teachersContext, teachersProvider, useTeachers] = createMobXContext(teachers);