import { UploadedFiles, Body, Injectable, Req, Inject, forwardRef } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import {
  GameSaveDto,
  GetGameSkip,
  GameSaveReq,
  ClassroomIdDto,
  IdeDto,
  DeleteGameIdDto,
  GameEditReq,
} from './game.dtos';
import { FilesType, ImageService } from '@hilma/fileshandler-typeorm';
import { ClassroomFieldService } from 'src/classroom-field/classroom-field.service';
import { getCGFDto } from 'src/classroom-field/classroom-field.dtos';
import { FieldService } from 'src/field/field.service';
import { ValDto } from 'src/student/student.dtos';
import { TeacherService } from 'src/teacher/teacher.service';
const { GetInfoLength, MaxFields } = require('../serverTools/GlobalVarbs');

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private fieldService: FieldService,
    private classroomFieldService: ClassroomFieldService,
    private readonly imageService: ImageService,
    @Inject(forwardRef(() => TeacherService))
    private readonly teacherService: TeacherService
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

  async editGame(@UploadedFiles() files: FilesType, @Body() req: GameEditReq) {
    let gameInfo = await this.gameRepository
      .createQueryBuilder('Game')
      .innerJoinAndSelect('Game.classrooms', 'Classroom')
      .select('Classroom.id')
      .addSelect('Game.game_name')
      .where('Game.id = :id', { id: Number(req.game.id) })
      .getOne();
    let res = await this.gameRepository.update({id: req.game.id},req.game);
    await this.classroomFieldService.editGameDeleteClassField(req.game.id, req.deletedField)
    for (let i = 0; i < req.field.length; i++) {
      let isExist = -1
      for (let z = 0; z < req.existField.length; z++) {
        if (req.existField[z].id === req.field[i].id) {
          isExist = z
        }
      }
      let data = {
        name: req.field[i].name,
        selection: req.field[i].selection,
        value: req.field[i].value,
        order: req.field[i].order,
      }
      if (isExist !== -1) {
        //update ALL the fields
        this.fieldService.editFieldName(req.field[i].id, req.field[i].name)
        if (req.field[i].selection !== req.existField[isExist].selection) {
          if (req.field[i].selection === "image") {
            //save the new image
            let imgPath = await this.imageService.save(files, req.field[i].value[0].id);
            req.field[i].value[0].value = imgPath;
          }
          await this.classroomFieldService.editGameDeleteClassField(req.game.id, [req.field[i].id])
          let savedFiield = await this.fieldService.saveOneField({ data: data, id: req.game.id });
          if (gameInfo !== undefined) {
            for (let a = 0; a < gameInfo.classrooms.length; a++) {
              this.classroomFieldService.editGameAddFieldsToClass({
                classId: gameInfo.classrooms[a].id,
                field: savedFiield,
                gameId: req.game.id
              })
            }
          }
        } else {
          if (req.field[i].selection === "image" && req.field[i].value[0].value !== req.existField[isExist].value[0].value) {// !== req.existField[isExist].value[0].value) {
            //delete exist img
            this.imageService.delete(req.existField[isExist].value[0].value)
            //save the new image
            let imgPath = await this.imageService.save(files, req.field[i].value[0].id);
            req.field[i].value[0].value = imgPath;
          }
          if (req.field[i].selection === "choice" || req.field[i].selection === "multi-choice") {
            let emptExistFields = 0
            let emptFields = 0
            for (let z = 0; z < MaxFields; z++) {
              if (req.existField[isExist].value[z] !== undefined && req.existField[isExist].value[z].value.length === 0) {
                emptExistFields++
              }
              if (req.field[i].value[z] !== undefined && req.field[i].value[z].value.length === 0) {
                emptFields++
              }
            }
            if (emptExistFields !== emptFields) {
              await this.classroomFieldService.editGameDeleteClassField(req.game.id, [req.field[i].id])
              let savedFiield = await this.fieldService.saveOneField({ data: data, id: req.game.id });
              if (gameInfo !== undefined) {
                for (let a = 0; a < gameInfo.classrooms.length; a++) {
                  this.classroomFieldService.editGameAddFieldsToClass({
                    classId: gameInfo.classrooms[a].id,
                    field: savedFiield,
                    gameId: req.game.id
                  })
                }
              }
            }
          }
          this.fieldService.editFieldValue(req.field[i])
        }
      } else {
        if (req.field[i].selection === "image") {
          //save the new image
          let imgPath = await this.imageService.save(files, req.field[i].value[0].id);
          req.field[i].value[0].value = imgPath;
        }
        let savedFiield = await this.fieldService.saveOneField({ data: data, id: req.game.id });
        if (gameInfo !== undefined) {
          for (let a = 0; a < gameInfo.classrooms.length; a++) {
            this.classroomFieldService.editGameAddFieldsToClass({
              classId: gameInfo.classrooms[a].id,
              field: savedFiield,
              gameId: req.game.id
            })
          }
        }
      }
    }
    if(gameInfo !== undefined){
      this.teacherService.getTeacherByClassId(gameInfo.classrooms, req.game)
    }
    return res;
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
      numGames > Number(skipON.gamesLength) + GetInfoLength ? true : false;
    let gamesInfo = await this.gameRepository.find({
      where: [{ suspended: false }],
      skip: Number(skipON.gamesLength),
      take: GetInfoLength,
      select: ['id', 'game_name', 'image'],
      order: {
        id: 'DESC',
      },
    });
    return { gamesInfo: gamesInfo, haveMoreGames: haveMoreGames };
  }

  // [
  //   Game {
  //     id: 34,
  //     game_name: 'image text choice',
  //     description: null,
  //     requirements: null,
  //     video_link: null,
  //     image: 'https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',
  //     suspended: <Buffer 00>,
  //     fields: [ [Field], [Field], [Field] ]
  //   }
  // ]

  async getShowGameInfo(data: getCGFDto) {
    let temp = await this.gameRepository.find({
      relations: ['fields'],
      where: { id: data.game_id },
    });
    if (data.datatype === 'new') {
      let GameFields = await this.classroomFieldService.getClassroomGameFields(
        data,
      );
      let formattedGameFields = [];
      for (let i = 0; i < GameFields.length; i++) {
        if (
          GameFields[i].field_id.type === 'image' ||
          GameFields[i].field_id.type === 'text'
        ) {
          formattedGameFields[i] = {
            id: GameFields[i].id,
            value: [{ id: 0, value: GameFields[i].newValue }],
            order: GameFields[i].field_id.order,
            selection: GameFields[i].field_id.type,
            field_name: GameFields[i].field_id.field_name,
          };
        } else {
          formattedGameFields[i] = {
            id: GameFields[i].id,
            order: GameFields[i].field_id.order,
            selection: GameFields[i].field_id.type,
            field_name: GameFields[i].field_id.field_name,
          };
          formattedGameFields[i].value = JSON.parse(GameFields[i].newValue).map(
            (value, index) => {
              return { id: index, value: value };
            },
          );
        }
      }
      let formattedInfo = {
        fields: formattedGameFields,
        game_name: temp[0].game_name,
        gameDescription: temp[0].description,
        gameRequirements: temp[0].requirements,
        image: temp[0].image,
        gameLink: temp[0].video_link
      };
      return formattedInfo;
    } else if (data.datatype === 'old') {
      let temp = await this.gameRepository.find({
        relations: ['fields'],
        where: { id: data.game_id },
      });

      let formattedGameFields = [];
      for (let i = 0; i < temp[0].fields.length; i++) {
        if (
          temp[0].fields[i].type === 'image' ||
          temp[0].fields[i].type === 'text'
        ) {
          formattedGameFields[i] = {
            id: temp[0].fields[i].id,
            value: [{ id: 0, value: temp[0].fields[i].default_value }],
            order: temp[0].fields[i].order,
            selection: temp[0].fields[i].type,
            field_name: temp[0].fields[i].field_name,
          };
        } else {
          formattedGameFields[i] = {
            id: temp[0].fields[i].id,
            order: temp[0].fields[i].order,
            selection: temp[0].fields[i].type,
            field_name: temp[0].fields[i].field_name,
          };
          formattedGameFields[i].value = JSON.parse(
            temp[0].fields[i].default_value,
          ).map((value, index) => {
            return { id: index, value: value };
          });
        }
      }
      let formattedInfo = {
        fields: formattedGameFields,
        game_name: temp[0].game_name,
        gameDescription: temp[0].description,
        gameRequirements: temp[0].requirements,
        image: temp[0].image,
        gameLink: temp[0].video_link
      };
      return formattedInfo;
    } else {
      return false;
    }
  }

  async getGameInfo(gameId: IdeDto) {
    let temp = await this.gameRepository.find({
      where: [{ id: Number(gameId.id) }],
      relations: ['fields'],
    });

    let games: any;
    games = [...temp];
    for (let i = 0; i < games.length; i++) {
      for (let j = 0; j < games[i].fields.length; j++) {
        temp[0].fields.sort((a, b) => {
          return a.order - b.order;
        });
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
    let gameInfo = await this.gameRepository
      .createQueryBuilder('Game')
      .innerJoinAndSelect('Game.classrooms', 'Classroom')
      .select('Classroom.id')
      .addSelect('Game.game_name')
      .where('Game.id = :id', { id: Number(id.Id) })
      .getOne();
    if (gameInfo !== undefined) {
      for (let i = 0; i < gameInfo.classrooms.length; i++) {
        await this.classroomFieldService.removeGameFieldsFromClass({ gameId: id.Id, classId: gameInfo.classrooms[i].id })
      }
    }
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
    return Promise.all(
      GamesByClassId.map(async game => {
        var fields = await this.classroomFieldService.checkFieldAltValue(
          game.id,
          classId,
        );
        return { ...game, fields: fields };
      }),
    ).then(games => {
      return { classId: classId, className: className, classGames: games };
    });
  }

  async searchGames(val: ValDto) {
    let searchresult = await this.gameRepository.find({
      where: [{ game_name: Like("%" + val.val.toLowerCase() + "%") }]
    });
    return searchresult
  }
}
