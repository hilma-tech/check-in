import { Inject, Injectable } from '@nestjs/common';
import { Repository, getRepository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { Game } from './game.entity';

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
}
