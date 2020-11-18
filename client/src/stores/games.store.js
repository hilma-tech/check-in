import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, computed, action } from 'mobx'

const axios = require("axios").default;

class Games {
    gamesList = []
    haveMoreGames = true
    constructor() {
        makeObservable(this, {
            gamesList: observable,
            haveMoreGames: observable,
            setGames: action,
            resetShowOptions: action,
            setShowOption: action,
        })
    }
    setGames = async () => {
        const { data } = await axios.post("/api/game/getGames", { gamesLength: this.gamesList.length });
        this.gamesList = this.gamesList.concat(data.gamesInfo)
        this.haveMoreGames = data.haveMoreGames
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