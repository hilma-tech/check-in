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


  // res:  School { name: 'לחגדכ', city: 'ךצכלכ', id: 42 }
  // info:  {
  //   schoolNameError: { toShow: 'none', mess: '' },
  //   schoolCityError: { toShow: 'none', mess: '' },
  //   schoolName: 'לחגדכ',
  //   schoolCity: 'ךצכלכ',
  //   classes: [
  //     { id: 1, name: "ג'8", classNameError: [Object] },
  //     { id: 2, name: "צ'3", classNameError: [Object] }
  //   ]
  // }
  

  async addClassesWithSchool(@Body() info: any, res:any) {
    let i = 0;
    for (i = 0; i < info.classes.length; i++){
      let classroom = new Classroom();
    classroom.name = info.classes[i].name;
    classroom.school_id = res.id;
    await this.classroomRepository.save(classroom)
    }
    return true;
  }

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

   //if the classroom not exist it's will return undifiend
   async getClassroomInfoByName(classroomName: string, schoolId: number) {
     return await this.classroomRepository.findOne({
      select: ["id", "name"],
      where: [{ name: classroomName, school_id:  schoolId}],
    })
  }

  async isClassroomInSchool(classroomId: number, schoolId: number){
    let classroom = await this.classroomRepository.findOne({
      where: [{ id: classroomId, school_id:  schoolId}],
    })
    return classroom === undefined ? false : true
  }

  async deleteClassroom(classroom_id, student_id){
    let classroomInfo = await this.classroomRepository.findOne({id: classroom_id})
    classroomInfo.students = classroomInfo.students.filter((student)=>{
      return student.id !== student_id
    })    
    return await this.classroomRepository.save(classroomInfo)
  }

  async deleteTeacherClassroom(classroom_id, teacher_id){
    let classroomInfo = await this.classroomRepository.findOne({id: classroom_id})
    classroomInfo.teachers = classroomInfo.teachers.filter((teacher)=>{
      return teacher.id !== teacher_id
    })    
    return await this.classroomRepository.save(classroomInfo)
  }

  async addStudentToClassroom(classroom_id, student){
    let classroomInfo = await this.classroomRepository.findOne({id: classroom_id})
    classroomInfo.students.push(student)    
    return await this.classroomRepository.save(classroomInfo)
  }

  async addTeacherToClassroom(classroom_id, teacher){
    let classroomInfo = await this.classroomRepository.findOne({id: classroom_id})
    classroomInfo.teachers.push(teacher)    
    return await this.classroomRepository.save(classroomInfo)
  }
}
