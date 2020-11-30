import { assignMetadata, Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { UseJwtAuth } from '@hilma/auth-nest';
import { GameSaveDto, GetGameSkip } from './game.dtos';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async returnGames(skip, amount) {
  return await this.gameRepository.find({ relations: ["fields"] ,
  skip: skip,
  take: amount});
  }
  
  async saveGame(@Body() req: GameSaveDto) {
    let game = new Game();
    game.game_name = req.game_name;
    game.description = req.description;
    game.requirements = req.requirements;
    game.image = req.image.value;
    game.suspended = false;
    let res = await this.gameRepository.save(game);
    return res;
  }

  
  async getGamesInfo(@Body() skipON: GetGameSkip) {
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
