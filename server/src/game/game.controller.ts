import { Game } from './game.entity';
import { Body, Controller, Get, Post, Query, Req, UploadedFiles } from '@nestjs/common';
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
  async saveGame(@Body() req: any) {
    let id = await this.gameService.saveGame(req.game);
    await this.fieldService.saveField({data: req.field, id: id})
  }

  @Post('/saveImg')
  @UseFilesHandler()
  async saveImg(@UploadedFiles() files: FilesType) {
    let service = await this.imageService.saveSingleFile(files)
    // console.log("req",files);
  }

    @Post('/getGames')
    getGames(@Body() skipON: any){
        return this.gameService.getGamesInfo(skipON)
    }
}
