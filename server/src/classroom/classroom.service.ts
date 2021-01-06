import { Body, Injectable, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { request } from 'http';
import { Game } from 'src/game/game.entity';
import { getConnection, Repository } from 'typeorm';
import { Classroom } from './classroom.entity';

export interface SaveOptions {
  data: { id: 6 };
  reload: false;
}

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  

  async addGameRelation(@Body() req: any) {
    let classroomGame = new Classroom();
    classroomGame.games = await this.gameRepository.find({ 
      where: { id: req.id } 
    });
    classroomGame.id = 6;
    let currClassGameArr = await this.classroomRepository.find({
      relations: ['games'],
      where: [{ id: 1 }],
    });
    console.log(currClassGameArr);
    
    currClassGameArr[0].games.push(classroomGame.games[0]);
    let newlyAddedGame = await this.classroomRepository.save(currClassGameArr[0]);
    return { newlyAddedGame: newlyAddedGame };
  }

  async removeGameRelation(@Body() req: any) {
    let classroomModel = new Classroom();
    classroomModel.games = await this.gameRepository.find({
      where: { id: req.id },
    });
    classroomModel.id = 6;
    let ans = await this.classroomRepository.find({
      relations: ['games'],
      where: [{ id: 1 }],
    });
    ans[0].games.splice(req.id, 1);
    let newRemovedGame = await this.classroomRepository.save(ans[0]);
    return { newRemovedGame: newRemovedGame };
  }
}
