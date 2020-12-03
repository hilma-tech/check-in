import { assignMetadata, Body, Injectable, Param, Req } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "./game.entity";
import { UseJwtAuth } from "@hilma/auth-nest";
import { GameSaveDto, GetGameSkip } from "./game.dtos";

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>
  ) {}

  async returnGames(skip, amount) {
    return await this.gameRepository.find({
      relations: ["fields"],
      skip: skip,
      take: amount
    });
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

  async getGamesInfo(@Req() skipON: GetGameSkip) {
    let numGames = await this.gameRepository.count();
    let haveMoreGames = numGames > skipON.gamesLength + 50 ? true : false;
    let gamesInfo = await this.gameRepository.find({
      where: [{ suspended: false }],
      skip: skipON.gamesLength,
      take: 50,
      select: ["id", "game_name", "image"]
    });
    return { gamesInfo: gamesInfo, haveMoreGames: haveMoreGames };
  }

  async getGameInfo(gameId) {
    let temp = await this.gameRepository.find({
      relations: ["fields"],
      where: { id: gameId.id }
    });
    let games: any;
    games = [...temp];
    for (let i = 0; i < games.length; i++) {
      for (let j = 0; j < games[i].fields.length; j++) {
        if (
          games[i].fields[j].type === "image" ||
          games[i].fields[j].type === "text"
        ) {
          games[i].fields[j].value = [
            { id: 0, value: games[i].fields[j].default_value }
          ];
        } else {
          games[i].fields[j].value = JSON.parse(
            games[i].fields[j].default_value
          ).map((value, index) => {
            return { id: index, value: value };
          });
        }
        games[i].fields[j].name = games[i].fields[j].field_name;
        games[i].fields[j].selection = games[i].fields[j].type;
      }
    }

    return games[0];
  }
}
