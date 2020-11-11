import { Controller, Get, Query, Post } from '@nestjs/common';
import { Game } from './game.entity';
import { GameService } from './game.service';

@Controller('api/game')
export class GameController {
    constructor(private gameService: GameService){
    }
    // @Get("/hello")
    // hello(){
    //     console.log("meoww")
    // }
    // async findAll(@Query('game') game: string) {
    //     console.log(game);
        
    //     return this.findAll
    // }
    @Get('/games')
    getGames(){
        this.gameService.getAllGamesInfo()
    }
}
