import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { GameService } from './game.service';
import { GameSaveReq } from './game.dtos';
import {
  UseFilesHandler,
  FilesType,
} from '@hilma/fileshandler-typeorm';
import { UseJwtAuth } from '@hilma/auth-nest';
const {mustValid} = require("../serverTools/ServerValid")

@Controller('api/game')
export class GameController {
  constructor(
    private gameService: GameService
    ) {}

  @Get('/gameToFields')
  async getGameFields(@Req() req: any) {
    return await this.gameService.returnGames(req.skipON, req.munOfGames);
  }

  @UseJwtAuth('superAdmin')
  @Get('/getGameInfo')
  async getGameInfo(@Req() ide) {
    return await this.gameService.getGameInfo(ide.query);
  }

  @UseJwtAuth('superAdmin')
  @Post('/addGame')
  @UseFilesHandler()
  async saveGame(@UploadedFiles() files: FilesType, @Body() req: GameSaveReq) {
    console.log('hgffff');

    req.field.map(eachField => {
      if (eachField.selection !== 'image') {
        eachField.value.map(singularInp => {
          let val = singularInp.value;
          console.log('GFD', mustValid(val));
          if (mustValid(val).length !== 0) {
            throw new Error();
          }
        });
      }
    });
    // todo map the field array
    // if(selection = 'image') {
    //   console.log('hi');
    // } else {
    //   test that its only hebrew and max 255 chars
    // }
    return await this.gameService.addGame(files, req);
  }

  @UseJwtAuth('superAdmin', 'teacher')
  @Get('/getGames')
  getGames(@Req() skipON: any) {
    return this.gameService.getGames(skipON.query);
  }
}
