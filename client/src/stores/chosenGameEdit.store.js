import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action  } from 'mobx'

class ChosenGameEdit {
    gameId = 0
    index = 0
    constructor() {
        makeObservable(this, {
            gameId: observable,
            setgameId: action,
            index : observable,
        })
    }

    setgameId=(id, index)=>{
        this.gameId = id
        this.index = index
    }
}

const chosenGameEdit = new ChosenGameEdit();
 
export const [chosenGameEditContext, chosenGameEditProvider, useChosenGameEdit] = createMobXContext(chosenGameEdit);