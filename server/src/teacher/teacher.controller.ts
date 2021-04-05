import { Body, Controller, Get, Post, Query, Redirect, Res } from '@nestjs/common';
import { UserService, RequestUser, Role, UseJwtAuth, UseLocalAuth } from '@hilma/auth-nest';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';
import { Classroom } from 'src/classroom/classroom.entity';
import { TeacherIdDto, GetTeacherSkip, GetClassSkip, TeacherValDto, TeacherRegisterDto } from './teacher.dtos';
import { ClassroomService } from 'src/classroom/classroom.service';
import { env } from 'process';


@Controller('api/teacher')
export class TeacherController {
  constructor(
    private readonly userService: UserService,
    private teacherService: TeacherService,
    private classroomService: ClassroomService,
  ) {
    // this.register({username: 'teacher2@gmail.com', password: 'teacher1'})
  }

  @UseJwtAuth('teacher')
  @Get('/getTeacherClasses')
  async getTeacherClasses(
    @RequestUser() userinfo,
    @Query() skipOn: GetClassSkip,
  ) {
    return await this.teacherService.getTeacherClasses(userinfo.id, skipOn);
  }

  @UseJwtAuth('superAdmin')
  @Get('/getTeacherInfo')
  getTeacherInfo(@Query() req: TeacherIdDto) {
    return this.teacherService.getTeacherInfo(req);
  }
  @UseLocalAuth()
  @Post('/login')
  login(@RequestUser() userInfo, @Res() res) {
    let body = this.userService.login(userInfo, res);
    res.send(body);
  }
  // @UseJwtAuth('superAdmin')
  // @Post('/addTeacher')
  // addTeacher(@Body() req: any) {
  //   return this.teacherService.addTeacherInfo(req)
  // }

  @UseJwtAuth('superAdmin')
  @Post('/register')
  async register(@Body() req: TeacherRegisterDto) {
    let username = req.email;
    let password = req.password;
    let user: Partial<Teacher> = new Teacher({ username, password });
    user.first_name = req.first_name
    user.last_name = req.last_name
    // [ { id: 0, value: "ה'2", classId: 3 } ]
    if (req.fields_data !== undefined || req.fields_data.length !== 0) {
      user.classroomTeacher = req.fields_data.map((classroom) => {
        if (!this.classroomService.isClassroomInSchool(classroom.classId, req.school_id)) {
          throw new Error()
        }
        let classroomTeacher = new Classroom()
        classroomTeacher.id = classroom.classId
        return classroomTeacher
      })
    }
    user.school = req.school_id
    let userRole = new Role();
    userRole.id = req.rakaz === "true" ? 2 : 3; //you set the role id.
    user.roles = [userRole];
    return await this.userService.createUser<Teacher>(user);

  }

  @UseJwtAuth('superAdmin')
  @Post('/changeteacherpass')
  async changePass(@Body() newPass: any) {
      return await this.teacherService.changeTeacherPassword(newPass)
  }

  // {
//   id: '2de835a7-3dc6-4e5e-a36f-45892dbbf758',
//   username: 'batzy@gmail.com',
//   password: '',
//   firstName: 'בתצי',
//   lastName: 'רוזננננ',
//   classrooms: [
//     { id: 28, name: "א'1", games: [], students: [], teachers: [Array] }
//   ],
//   schoolId: 44
// }

  @UseJwtAuth('superAdmin')
  @Post('/editTeacher')
  async editTeacher(@Body() req: any) {
    console.log('req: ', req);
    try {
      return await this.teacherService.editTeacher(req);
    } catch (e) {
      console.log('e: ', e);
      return false
    }
  }

  @UseJwtAuth('superAdmin')
  @Post('/deleteTeacher')
  async deleteTeacher(@Body() val: any) {
    return await this.teacherService.deleteTeacher(val.teacherId)
  }

  @UseJwtAuth('superAdmin')
  @Get('/getTeachers')
  getTeachers(@Query() skipON: GetTeacherSkip) {
    return this.teacherService.getTeacher(skipON);
  }

  @Get('/Verify')
  async MakeLogInAvailable(@Query() Token: any, @Res() res: any) {
    await this.teacherService.verifyEmailByToken(Token.token)
    var redirectTo = `http://${env.HOST}/initialPage`//to be replaced with real domain
    res.redirect(redirectTo)
  }

  @UseJwtAuth('superAdmin')
  @Get('/searchTeacherSuperadmin')
  async searchTeacher(@Query() val: TeacherValDto) {
    return await this.teacherService.searchInTeacher(val.val)
  }
}
