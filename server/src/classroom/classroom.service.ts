import { Body, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameService } from 'src/game/game.service';
import {ClassFieldService} from 'src/class-field/class-field.service'
import { Repository } from 'typeorm';
import { ClassroomIdDto, ClassroomGameDto } from './classroom.dtos';
import { Classroom } from './classroom.entity';


@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
    private gameService: GameService,
    protected classfieldService: ClassFieldService
  ) {}

  async getClassroomGames(req: ClassroomIdDto) {
    let allGames = await this.gameService.getAllGames()
    let currClassGames = await this.classroomRepository.findOne({
      relations: ['games'],
      where: [{ id: Number(req.classId) }],
    });
    //      select: ["id", "game_name", "image"],
    // currClassGames.games = currClassGames.games.map((game)=>{
    //   return {id: game.id, }
    // })
    let classGames = currClassGames.games.map((game)=>{
      return {id: game.id, game_name: game.game_name, image: game.image}
    })
    return ({currClassGames: classGames, allGames: allGames});
  }

  async getClassStudents(classId: string) {
    let classroom = await this.classroomRepository.find({
      select: ["id"],
      relations: ['students'],
      where: { id: Number(classId) },
    });    
    let students = classroom[0].students.map((student)=>{
      return {id: student.id, username: student.username, first_name: student.first_name, last_name: student.last_name}
    })
    return students;
  }

  async addGameRelation(@Body() req: ClassroomGameDto) {
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
    // await this.clasfieldService.addGameFieldsToClass(req)
    return { newlyAddedGame: newlyAddedGame };
  }

  async removeGameRelation(@Body() req: ClassroomGameDto) {    
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

  async getSchoolClasses(schoolId: string){
    let classes = await this.classroomRepository.find({
      relations: ['teachers'],
      where: { school_id: Number(schoolId) },
    });
    return classes
  }
}
