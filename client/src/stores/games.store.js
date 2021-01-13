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
            getGames: action,
            resetShowOptions: action,
            setShowOption: action,
            removeGameFromClass: action,
            addGameToClass: action,
            getClassroomGames: action,
        })
    }

    getGames = async () => {
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

    getClassroomGames = async(classId) => {
        try{
            this.startGetGames = true;
            const { data } = await axios.get("/api/classroom/getClassroomGames",{ params:{ classId: classId }});
            this.chosenGameList = data.games
            this.gamesList = this.gamesList.filter((game)=>{
                let filterArr = this.chosenGameList.filter((chosenGame)=>{
                    return chosenGame.id === game.id
                })
                return filterArr.length === 0
            })
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

    removeGameFromClass = async (index, classId) => {
        await axios.post("/api/classroom/removeGameRelation", {gameId: this.chosenGameList[index].id, classId: classId});
        this.gamesList = [...this.gamesList,this.chosenGameList[index]]
        this.chosenGameList.splice(index,1)
      }

    addGameToClass = async (index, classId) => {
          await axios.post("/api/classroom/addGameRelation", {gameId: this.gamesList[index].id, classId: classId});
        //   this.chosenGameList = [...this.chosenGameList,this.gamesList[index]]
        //   this.gamesList.splice(index,1)
        //   console.log('gamesList: ', this.gamesList);
      }
}

const games = new Games();

export const [gamesContext, gamesProvider, useGames] = createMobXContext(games);