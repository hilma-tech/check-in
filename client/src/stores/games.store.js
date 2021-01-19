import { createMobXContext } from '@hilma/tools'
import { makeObservable, observable, action, runInAction } from 'mobx'
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
            runInAction(() => {
                this.gamesList = this.gamesList.concat(data.gamesInfo)
              this.haveMoreGames = data.haveMoreGames;
              this.successGettingGames = true;
              this.startGetGames = false;
            })
        }catch (error){
            this.successGettingGames = false
            this.startGetGames = false;
        }
    }

    getClassroomGames = async(classId) => {
        try{
            this.startGetGames = true;
            const { data } = await axios.get("/api/classroom/getClassroomGames",{ params:{ classId: classId }});
            runInAction(() => {
                this.gamesList = data.allGames
                this.chosenGameList = data.currClassGames.games
              this.gamesList = this.gamesList.filter((game)=>{
                  let filterArr = this.chosenGameList.filter((chosenGame)=>{
                      return chosenGame.id === game.id
                  })
                  return filterArr.length === 0
              })
              this.successGettingGames = true;
              this.startGetGames = false;
            })
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

    removeGameFromClass = async (index, classId, gameId) => {
        console.log(gameId);
        await axios.post("/api/classroom/removeGameRelation", {gameId: gameId, classId: classId});
        runInAction(() => {
            this.gamesList = [...this.gamesList,this.chosenGameList[index]]
          })
        this.chosenGameList.splice(index,1)
      }

    addGameToClass = async (index, classId) => {
          await axios.post("/api/classroom/addGameRelation", {gameId: this.gamesList[index].id, classId: classId});
      }
}

const games = new Games();

export const [gamesContext, gamesProvider, useGames] = createMobXContext(games);