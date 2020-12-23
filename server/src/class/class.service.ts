import { Body, Injectable, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { request } from 'http';
import { Game } from 'src/game/game.entity';
import { getConnection, Repository } from 'typeorm';
import { Classroom } from './class.entity';

export interface SaveOptions {
  data: { id: 6 };
  reload: false;
}

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Classroom)
    private classRepository: Repository<Classroom>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  

  async addGameRelation(@Body() req: any) {
    let ClassGame = new Classroom();
    ClassGame.games = await this.gameRepository.find({ 
      where: { id: req.id } 
    });
    ClassGame.id = 6;
    let currClassGameArr = await this.classRepository.find({
      relations: ['games'],
      where: [{ id: 6 }],
    });
    currClassGameArr[0].games.push(ClassGame.games[0]);
    let newlyAddedGame = await this.classRepository.save(currClassGameArr[0]);
    return { newlyAddedGame: newlyAddedGame };
  }

  async removeGameRelation(@Body() req: any) {
    let ClassModel = new Classroom();
    ClassModel.games = await this.gameRepository.find({
      where: { id: req.id },
    });
    ClassModel.id = 6;
    let ans = await this.classRepository.find({
      relations: ['games'],
      where: [{ id: 6 }],
    });
    ans[0].games.splice(req.id, 1);
    let newRemovedGame = await this.classRepository.save(ans[0]);
    return { newRemovedGame: newRemovedGame };
  }
}
