import { Game } from './game.entity';
import { Body, Controller, Get, Post, Query, Req, UploadedFiles, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { GameDto } from './game.dto';
import { FieldService } from 'src/field/field.service';
import {
  UseFilesHandler,
  FilesType,
  ImageService,
} from '@hilma/fileshandler-typeorm';
import { UseJwtAuth } from '@hilma/auth-nest';


@Controller('api/game')
export class GameController {
  constructor(private gameService: GameService,
    private fieldService: FieldService,
    private readonly imageService: ImageService) {
  }

  @UseJwtAuth('superAdmin')
  @Post('/save')
  @UseFilesHandler()
  async saveGame(@UploadedFiles() files: FilesType, @Body() req: any) {
    var imgPath = await this.imageService.saveSingleFile(files)
    req.game.image = imgPath;
    let game = await this.gameService.saveGame(req.game);
    await this.fieldService.saveField({ data: req.field, id: game.id })
    return game
  }

  @UseJwtAuth('superAdmin')
  @Post('/getGames')
  getGames(@Body() skipON: any) {
    return this.gameService.getGamesInfo(skipON)
  }
}
