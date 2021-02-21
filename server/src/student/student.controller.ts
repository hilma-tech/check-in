import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService, Role, UseJwtAuth } from '@hilma/auth-nest';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import {
  GetStudentSkip,
  StudentIdDto,
  GamesForClassDto,
  ClassroomIdDto,
  UserRegisterDto,
} from './student.dtos';
import { ClassroomService } from 'src/classroom/classroom.service';
import { GameModule } from 'src/game/game.module';
import { GameService } from 'src/game/game.service';
import { Classroom } from 'src/classroom/classroom.entity';

@Controller('api/student')
export class StudentController {
  constructor(
    private readonly userService: UserService,
    private studentService: StudentService,
    private classroomService: ClassroomService,
    private gameService: GameService
  ) {
    // this.register({username: 'student2@gmail.com', password: 'student11', name: 'בת-ציון רוז'})
  }

  @UseJwtAuth('superAdmin')
  @Post('/register')
  async register(@Body() req:UserRegisterDto) {
    console.log('req: ', req);
    let username = req.username;
    let password = req.password;
    let student: Partial<Student> = new Student({ username, password });
    student.first_name = req.firstName;
    student.last_name = req.lastName;
    
    if(req.classrooms !== undefined || req.classrooms.length !== 0){
      student.classroomStudent = req.classrooms.map((classroom)=>{
        console.log('classroom: ', classroom);
        let studentClassroom = new Classroom()
        studentClassroom.id = classroom.id
        studentClassroom.name = classroom.name
        studentClassroom.school_id = req.schoolId
        return studentClassroom
      })
    }

    student.school = req.schoolId
    console.log('student.classroomStudent: ', student.classroomStudent);
    let userRole = new Role();
    userRole.id = 4; //you set the role id.
    student.roles = [userRole];
    this.userService.createUser<Student>(student);
  }

  @UseJwtAuth('teacher', 'superAdmin')
  @Get('/getStudents')
  getStudents(@Query() skipON: GetStudentSkip) {
    return this.studentService.getStudents(skipON);
  }

  @UseJwtAuth('teacher')
  @Get('/getStudentsClassrooms')
  getStudentsClassrooms(@Query() req: StudentIdDto) {
    return this.studentService.getStudentsClassrooms(req.id);
  }

  @Get('/gamesForClass')
  async getGamesForClass(@Query() info: GamesForClassDto) {
    let getClassId = await this.studentService.CheckUserInfoAndGetClassId(info.username, info.password, info.classId);
    if (Boolean(getClassId) === true) {
      let gamesForClass = await this.gameService.getClassroomGames({ classId: info.classId, dataLength: '0' });
      if (gamesForClass.currClassGames.length > 0) {
        return gamesForClass.currClassGames
      }
      else { return "no games for this class" }
    }
    else {
      return 'problem with info'
    }
  }

  @UseJwtAuth('teacher')
  @Get('/getClassStudents')
  async getClassStudents(@Query() data: ClassroomIdDto) {
    return await this.studentService.getClassStudents(
      data.classId,
      Number(data.dataLength),
    );
  }
}
