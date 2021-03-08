import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UserService, Role, UseJwtAuth } from '@hilma/auth-nest';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import {
  GetStudentSkip,
  StudentIdDto,
  GamesForClassDto,
  ClassroomIdDto,
  UserRegisterDto,
  StudentPassword,
} from './student.dtos';
import { ClassroomService } from 'src/classroom/classroom.service';
import { GameModule } from 'src/game/game.module';
import { GameService } from 'src/game/game.service';
import { Classroom } from 'src/classroom/classroom.entity';
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

  @UseJwtAuth('superAdmin')
  @Post('/register')
  async register(@Body() req: UserRegisterDto) {
    try {
      return await this.studentService.addStudent(req);
    } catch (e) {
      return false
    }
  }

  @UseJwtAuth('superAdmin')
  @Post('/multiRegister')
  async multiRegister(@Body() req: any) {
    let ans = []
    let errorsMsg = []
    for (let i = 0; i < req.length; i++) {
      let schoolId = await this.schoolService.getSchoolIdByName(req[i].schoolName)
      if (schoolId === undefined) {
        errorsMsg.push(`הבית ספר בשורה ${i + 1} לא קיים במערכת, אנא נסה להכניס בית ספר אחר`)
      } else {
        req[i].schoolId = schoolId.id
        for (let z = 0; z < req[i].classrooms.length; z++) {
          let classroomInfo = await this.classroomService.getClassroomInfoByName(req[i].classrooms[z], schoolId.id)
          if (classroomInfo === undefined) {
            errorsMsg.push(`הכיתה ${req[i].classrooms[z]} בשורה ${i + 1} לא קיימת במערכת, אנא נסה להכניס כיתה אחרת`)
          } else {
            req[i].classrooms[z] = classroomInfo
          }
        }
      }
      if (await this.studentService.isStudentExist(req[i].username)) {
        errorsMsg.push(`שם המשתמש בשורה ${i + 1} כבר קיים, אנא נסה להכניס שם משתמש אחר`)
      }
    }
    if (errorsMsg.length !== 0) {
      return { success: false, errorsMsg: errorsMsg }
    } else {
      for (let i = 0; i < req.length; i++) {
        let info = await this.studentService.addStudent(req[i])
        ans.push({
          first_name: req[i].firstName,
          last_name: req[i].lastName,
          name: req[i].firstName + " " + req[i].lastName,
          username: req[i].username,
          schoolName: req[i].schoolName,
          id: info.id,
          classes: req[i].classrooms.map((studentClassroom) => {
            return studentClassroom.name
          })
        })
      }
      return { success: true, students: ans }
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

  @Get('/gamesAndStudentInfo')
  async getGamesForClass(@Query() info: GamesForClassDto) {
    let getStudentInfo = await this.studentService.CheckUserInfoAndGetClassId(info.username, info.password);
    if (getStudentInfo != undefined) {
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
    else {
      return 'user does not exist'
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

  @UseJwtAuth('teacher')
  @Post('/changestudentpass')
  async changePass(@Body() newPass: StudentPassword) {
    if (((/[0-9]/).test(newPass.password) && (/[!@#$"%^,.&*()_+=[\]{}'-;:\\|<>/?~`]/).test(newPass.password) && (/[a-zA-Z\u0590-\u05EA]/).test(newPass.password))) {
      return await this.studentService.changeStudentPassword(newPass)
    }
    else {
      return 'password is not according to format'
    }
  }
}
