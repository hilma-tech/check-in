import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { GameService } from './game.service';
import {
  GameSaveReq,
  GameIdDto,
  GetGameSkip,
  GetGameDto,
  ClassroomIdDto,
  showGameDto,
  IdeDto,
  DeleteGameIdDto,
  GameEditReq,
} from './game.dtos';
import { UseFilesHandler, FilesType } from '@hilma/fileshandler-typeorm';
import { UseJwtAuth } from '@hilma/auth-nest';
import { ValDto } from 'src/student/student.dtos';
import { UserExist } from 'src/user-exist/user-exist.decorator';
const { mustValid } = require('../serverTools/ServerValid');

@Controller('api/game')
export class GameController {
  constructor(
    private gameService: GameService,
  ) {}

  //! IS FOR DANIEL
  @Get('/gameToFields')
  async getGameFields(@Req() req: GetGameDto) {
    return await this.gameService.returnGames(req.skipON, req.numOfGames);
  }

  @UserExist()
  @UseJwtAuth('superAdmin', 'teacher')
  @Get('/getGameInfo')
  async getGameInfo(@Query() ide: IdeDto) {
    return await this.gameService.getGameInfo(ide);
  }

  @UserExist()
  @UseJwtAuth('teacher')
  @Get('/getShowGameInfo')
  async getShowGameInfo(@Query() data: showGameDto) {
    return await this.gameService.getShowGameInfo(data);
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Post('/addGame')
  @UseFilesHandler(100)
  async saveGame(@UploadedFiles() files: FilesType, @Body() req: GameSaveReq) {
    let emptyField = 0;
    req.field.map(eachField => {
      if (eachField.selection !== 'image') {
        eachField.value.map(singularInp => {
          let val = singularInp.value;
          if (mustValid(val).length !== 0) {
            if (eachField.selection === 'text') {
              throw new Error();
            } else {
              emptyField++;
            }
          }
        });
      }
      if (emptyField > 4) {
        throw new Error();
      }
      emptyField = 0;
    });

    return await this.gameService.addGame(files, req);
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Post('/editGame')
  @UseFilesHandler(100)
  async updateGame(@UploadedFiles() files: FilesType, @Body() req: GameEditReq) {
    let emptyField = 0;
    req.field.map(eachField => {
      if (eachField.selection !== 'image') {
        eachField.value.map(singularInp => {
          let val = singularInp.value;
          if (mustValid(val).length !== 0) {
            if (eachField.selection === 'text') {
              throw new Error();
            } else {
              emptyField++;
            }
          }
        });
      }
      if (emptyField > 4) {
        throw new Error();
      }
      emptyField = 0;
    });

    return await this.gameService.editGame(files, req);
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Get('/getGames')
  getGames(@Query() skipON: GetGameSkip) {
    return this.gameService.getGames(skipON);
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Post('/deleteGameById')
  deleteGame(@Body() req: DeleteGameIdDto) {
    return this.gameService.deleteGameById(req);
  }

  @UserExist()
  @UseJwtAuth('teacher')
  @Get('/getClassroomGames')
  async getClassroomGames(@Query() req: ClassroomIdDto) {
    return await this.gameService.getClassroomGames(req);
  }
  @UserExist()
  @UseJwtAuth('superAdmin')
  @Get('/SearchGames')
  async SearchGames(@Query() val: ValDto) {
    return await this.gameService.searchGames(val);

  }
}
