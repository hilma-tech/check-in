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


@Controller('api/game')
export class GameController {
  constructor(private gameService: GameService,
    private fieldService: FieldService,
    private readonly imageService: ImageService) {
  }

  @Post('/save')
  @UseFilesHandler()
  async saveGame(@UploadedFiles() files: FilesType, @Body() req: any) {
    var imgPath = await this.imageService.saveSingleFile(files)
    req.game.photo = imgPath;
    let game = await this.gameService.saveGame(req.game);
    await this.fieldService.saveField({ data: req.field, id: game.id })
    return game
  }

  // @Put('/api/game/saveImg')
  // @UseFilesHandler()
  // async saveImg(@UploadedFiles() files: FilesType, @Body() req: any) {
  // }

  @Post('/getGames')
  getGames(@Body() skipON: any) {
    return this.gameService.getGamesInfo(skipON)
  }

  // @Get('/aaa')
  // temp(){
  //     return this.gameService.saving()
  // }
}
