import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService, Role, UseJwtAuth } from '@hilma/auth-nest';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import {
  GetStudentSkip,
  StudentIdDto,
  GamesForClassDto,
  ClassroomIdDto,
} from './student.dtos';
import { ClassroomService } from 'src/classroom/classroom.service';
import { GameModule } from 'src/game/game.module';
import { GameService } from 'src/game/game.service';
import { SchoolService } from 'src/school/school.service';
import { FieldService } from 'src/field/field.service';

@Controller('api/student')
export class StudentController {
  constructor(
    private readonly userService: UserService,
    private studentService: StudentService,
    private schoolService: SchoolService,
    private classroomService: ClassroomService,
    private gameService: GameService,
    private fieldService: FieldService
  ) {
    // this.register({username: 'student2@gmail.com', password: 'student11', name: 'בת-ציון רוז'})
  }

  @Post('/register')
  async register(@Body() req) {
    let username = req.username;
    let password = req.password;
    let fullName = req.name.split(' ');
    let student: Partial<Student> = new Student({ username, password });
    student.first_name = fullName[0];
    student.last_name = fullName[1];
    // let classroom = new Classroom()
    // classroom.id = 2
    // classroom.name = "א'1"
    // classroom.school_id = 1
    // student.classroomStudent = [classroom]
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

  @Get('/gamesAndStudentInfo')
  async getGamesForClass(@Query() info: GamesForClassDto) {
    let getStudentInfo = await this.studentService.CheckUserInfoAndGetClassId(info.username, info.password);
    var Classes = []
    return Promise.all(getStudentInfo.classroomStudent.map(async (classroom) => {
      Classes.push(classroom.name);
      var getGames = await this.gameService.GetGamesForStudent(classroom.id);
      return getGames
    })).then(async (getGames) => {

      let schoolName = await this.schoolService.getSchoolNameById(getStudentInfo.classroomStudent[0].school_id);
     
      let StudentInfo = {
        first_name: getStudentInfo.first_name,
        last_name: getStudentInfo.last_name,
        classes: Classes,
        school: schoolName.name,
        games: getGames
      }
      return StudentInfo
    })
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
