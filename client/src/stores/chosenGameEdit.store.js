import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'

class ChosenGameEdit {
    gameId = 0
    constructor() {
        makeObservable(this, {
            gameId: observable,
            setgameId: action
        })
    }

    setgameId=(id)=>{
        this.gameId = id
    }
}

const chosenGameEdit = new ChosenGameEdit();
 
export const [chosenGameEditContext, chosenGameEditProvider, useChosenGameEdit] = createMobXContext(chosenGameEdit);