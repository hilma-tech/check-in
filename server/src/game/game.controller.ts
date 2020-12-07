import { Game } from './game.entity';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFiles,
  Put,
  Param
} from '@nestjs/common';
import { GameService } from './game.service';
import {GameSaveReq, GetGameSkip} from './game.dtos'
import { FieldService } from 'src/field/field.service';
import {
  UseFilesHandler,
  FilesType,
  ImageService,
} from '@hilma/fileshandler-typeorm';
import { Field } from '../field/field.entity';
import { UseJwtAuth } from '@hilma/auth-nest';
import {createConnection, getConnection} from "typeorm";


@Controller('api/game')
export class GameController {
  constructor(
    private gameService: GameService,
    private fieldService: FieldService,
    private readonly imageService: ImageService,
  ) {}

  @Get('/gameToFields')
  async getGameFields() {
    return await this.gameService.returnGames(0, 50)
  }

  @Get('/gameGameInfo')
  async getGameInfo(@Req() ide) {
    return await this.gameService.getGameInfo(ide.query)
  }

  @UseJwtAuth('superAdmin')
  @Post('/addGame')
  @UseFilesHandler()
  async saveGame(@UploadedFiles() files: FilesType, @Body() req: GameSaveReq) {
    return await this.gameService.addGame(files,req)
  }

  @UseJwtAuth('superAdmin')
  @Get('/getGames')
  getGames(@Req() skipON:any) {
    return this.gameService.getGamesInfo(skipON.query);
  }
}
