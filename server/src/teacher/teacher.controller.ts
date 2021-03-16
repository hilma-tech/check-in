import { Body, Controller, Get, Post, Query, Redirect, Res } from '@nestjs/common';
import { UserService, RequestUser, Role, UseJwtAuth } from '@hilma/auth-nest';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';
import { Classroom } from 'src/classroom/classroom.entity';
import { TeacherIdDto, GetTeacherSkip, GetClassSkip, TeacherValDto, TeacherRegisterDto } from './teacher.dtos';


@Controller('api/teacher')
export class TeacherController {
  constructor(
    private readonly userService: UserService,
    private teacherService: TeacherService,
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
    console.log('req.fields_data: ', req.fields_data);
    if (req.fields_data !== undefined || req.fields_data.length !== 0) {
      user.classroomTeacher = req.fields_data.map((classroom) => {
        console.log('classroom: ', classroom);
        let classroomTeacher = new Classroom()
        classroomTeacher.id = classroom.classId
        return classroomTeacher
      })
    }
    user.school = req.school_id
    let userRole = new Role();
    userRole.id = req.rakaz === "true" ? 2 : 3; //you set the role id.
    user.roles = [userRole];
    let createUser = await this.userService.createUser<Teacher>(user);
    this.verifyEmail({ email: username, password: password })
    return createUser
  }

  @UseJwtAuth('superAdmin')
  @Get('/getTeachers')
  getTeachers(@Query() skipON: GetTeacherSkip) {
    return this.teacherService.getTeacher(skipON);
  }

  @Post('/SendEmail')
  async verifyEmail(@Query() VerifyInfo: any) {
    let token = await this.teacherService.createAndSaveToken(VerifyInfo.email, VerifyInfo.password)
    await this.teacherService.sendVerificationEmail(VerifyInfo.email, token)
  }
  @Get('/Verify')
  async MakeLogInAvailable(@Query() Token: any, @Res() res: any) {
    await this.teacherService.IsVerified(Token.token)
    var redirectTo = 'http://localhost:3000/signin'//to be replaced with read domain
    res.redirect(redirectTo)
  }

  @Get('/searchTeacherSuperadmin')
  async searchTeacher(@Query() val: TeacherValDto) {
    console.log('val: ', val);
  return await this.teacherService.searchInTeacher(val.val) 
  }
}
