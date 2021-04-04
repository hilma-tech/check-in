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
} from './game.dtos';
import { UseFilesHandler, FilesType } from '@hilma/fileshandler-typeorm';
import { UseJwtAuth } from '@hilma/auth-nest';
import { FieldService } from 'src/field/field.service';
const { mustValid } = require('../serverTools/ServerValid');

@Controller('api/game')
export class GameController {
  constructor(
    private gameService: GameService,
    private fieldService: FieldService,
  ) {}

  //! IS FOR DANIEL
  @Get('/gameToFields')
  async getGameFields(@Req() req: GetGameDto) {
    return await this.gameService.returnGames(req.skipON, req.numOfGames);
  }

  @UseJwtAuth('superAdmin', 'teacher')
  @Get('/getGameInfo')
  async getGameInfo(@Query() ide: IdeDto) {
    return await this.gameService.getGameInfo(ide);
  }

  @UseJwtAuth('teacher')
  @Get('/getShowGameInfo')
  async getShowGameInfo(@Query() data: showGameDto) {
    return await this.gameService.getShowGameInfo(data);
  }

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

  @UseJwtAuth('superAdmin')
  @Get('/getGames')
  getGames(@Query() skipON: GetGameSkip) {
    return this.gameService.getGames(skipON);
  }

  @UseJwtAuth('superAdmin')
  @Post('/deleteGameById')
  deleteGame(@Body() req: DeleteGameIdDto) {
    return this.gameService.deleteGameById(req);
  }

  @UseJwtAuth('teacher')
  @Get('/getClassroomGames')
  async getClassroomGames(@Query() req: ClassroomIdDto) {
    return await this.gameService.getClassroomGames(req);
  }

}
