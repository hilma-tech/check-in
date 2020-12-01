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
    
    if(req.game.image.value){
      let imgPath = await this.imageService.save(files, req.game.image.id);
      req.game.image.value = imgPath;
    } else {
      req.game.image.value = "/image/4ChRJFZXXPjV7vhxCfCuftu6UobT4cnk.jpg";
    }

    req.field.forEach(async (img, index) => {
      if ('image' === img.selection) {
        let imgPath = await this.imageService.save(files, img.value[0].id);
        req.field[index].value[0].value = imgPath;
      }
    });
    let game = await this.gameService.saveGame(req.game);
    console.log(req.field);
    
    await this.fieldService.saveField({ data: req.field, id: game.id });
    return game;
  }

  @UseJwtAuth('superAdmin')
  @Get('/getGames')
  getGames(@Req() skipON:any) {
    return this.gameService.getGamesInfo(skipON.query);
  }
}
