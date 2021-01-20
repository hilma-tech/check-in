import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action } from 'mobx'

const axios = require("axios").default;

class Name {
    name = ""
    id = 0
    constructor() {
        makeObservable(this, {
            name: observable,
            id: observable,
            setName: action,
            setId: action,
            getTeacherName: action,
        })
    }

    setName=(name)=>{
        this.name = name
    }

    setId = (id) => {
        this.id = id
    }

    getTeacherName = async() => {
        try{
            const { data } = await axios.get("/api/teacher/getTeacherName",{ params:{ teacherId: this.id }});
            console.log('data: ', data);
        }catch (error){
            console.log('error!!');
        }
    }
}

const name = new Name();
 
export const [nameContext, nameProvider, useName] = createMobXContext(name);
