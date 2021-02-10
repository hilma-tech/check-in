import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import {
  UserService,
  Role,
  UseJwtAuth,
} from '@hilma/auth-nest';
import { Student } from "./student.entity"
import { StudentService } from './student.service';
import { Classroom } from 'src/classroom/classroom.entity';
import { SuperAdmin } from 'src/super-admin/super-admin.entity';
import { GetStudentSkip, StudentIdDto, GamesForClassDto, ClassroomIdDto } from './student.dtos';
import { ClassroomService } from 'src/classroom/classroom.service';
import { GameModule } from 'src/game/game.module';
import { GameService } from 'src/game/game.service';

@Controller('api/student')
export class StudentController {
  constructor(
    private readonly userService: UserService,
    private studentService: StudentService,
    private classroomService: ClassroomService,
    private gameService: GameService
  ) {
    // this.register({username: 'student1@gmail.com', password: 'student11', name: 'בת ציון רוז'})
  }

  @Post('/register')
  async register(@Body() req) {
    let username = req.username;
    let password = req.password;
    let fullName = req.name.split(' ')
    let student: Partial<Student> = new Student({ username, password });
    student.first_name = fullName[0]
    student.last_name = fullName[1]
    let classroom = new Classroom()
    classroom.id = 2
    classroom.name = "א'1"
    classroom.school_id = 1
    student.classroomStudent = [classroom]
    let userRole = new Role();
    userRole.id = 4; //you just the role id.
    student.roles = [userRole];
    this.userService.createUser<Student>(student);
  }

  @UseJwtAuth('teacher', 'superAdmin')
  @Get('/getStudents')
  getStudents(@Query() skipON: GetStudentSkip) {
    return this.studentService.getStudents(skipON)
  }

  @UseJwtAuth('teacher')
  @Get('/getStudentsClassrooms')
  getStudentsClassrooms(@Query() req: StudentIdDto) {
    return this.studentService.getStudentsClassrooms(req.id)
  }

  @Get('/gamesForClass')
  async getGamesForClass(@Query() info: GamesForClassDto) {
    let getClassId = await this.studentService.CheckUserInfoAndGetClassId(info.username, info.password, info.classId);
    if (getClassId) {
      let gamesForClass = await this.gameService.getClassroomGames({ classId: info.classId, dataLength: '0' });
      if (gamesForClass.currClassGames.length > 0) {
        return gamesForClass.currClassGames
      }
      else { return "no games for this class" }
    }
    else {
      return "problem with info inserted"
    }
  }


  @UseJwtAuth('teacher')
  @Get('/getClassStudents')
  async getClassStudents(@Query() data: ClassroomIdDto) {
    return await this.studentService.getClassStudents(data.classId, Number(data.dataLength))
  }

}
