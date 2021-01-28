import { Body, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { GameService } from 'src/game/game.service';
import { Repository } from 'typeorm';
import { Classroom } from './classroom.entity';


@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
    private gameService: GameService
  ) {}

  async getClassroomGames(req) {
    let allGames = await this.gameService.getAllGames()
    let currClassGames = await this.classroomRepository.findOne({
      relations: ['games'],
      where: [{ id: req.classId }],
    });
    return ({currClassGames: currClassGames, allGames: allGames});
  }

  async getClassStudents(classId) {
    let classroom = await this.classroomRepository.find({
      select: ["id"],
      relations: ['students'],
      where: { id: classId },
    });    
    return classroom[0].students;
  }

  async addGameRelation(@Body() req: any) {
    let classroomGame = new Classroom();
    classroomGame.games = await this.gameService.getGameById(req.gameId)
    classroomGame.id = req.classId;
    let currClassGameArr = await this.classroomRepository.findOne({
      relations: ['games'],
      where: [{ id: req.classId }],
    });

    currClassGameArr.games.push(classroomGame.games[0]);
    let newlyAddedGame = await this.classroomRepository.save(
      currClassGameArr,
    );
    return { newlyAddedGame: newlyAddedGame };
  }

  async removeGameRelation(@Body() req: any) {    
    let ans = await this.classroomRepository.findOne({
      relations: ['games'],
      where: [{ id: req.classId }],
    });
    ans.games = ans.games.filter((game)=>{
      return (game.id !== req.gameId)
    });
    let newRemovedGame = await this.classroomRepository.save(ans);
    return { newRemovedGame: newRemovedGame };
  }

  async getSchoolClasses(schoolId: number){
    let classes = await this.classroomRepository.find({
      relations: ['teachers'],
      where: { school_id: schoolId },
    });
    return classes
  }
}
