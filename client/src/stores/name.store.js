import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, computed,  action  } from 'mobx'

class Name {
    name = ""
    constructor() {
        makeObservable(this, {
            name: observable,
            setName: action
        })
    }

    setName=(name)=>{
        this.name = name
    }
}

const name = new Name();
 
export const [nameContext, nameProvider, useName] = createMobXContext(name);
