import { UploadedFiles, Body, Injectable, Req } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import {
  GameSaveDto,
  GetGameSkip,
  GameSaveReq,
  ClassroomIdDto,
  IdeDto,
  DeleteGameIdDto,
} from './game.dtos';
import { FieldService } from 'src/field/field.service';
import { FilesType, ImageService } from '@hilma/fileshandler-typeorm';
import { ClassroomFieldService } from 'src/classroom-field/classroom-field.service';
import { getCGFDto } from 'src/classroom-field/classroom-field.dtos';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private fieldService: FieldService,
    private classroomFieldService: ClassroomFieldService,
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
    game.video_link = req.gameLink;
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

  async getShowGameInfo(data: getCGFDto) {

    let temp = await this.gameRepository.find({
      relations: ['fields'],
      where: { id: data.game_id },
    });
    let classGameFields = await this.classroomFieldService.getClassroomGameFields(data);
    if (classGameFields.length !== 0) {
      temp[0].fields = temp[0].fields.map(
        (field, index) => {
          field.default_value = classGameFields[index].newValue
          return field;
        }
      )
    }

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

  async getGameInfo(gameId: IdeDto) {
    let temp = await this.gameRepository.find({
      where: [{id: Number(gameId.id)}],
      relations: ["fields"],
    })

    let games: any;
    games = [...temp];
    for (let i = 0; i < games.length; i++) {
      for (let j = 0; j < games[i].fields.length; j++) {
        temp[0].fields.sort((a,b)=>{return a.order - b.order})
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

  async deleteGameById(id: DeleteGameIdDto) {
    await this.classroomFieldService.deleteClassField(id.Id)
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

  async GetGamesForStudent(classId, className) {
    let GamesByClassId = await this.gameRepository
      .createQueryBuilder('Game')
      .innerJoinAndSelect('Game.classrooms', 'Classroom')
      .select('Game.id')
      .addSelect('Game.game_name')
      .addSelect('Game.image')
      .where('Classroom.id = :id', { id: Number(classId) })
      .getMany();
    return Promise.all(GamesByClassId.map(async (game) => {
      var fields = await this.classroomFieldService.checkFieldAltValue(game.id, classId)
      return { ...game, fields: fields }
    })).then((games) => {
      return { classId: classId, className: className, classGames: games }
    })
  }

 async searchGames (val){
    let gamesInfo = await this.gameRepository.find({
      where: [{ suspended: false }],
      select: ['id', 'game_name', 'image'],
      order: {
        id: 'DESC',
      },
    });

    let Search = gamesInfo.map((game) => {
      if (game.game_name.includes(val.val.toLowerCase())) {
        return game
      }
    })
    var searchresult = Search.filter(function (game) {
      return game != null;
    });
    return searchresult
  }
}
