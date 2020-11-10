import { Controller, Get, Query } from '@nestjs/common';
import { log } from 'console';
import { Game } from './game.entity';
import { GameService } from './game.service';

@Controller('api/game')
export class GameController {
    @Get("/hello")
    hello(){
        console.log("meoww")
    }
    async findAll(@Query('game') game: string) {
        console.log(game);
        
        return this.findAll
    }

}
