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
            deleteGame: action,
            resetGamesStore: action
        })
    }

    resetGamesStore = () => {
        this.gamesList = []
        this.chosenGameList = []
        this.haveMoreGames = true
        this.successGettingGames = true;
        this.startGetGames = false;
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
            const { data } = await axios.get("/api/game/getClassroomGames",{ params:{ classId: classId, dataLength: (this.gamesList.length) }});
            runInAction(() => {
                this.gamesList = this.gamesList.concat(data.allGames)
                this.chosenGameList = data.currClassGames
                this.haveMoreGames = data.haveMoreGames
            //   this.gamesList = this.gamesList.filter((game)=>{
            //       let filterArr = this.chosenGameList.filter((chosenGame)=>{
            //           return chosenGame.id === game.id
            //       })
            //       return filterArr.length === 0
            //   })
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
        try{    
            await axios.post("/api/classroom/removeGameRelation", {gameId: gameId, classId: classId});
        runInAction(() => {
            this.gamesList = [...this.gamesList,this.chosenGameList[index]]
          })
        this.chosenGameList.splice(index,1)
        } catch(err){
            console.log('remove game err: ', err);
        }
      }

    addGameToClass = async (index, classId) => {
        try{    
            await axios.post("/api/classroom/addGameRelation", {gameId: this.gamesList[index].id, classId: classId});
        } catch(err){
            console.log('add game err: ', err);
        }
      }

      deleteGame = async (Id) => {
        try{    
            await axios.post("/api/game/deleteGameById", {Id});
        } catch(err){
            console.log('delete game err: ', err);
        }
      }
}

const games = new Games();

export const [gamesContext, gamesProvider, useGames] = createMobXContext(games); 