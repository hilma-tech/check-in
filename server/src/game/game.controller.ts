import { Game } from './game.entity';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { GameDto } from './game.dto';
import {
  UseFilesHandler,
  FilesType,
} from '@hilma/fileshandler-server';

@Controller('api/game')
export class GameController {
  constructor(private gameService: GameService) {
    // this.gameService.createGame()
  }

  @Post('/save')
  saveGame(@Body() req: GameDto) {
    console.log(req);
    this.gameService.saveGame(req);
  }

  // @Post('/saveImg')
  // @UseFilesHandler()
  // saveImg(@Body() req: FilesType) {
  //   console.log(req);
  //   return { success: true };
  // }

    @Get('/getGames')
    getGames(){
        return this.gameService.getGamesInfo()
    }

}