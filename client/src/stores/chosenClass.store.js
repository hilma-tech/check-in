import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'

class ChosenClass {
    classId = 0
    classroomName = ''
    constructor() {
        makeObservable(this, {
            classId: observable,
            classroomName: observable,
            setClassId: action,
        })
    }

    setClassId=(id, classroomName)=>{
        this.classId = id
        this.classroomName = classroomName
    }
}

const chosenClass = new ChosenClass();
 
export const [chosenClassContext, chosenClassProvider, useChosenClass] = createMobXContext(chosenClass);