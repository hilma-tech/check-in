import { assignMetadata, Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameDto } from './game.dto';
import { UseJwtAuth } from '@hilma/auth-nest';

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
  
  async saveGame(@Body() req: GameDto) {
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
