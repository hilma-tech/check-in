import { Game } from './game.entity';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';


@Controller('api/game')
export class GameController {

    constructor(
        private gameService: GameService)
    {
        // this.gameService.createGame()
        
    }

    @Get("/hello")
    hello(){
        console.log("meoww")
    }

    @Post('/update')
    updateGame(@Body() res: number){
        console.log(res);
        this.gameService.updateGame(res)
    }

    // @Post("/create")
    // createGame(){
    //     this.gameService.createGame()
    // }

    @Get('/getGames')
    getGames(){
        this.gameService.getAllGamesInfo()
    }

}
