import { UploadedFiles, Body, Injectable, Req } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import {
  GameSaveDto,
  GetGameSkip,
  GameSaveReq,
  GameIdDto,
  ClassroomIdDto,
} from './game.dtos';
import { FieldService } from 'src/field/field.service';
import { FilesType, ImageService } from '@hilma/fileshandler-typeorm';
import { ClassroomFieldService } from 'src/classroom-field/classroom-field.service';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private fieldService: FieldService,
    private classFieldService: ClassroomFieldService,
    private readonly imageService: ImageService,
  ) { }

  async addGame(@UploadedFiles() files: FilesType, @Body() req: GameSaveReq) {
    // if(req.game.image.value){
    //   let imgPath = await this.imageService.save(files, req.game.image.id);
    //   req.game.image.value = imgPath;
    // } else {
    //   req.game.image.value = "https://site.groupe-psa.com/content/uploads/sites/9/2016/12/white-background-2.jpg";
    // }

    req.field.forEach(async (img, index) => {
      if ('image' === img.selection) {
        let imgPath = await this.imageService.save(files, img.value[0].id);
        req.field[index].value[0].value = imgPath;
      }
    });
    let game = await this.saveGame(req.game);
    await this.fieldService.saveField({ data: req.field, id: game.id });
    return game;
  }

  //!IS FOR DANIEL
  async returnGames(skip: number, amount: number) {
    return await this.gameRepository.find({
      relations: ['fields'],
      skip: skip,
      take: amount,
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

  async getGames(@Req() skipON: GetGameSkip) {
    let numGames = await this.gameRepository.count();
    let haveMoreGames =
      numGames > Number(skipON.gamesLength) + 50 ? true : false;
    let gamesInfo = await this.gameRepository.find({
      where: [{ suspended: false }],
      skip: Number(skipON.gamesLength),
      take: 50,
      select: ['id', 'game_name', 'image'],
      order: {
        id: 'DESC',
      },
    });
    return { gamesInfo: gamesInfo, haveMoreGames: haveMoreGames };
  }

  async getGameInfo(gameId: GameIdDto) {
    let temp = await this.gameRepository.find({
      relations: ['fields'],
      where: { id: gameId.id },
    });
    let games: any;
    games = [...temp];
    for (let i = 0; i < games.length; i++) {
      for (let j = 0; j < games[i].fields.length; j++) {
        if (
          games[i].fields[j].type === 'image' ||
          games[i].fields[j].type === 'text'
        ) {
          games[i].fields[j].value = [
            { id: 0, value: games[i].fields[j].default_value },
          ];
        } else {
          games[i].fields[j].value = JSON.parse(
            games[i].fields[j].default_value,
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

  async getAllGames() {
    return await this.gameRepository.find({
      select: ['id', 'game_name', 'image'],
      where: [{ suspended: false }],
    });
  }
  async getGameById(gameId: number) {
    return await this.gameRepository.find({
      where: { id: gameId },
    });
  }

  async deleteGameById(id) {
    await this.classFieldService.deleteClassField(id.Id)
    await this.gameRepository.delete(id.Id);
  }

  async getClassroomGames(req: ClassroomIdDto) {
    let currClassGames = await this.gameRepository
      .createQueryBuilder('Game')
      .innerJoinAndSelect('Game.classrooms', 'Classroom')
      .select('Game.id')
      .addSelect('Game.game_name')
      .addSelect('Game.image')
      .where('Classroom.id = :id', { id: Number(req.classId) })
      .getMany();

    let gamesLength = (
      await this.gameRepository.query(
        'select id from game where id not in(select game_id from classroom_game where classroom_id = ' +
          req.classId +
          ');',
      )
    ).length;

    let haveMoreGames =
      gamesLength > Number(req.dataLength) + 50 ? true : false;

    let allGames = await this.gameRepository.query(
      'select id, game_name, image from game where id not in(select game_id from classroom_game where classroom_id = ' +
        req.classId +
        ')  limit 50 offset ' +
        req.dataLength +
        ';',
    );
    return {
      currClassGames: currClassGames,
      allGames: allGames,
      haveMoreGames: haveMoreGames,
    };
  }
}
