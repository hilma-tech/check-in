import { createMobXContext } from "@hilma/tools";
import { makeObservable, observable, action, runInAction } from "mobx";
const axios = require("axios").default;

class Games {
  gamesList = [];
  chosenGameList = [];
  haveMoreGames = true;
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
      resetGamesStore: action,
    });
  }

  //sets the store back to it's original state
  resetGamesStore = () => {
    this.gamesList = [];
    this.chosenGameList = [];
    this.haveMoreGames = true;
    this.successGettingGames = true;
    this.startGetGames = false;
  };

  //gets batches of 50 games from DB, as long as they aren't suspended
  getGames = async () => {
    try {
      this.startGetGames = true;
      const { data } = await axios.get("/api/game/getGames", {
        params: { gamesLength: this.gamesList.length },
      });
      runInAction(() => {
        this.gamesList = this.gamesList.concat(data.gamesInfo);
        this.haveMoreGames = data.haveMoreGames;
        this.successGettingGames = true;
        this.startGetGames = false;
      });
    } catch (error) {
      this.successGettingGames = false;
      this.startGetGames = false;
    }
  };

  //gets all the information about games for a specific class,
  //so that the choosable classes come in batches of 50
  getClassroomGames = async (classId) => {
    try {
      this.startGetGames = true;
      const { data } = await axios.get("/api/game/getClassroomGames", {
        params: { classId: classId, dataLength: this.gamesList.length },
      });
      runInAction(() => {
        this.gamesList = this.gamesList.concat(data.allGames);
        this.chosenGameList = data.currClassGames;
        this.haveMoreGames = data.haveMoreGames;
        this.successGettingGames = true;
        this.startGetGames = false;
      });
    } catch (error) {
      this.successGettingGames = false;
      this.startGetGames = false;
    }
  };

  //adds game to array of all the games in the super-admin
  addGame = (newGame) => {
    this.gamesList = [newGame, ...this.gamesList];
  };

  //opens or closes a popup in superadmin game page
  setShowOption = (gameIndex) => {
    this.gamesList[gameIndex].showOption = !this.gamesList[gameIndex]
      .showOption;
  };

  //closes all the popups in superadmin game page
  resetShowOptions = () => {
    for (let i = 0; i < this.gamesList.length; i++) {
      this.gamesList[i].showOption = false;
    }
  };

  //removes relation class-game from the database
  removeGameFromClass = async (index, classId, gameId) => {
    try {
      await axios.post("/api/classroom/removeGameRelation", {
        gameId: gameId,
        classId: classId,
      });
      runInAction(() => {
        this.gamesList = [...this.gamesList, this.chosenGameList[index]];
      });
      this.chosenGameList.splice(index, 1);
    } catch (err) {
      console.log("remove game err: ", err);
    }
  };

  //adds relation class-game to the database
  addGameToClass = async (index, classId, fieldsData) => {
    try {
      await axios.post("/api/classroom/addGameRelation", {
        gameId: this.gamesList[index].id,
        classId: classId,
        fieldsData: fieldsData
      });
    } catch (err) {
      console.log("add game err: ", err);
    }
  };

  //deletes game entirely from DB
  deleteGame = async (Id) => {
    try {
      await axios.post("/api/game/deleteGameById", { Id });
    } catch (err) {
      console.log("delete game err: ", err);
    }
  };
}

const games = new Games();

export const [gamesContext, gamesProvider, useGames] = createMobXContext(games);
