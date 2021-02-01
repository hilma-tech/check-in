import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action } from 'mobx'
const axios = require("axios").default;

class Name {
    firstName = ""
    lastName = ""
    teacherClasses = []
    constructor() {
        makeObservable(this, {
            firstName: observable,
            lastName: observable,
            teacherClasses: observable,
            setTeacher: action,
        })
    }

    setTeacher = async (id) => {
        try{
            let {data} = await axios.get("/api/teacher/getTeacherClasses", { id: id });
            this.firstName = data.firstName
            this.lastName = data.lastName
            this.teacherClasses = data.currTeacherClasses
          } catch(err){
              console.log('set teacher err: ', err);
          }
    }
}

const name = new Name();
 
export const [nameContext, nameProvider, useName] = createMobXContext(name);
