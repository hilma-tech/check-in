import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action } from 'mobx'
const axios = require("axios").default;

class Name {
    firstName = ""
    lastName = ""
    teacherClasses = []
    haveMoreClasses = true
    successGettingClasses = true;
    startGetClasses = false;
    constructor() {
        makeObservable(this, {
            firstName: observable,
            lastName: observable,
            teacherClasses: observable,
            haveMoreClasses: observable,
            successGettingClasses: observable,
            startGetClasses: observable,
            setTeacher: action,
            getMoreClasses: action,
        })
    }

    setTeacher = async () => {
    try{
        this.startGetClasses = true
        this.successGettingClasses = true
        let {data} = await axios.get("/api/teacher/getTeacherClasses",{ params:{ classesLength: this.teacherClasses.length }});
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.teacherClasses = data.currTeacherClasses
        this.haveMoreClasses = data.haveMoreClasses
        this.startGetClasses = false
        } catch(err){
        this.startGetClasses = false
        this.successGettingClasses = false
            console.log('set teacher err: ', err);
        }
    }

    getMoreClasses = async() => {
        try{
            this.startGetClasses = true
            this.successGettingClasses = true
            let {data} = await axios.get("/api/teacher/getTeacherClasses",{ params:{ classesLength: this.teacherClasses.length }});
            this.teacherClasses = this.teacherClasses.concat(data.currTeacherClasses)
            this.haveMoreClasses = data.haveMoreClasses
            this.startGetClasses = false
          } catch(err){
            this.startGetClasses = false
            this.successGettingClasses = false
              console.log('set teacher err: ', err);
          }

    }
}

const name = new Name();
 
export const [nameContext, nameProvider, useName] = createMobXContext(name);
