import { createMobXContext } from "@hilma/tools";
import { makeObservable, observable, action } from "mobx";
  
class FadeMsg {
    fadeMsg = "";
    showMsg = false;
    closeFunc = () => {};
    constructor() {
      makeObservable(this, {
        fadeMsg: observable,
        showMsg: observable,
        closeFunc: observable,
        setFadeMsg: action,
        resetMsg: action,
      });
    }

    setFadeMsg = (msg) => {
        this.fadeMsg = msg
        this.showMsg = true
        this.closeFunc = setTimeout(this.resetMsg, 2500);
    }

    resetMsg = () => {
        this.fadeMsg = "";
        this.showMsg = false;
        clearTimeout(this.closeFunc)
    }
}
  
const fadeMsg = new FadeMsg();
  
export const [ fadeMsgContext, fadeMsgProvider, useFadeMsg] = createMobXContext(fadeMsg);