import {
  createMobXContext
} from "@hilma/tools";
import {
  makeObservable,
  observable,
  action
} from "mobx";

class ErrorMsg {
  errorMsg = "";
  showMsg = false;
  question = false;
  approveFunction = () => {};
  constructor() {
    makeObservable(this, {
      errorMsg: observable,
      question: observable,
      approveFunction: observable,
      setErrorMsg: action,
      resetMsg: action,
      setQuestion: action,
    });
  }

  //closes a popup and resets current error msg
  resetMsg = () => {
    this.errorMsg = "";
    this.showMsg = false;
    this.question = false;
    this.approveFunction = () => {};
  };

  //activates the popup, its an error message
  setErrorMsg = (msg) => {
    this.errorMsg = msg;
    this.question = false;
    this.showMsg = true;
  };

  //activates the popup, its an error question - can be approved or denied
  setQuestion = (msg, func) => {
    this.errorMsg = msg;
    this.showMsg = true;
    this.question = true;
    this.approveFunction = func;
  };
}

const errorMsg = new ErrorMsg();

export const [
  errorMsgContext,
  errorMsgProvider,
  useErrorMsg,
] = createMobXContext(errorMsg);