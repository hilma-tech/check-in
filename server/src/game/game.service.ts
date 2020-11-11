import { Injectable } from '@nestjs/common';
import { Repository} from 'typeorm';
import {Game} from './game.entity'
import {InjectRepository} from '@nestjs/typeorm'


@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

//   async createGame() {
//       let game = new Game
//       game.game_name= "clouds"
//       game.description="catch all the clouds"
//       game.photo="http://wiki.com"
//       game.requirements="you must catch the clouds soon"
//       game.suspended=false
//     let res = await this.gameRepository.save(game);
//     console.log('res: ', res);
//   }

  async updateGame(req) {
      let game = new Game
      game.game_name= "clouds"
      game.description="catch all the clouds"
      game.photo="http://wiki.com"
      game.requirements="you must catch the clouds soon"
      game.suspended=false
    let res = await this.gameRepository.save(game);
  }

  async getGamesInfo(){
    let game = new Game
    game.suspended = false
    let gamesInfo = await this.gameRepository.find(game)
    console.log(gamesInfo);
    return gamesInfo;
}
}
