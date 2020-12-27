import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, computed, action } from 'mobx'
import { errorMsgContext } from "./error.store";
import { withContext } from '@hilma/tools';
import { observer } from "mobx-react"
const axios = require("axios").default;

class Games {
    gamesList = []
    chosenGameList = []
    haveMoreGames = true
    successGettingGames = true;
    startGetGames = false;
    constructor() {
        makeObservable(this, {
            successGettingGames: observable,
            chosenGameList: observable,
            gamesList: observable,
            haveMoreGames: observable,
            startGetGames: observable,
            setGames: action,
            resetShowOptions: action,
            setShowOption: action,
            removeGameFromClass: action,
            addGameToClass: action,
        })
    }

    setGames = async () => {
        try{
            this.startGetGames = true;
            const { data } = await axios.get("/api/game/getGames",{ params:{ gamesLength: this.gamesList.length }});
            this.gamesList = this.gamesList.concat(data.gamesInfo)
            this.haveMoreGames = data.haveMoreGames;
            this.successGettingGames = true;
            this.startGetGames = false;
        }catch (error){
            this.successGettingGames = false
            this.startGetGames = false;
        }
    }

    addGame = (newGame) => {
        this.gamesList = [newGame, ...this.gamesList]
    }

    setShowOption = (gameIndex) => {
        this.gamesList[gameIndex].showOption = !this.gamesList[gameIndex].showOption;
    }

    resetShowOptions = () => {
        for (let i = 0; i < this.gamesList.length; i++) {
            this.gamesList[i].showOption = false
        }
    }

    removeGameFromClass = async (index) => {
        await axios.post("/api/classroom/removeGameRelation", {id: this.chosenGameList[index].id});
        this.gamesList = [...this.gamesList,this.chosenGameList[index]]
        this.chosenGameList.splice(index,1)
      }

      addGameToClass = async (index) => {
          await axios.post("/api/classroom/addGameRelation", {id: this.gamesList[index].id});
          this.chosenGameList = [...this.chosenGameList,this.gamesList[index]]
          this.gamesList.splice(index,1)
      }
}

const games = new Games();

export const [gamesContext, gamesProvider, useGames] = createMobXContext(games);