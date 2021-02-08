import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'

class ErrorMsg {
    errorMsg = ""
    showMsg = false
    question = false
    approve = false
    approveFunction=()=>{}
    
    constructor() {
        makeObservable(this, {
            errorMsg: observable,
            question: observable,
            approve: observable,
            setErrorMsg: action,
            resetMsg: action,
            disapproveClick: action,
            approveClick: action,
            setQuestion: action,
            approveFunction: observable
        })
    }


    resetMsg = () => {
        this.errorMsg = ''
        this.showMsg = false
    }
    
    disapproveClick = () => {
        this.approve = false
    }
    
    approveClick = () => {
        this.approve = true
    }
    
    setErrorMsg=(msg)=>{
        this.errorMsg = msg
        this.question = false
        this.showMsg = true
    }

    setQuestion = (msg, func) => {
        this.errorMsg = msg
        this.showMsg = true
        this.question = true
        this.approveFunction = func
    }

}

const errorMsg = new ErrorMsg();
 
export const [errorMsgContext, errorMsgProvider, useErrorMsg] = createMobXContext(errorMsg);