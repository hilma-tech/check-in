import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action } from 'mobx'

class Name {
    name = ""
    id = 0
    constructor() {
        makeObservable(this, {
            name: observable,
            id: observable,
            setName: action,
            setId: action,
        })
    }

    setName=(name)=>{
        this.name = name
    }

    setId = (id) => {
        this.id = id
    }
}

const name = new Name();
 
export const [nameContext, nameProvider, useName] = createMobXContext(name);
