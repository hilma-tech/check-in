import { Injectable } from '@nestjs/common';
import { Repository} from 'typeorm';
import {Game} from './game.entity'
import {InjectRepository} from '@nestjs/typeorm'


@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>){}
    async getAllGamesInfo(){
        let gamesInfo = await this.gameRepository.find()
        console.log(gamesInfo);
    }
}

