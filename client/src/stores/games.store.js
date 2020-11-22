import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, computed, action } from 'mobx'
import { errorMsgContext } from "./error.store";
import { withContext } from '@hilma/tools';
import { observer } from "mobx-react"
const axios = require("axios").default;

class Games {
    gamesList = []
    haveMoreGames = true
    successGettingGames = false;
    constructor() {
        makeObservable(this, {
            successGettingGames: observable,
            gamesList: observable,
            haveMoreGames: observable,
            setGames: action,
            resetShowOptions: action,
            setShowOption: action,
        })
    }
    setGames = async () => {
        try{
            const { data } = await axios.post("/api/game/getGames", { gamesLength: this.gamesList.length });
            this.gamesList = this.gamesList.concat(data.gamesInfo)
            this.haveMoreGames = data.haveMoreGames;
            this.successGettingGames = true
        }catch (error){
            this.successGettingGames = false
        }
    }

    setShowOption = (gameIndex) => {
        this.gamesList[gameIndex].showOption = !this.gamesList[gameIndex].showOption;
    }

    resetShowOptions = () => {
        for (let i = 0; i < this.gamesList.length; i++) {
            this.gamesList[i].showOption = false
        }
    }
}

const games = new Games();

export const [gamesContext, gamesProvider, useGames] = createMobXContext(games);