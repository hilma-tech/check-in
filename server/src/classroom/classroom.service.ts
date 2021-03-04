import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameService } from 'src/game/game.service';
import { ClassroomFieldService } from 'src/classroom-field/classroom-field.service';
import { Repository } from 'typeorm';
import { ClassroomGameDto, RemoveClassroomGameDto } from './classroom.dtos';
import { Classroom } from './classroom.entity';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
    private gameService: GameService,
    protected classroomfieldService: ClassroomFieldService,
  ) {}

  async addGameRelation(@Body() req: ClassroomGameDto) {
    let classroomGame = new Classroom();
    classroomGame.games = await this.gameService.getGameById(req.gameId);
    classroomGame.id = req.classId;
    let currClassGameArr = await this.classroomRepository.findOne({
      relations: ['games'],
      where: [{ id: req.classId }],
    });
    currClassGameArr.games.push(classroomGame.games[0]);
    let newlyAddedGame = await this.classroomRepository.save(currClassGameArr);
    return { newlyAddedGame: newlyAddedGame };
  }

  async removeGameRelation(@Body() req: RemoveClassroomGameDto) {
    let ans = await this.classroomRepository.findOne({
      relations: ['games'],
      where: [{ id: req.classId }],
    });
    ans.games = ans.games.filter(game => {
      return game.id !== req.gameId;
    });
    let newRemovedGame = await this.classroomRepository.save(ans);
    return { newRemovedGame: newRemovedGame };
  }
  async getSchoolClasses(schoolId: string) {
    let classes = await this.classroomRepository.find({
      relations: ['teachers'],
      where: { school_id: Number(schoolId) },
    });
    return classes;
  }

}
