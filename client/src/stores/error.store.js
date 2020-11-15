import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, computed,  action  } from 'mobx'

class ErrorMsg {
    errorMsg = ""
    showMsg = false
    constructor() {
        makeObservable(this, {
            errorMsg: observable,
            setErrorMsg: action,
            resetMsg: action
        })
    }

    resetMsg = () => {
        this.errorMsg = ''
        this.showMsg = false
    }

    setErrorMsg=(msg)=>{
        this.errorMsg = msg
        this.showMsg = true
    }
}

const errorMsg = new ErrorMsg();
 
export const [errorMsgContext, errorMsgProvider, useErrorMsg] = createMobXContext(errorMsg);