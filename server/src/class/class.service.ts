import { Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { getConnection, Repository } from 'typeorm';
import { Classs } from './class.entity';

export interface SaveOptions {
  data: {id: 6},
  reload: false;
}

@Injectable()
export class ClassService {
        constructor(
          @InjectRepository(Classs)
          private classRepository: Repository<Classs>,
          @InjectRepository(Game)
          private gameRepository: Repository<Game>
        ) {}


    async addGameRelation(@Body() req:any) {
      let newGame = new Classs();
      newGame.games = await this.gameRepository.find({where: {id: req.id}});
      newGame.id = 6;
      let ans = await this.classRepository.find({
        relations: ['games'],
        where: [{id: 6}]
      })
      ans[0].games.push(newGame.games[0])
      let newAddedGame = await this.classRepository.save(ans[0])
      return { newAddedGame: newAddedGame};
    }
}
