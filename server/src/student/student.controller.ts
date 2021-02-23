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
import { SchoolService } from 'src/school/school.service';

@Controller('api/student')
export class StudentController {
  constructor(
    private readonly userService: UserService,
    private studentService: StudentService,
    private classroomService: ClassroomService,
    private gameService: GameService,
    private schoolService: SchoolService
  ) {
    // this.register({username: 'student2@gmail.com', password: 'student11', name: 'בת-ציון רוז'})
  }

  @UseJwtAuth('superAdmin')
  @Post('/register')
  async register(@Body() req: UserRegisterDto) {
    this.studentService.addStudent(req);
  }

  @UseJwtAuth('superAdmin')
  @Post('/multiRegister')
  async multiRegister(@Body() req: any) {
    console.log('req: ', req);
    let errorsMsg = []
    for (let i = 0; i < req.length; i++) {
      let schoolId = await this.schoolService.getSchoolIdByName(req[i][4])
      console.log('schoolId: ', schoolId);
      if (schoolId === undefined) {
        errorsMsg.push(`הבית ספר בשורה ${i + 1} לא קיים במערכת. אנא נסה להכניס בית ספר אחר`)
      } else {
        req[i][4] = schoolId.id
      }
    }
    if (errorsMsg.length !== 0) {
      return { success: false, errorsMsg: errorsMsg }
    } else {
      for (let i = 0; i < req.length; i++) {
        this.studentService.addStudent({
          firstName: req[i][0],
          lastName: req[i][1],
          username: req[i][2],
          password: req[i][3],
          schoolId: req[i][4],
          classrooms: []
        })
      }
      return { success: true }
    }
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
