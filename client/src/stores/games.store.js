import {
  FilesUploader
} from "@hilma/fileshandler-client";
import {
  createMobXContext
} from "@hilma/tools";
import {
  makeObservable,
  observable,
  action,
  runInAction
} from "mobx";
const axios = require("axios").default;

class Games {
  datatype = '';
  gamesList = [];
  chosenGameList = [];
  haveMoreGames = true;
  successGettingGames = true;
  startGetGames = false;
  searchedGames = [];
  imageUploader = new FilesUploader();
  constructor() {
    makeObservable(this, {
      imageUploader: observable,
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
      searchGames: action,
      searchGamesReplace: action,
      searchedGames: observable,
      whatData: action,
      datatype: observable,
      editGame: action
    });
  }

  //sets the store back to it's original state
  resetGamesStore = () => {
    this.gamesList = [];
    this.chosenGameList = [];
    this.haveMoreGames = true;
    this.successGettingGames = true;
    this.startGetGames = false;
    this.datatype = '';
    this.searchedGames = [];
    this.imageUploader = new FilesUploader();
  };

  //gets batches of 50 games from DB, as long as they aren't suspended
  getGames = async () => {
    try {
      this.startGetGames = true;
      const {
        data
      } = await axios.get("/api/game/getGames", {
        params: {
          gamesLength: this.gamesList.length
        },
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
      const {
        data
      } = await axios.get("/api/game/getClassroomGames", {
        params: {
          classId: classId,
          dataLength: this.gamesList.length
        },
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
  setShowOption = (gameIndex, list) => {
    if (list === 'searched') {
      this.searchedGames[gameIndex].showOption = !this.searchedGames[gameIndex]
        .showOption;
    } else {
      this.gamesList[gameIndex].showOption = !this.gamesList[gameIndex]
        .showOption;
    }

  };

  //closes all the popups in superadmin game page
  resetShowOptions = (list) => {
    if (list === 'searched') {
      for (let i = 0; i < this.searchedGames.length; i++) {
        this.searchedGames[i].showOption = false;
      }
    } else {
      for (let i = 0; i < this.gamesList.length; i++) {
        this.gamesList[i].showOption = false;
      }
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
      return true
    } catch (err) {
      return false
    }
  };

  //adds relation class-game to the database
  addGameToClass = async (index, classId, fieldsData) => {
    try {
      await this.imageUploader.post("/api/classroom/addGameRelation", JSON.stringify({
        gameId: this.gamesList[index].id,
        classId: classId,
        fieldsData: fieldsData
      }));
      return true
    } catch (err) {
      return false
    }
  };

  whatData = (datatype) => {
    this.datatype = datatype
  }

  //deletes game entirely from DB
  deleteGame = async (Id) => {
    try {
      await axios.post("/api/game/deleteGameById", {
        Id
      });
      return true
    } catch (err) {
      return false
    }
  };

  searchGames = async (val) => {
    try {
      let Games = await axios.get(`/api/game/searchGames/?val=${val}`);
      if (Games.data[0] != null) {
        this.searchedGames = [...Games.data]
      }
    } catch (err) {
      console.log("search game err:", err);
    }
  }

  searchGamesReplace = () => {
    this.searchedGames.replace([])
  }

  editGame = (newInfo) => {
    this.gamesList = this.gamesList.map((game) => {
      if (newInfo.id !== game.id) {
        return game;
      }
      return newInfo
    })
  }

}

const games = new Games();

export const [gamesContext, gamesProvider, useGames] = createMobXContext(games);