import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action } from 'mobx'

class Name {
    firstName = ""
    lastName = ""
    id = 0
    constructor() {
        makeObservable(this, {
            firstName: observable,
            lastName: observable,
            id: observable,
            setName: action,
            setId: action,
        })
    }

    setName=(firstName, lastName)=>{
        this.firstName = firstName
        this.lastName = lastName
    }

    setId = (id) => {
        this.id = id
    }
}

const name = new Name();
 
export const [nameContext, nameProvider, useName] = createMobXContext(name);
