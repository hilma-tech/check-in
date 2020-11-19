import { Game } from './game.entity';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { GameDto } from './game.dto';
// import {
//   UseFilesHandler,
//   FilesType,
// } from '@hilma/fileshandler-server';

@Controller('api/game')
export class GameController {
  constructor(private gameService: GameService) {
    // this.gameService.createGame()
    // this.temp()
    // console.log('save');
  }

  @Post('/save')
  saveGame(@Body() req: GameDto) {
    this.gameService.saveGame(req);
  }

  // @Post('/saveImg')
  // @UseFilesHandler()
  // saveImg(@Body() req: FilesType) {
  //   console.log(req);
  //   return { success: true };
  // }

    @Post('/getGames')
    getGames(@Body() skipON: any){
        return this.gameService.getGamesInfo(skipON)
    }

    // @Get('/aaa')
    // temp(){
    //     return this.gameService.saving()
    // }
}
