import { assignMetadata, Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { UseJwtAuth } from '@hilma/auth-nest';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) { }

  async returnGames(skip, amount) {
    let temp = (await this.gameRepository.find({
      relations: ["fields"],
      skip: skip,
      take: amount
    }))
    let games: any
    games = [...temp]
    for (let fieldI = 0; fieldI < games.length; fieldI++) {
      for (let fieldF = 0; fieldF < games[fieldI].fields.length; fieldF++) {
        if (games[fieldI].fields[fieldF].type === 'image' || games[fieldI].fields[fieldF].type === 'text') {
          games[fieldI].fields[fieldF].value = [{ id: 0, value: games[fieldI].fields[fieldF].default_value }]
        }
        else {
          games[fieldI].fields[fieldF].value = (JSON.parse(games[fieldI].fields[fieldF].default_value).map((value, index) => {
            return { id: index, value: value }
          }))
        }
      }
    }
    return games
  }

  async saveGame(@Body() req: Game) {
    let game = new Game();
    game.game_name = req.game_name;
    game.description = req.description;
    game.requirements = req.requirements;
    game.image = req.image;
    game.suspended = false;
    let res = await this.gameRepository.save(game);
    return res;
  }


  async getGamesInfo(@Body() skipON: any) {
    let numGames = await this.gameRepository.count();
    let haveMoreGames = numGames > skipON.gamesLength + 50 ? true : false;
    let gamesInfo = await this.gameRepository.find({
      where: [{ suspended: false }],
      skip: skipON.gamesLength,
      take: 50,
    });
    return { gamesInfo: gamesInfo, haveMoreGames: haveMoreGames };
  }
}
