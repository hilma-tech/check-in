import { Body, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { Repository } from 'typeorm';
import { Classroom } from './classroom.entity';


@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async getClassroomGames(req) {
    let currClassGames = await this.classroomRepository.find({
      relations: ['games'],
      where: [{ id: req.classId }],
    });
    return currClassGames[0];
  }

  async getClassStudents(classId) {
    let classroom = await this.classroomRepository.find({
      select: ["id"],
      relations: ['students'],
      where: { id: classId },
    });
    console.log(classroom);
    
    return classroom[0].students;
  }

  async addGameRelation(@Body() req: any) {
    let classroomGame = new Classroom();
    classroomGame.games = await this.gameRepository.find({
      where: { id: req.gameId },
    });
    classroomGame.id = req.classId;
    let currClassGameArr = await this.classroomRepository.find({
      relations: ['games'],
      where: [{ id: req.classId }],
    });

    currClassGameArr[0].games.push(classroomGame.games[0]);
    let newlyAddedGame = await this.classroomRepository.save(
      currClassGameArr[0],
    );
    return { newlyAddedGame: newlyAddedGame };
  }

  async removeGameRelation(@Body() req: any) {
    let classroomModel = new Classroom();
    classroomModel.games = await this.gameRepository.find({
      where: { id: req.gameId },
    });
    classroomModel.id = req.classId;
    let ans = await this.classroomRepository.find({
      relations: ['games'],
      where: [{ id: req.classId }],
    });
    ans[0].games.splice(req.id, 1);
    let newRemovedGame = await this.classroomRepository.save(ans[0]);
    return { newRemovedGame: newRemovedGame };
  }
}
