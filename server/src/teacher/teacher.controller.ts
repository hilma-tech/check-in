import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';
import {
  UserService,
  RequestUser,
  Role,
  UseJwtAuth,
  UseLocalAuth,
} from '@hilma/auth-nest';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';
import { Classroom } from 'src/classroom/classroom.entity';
import {
  TeacherIdDto,
  GetTeacherSkip,
  GetClassSkip,
  TeacherValDto,
  TeacherRegisterDto,
  EmailDto,
  PassAndTokenDto,
  EditTeacherDto,
  StringDto,
} from './teacher.dtos';
import { ClassroomService } from 'src/classroom/classroom.service';
import { env } from 'process';
import { UserExist } from 'src/user-exist/user-exist.decorator';

@Controller('api/teacher')
export class TeacherController {
  constructor(
    private readonly userService: UserService,
    private teacherService: TeacherService, // private classroomService: ClassroomService,
  ) {
    // this.register({username: 'teacher2@gmail.com', password: 'teacher1'})
  }

  @UserExist()
  @UseJwtAuth('teacher')
  @Get('/getTeacherClasses')
  async getTeacherClasses(
    @RequestUser() userinfo,
    @Query() skipOn: GetClassSkip,
  ) {
    return await this.teacherService.getTeacherClasses(userinfo.id, skipOn);
  }

  @UserExist()
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
  // @UserExist
  //()@UseJwtAuth('superAdmin')
  // @Post('/addTeacher')
  // addTeacher(@Body() req: any) {
  //   return this.teacherService.addTeacherInfo(req)
  // }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Post('/register')
  async register(@Body() req: TeacherRegisterDto) {
    return await this.teacherService.addTeacher(req);
  }

  // @UserExist()@UseJwtAuth('superAdmin')
  // @Post('/changeteacherpass')
  // async changePass(@Body() newPass: any) {
  //   return await this.teacherService.changeTeacherPassword(newPass.username);
  // }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Post('/editTeacher')
  async editTeacher(@Body() req: EditTeacherDto) {
    try {
      if (req.password.length !== 0) {
        await this.teacherService.changeTeacherPassword(
          req.username,
          req.password,
        );
      }
      return await this.teacherService.editTeacher(req);
    } catch (e) {
      return false;
    }
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Post('/deleteTeacher')
  async deleteTeacher(@Body() val: TeacherIdDto) {
    return await this.teacherService.deleteTeacher(val.teacherId);
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Get('/getTeachers')
  getTeachers(@Query() skipON: GetTeacherSkip) {
    return this.teacherService.getTeacher(skipON);
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Post('/isTeacherExist')
  isTeacherExist(@Body() username: EmailDto) {
    return this.teacherService.isTeacherExist(username.email);
  }

  @Get('/Verify')
  async MakeLogInAvailable(@Query() Token: StringDto, @Res() res: any) {
    await this.teacherService.verifyEmailByToken(Token.token);
    var redirectTo = `${env.HOST}/initialPage`;
    res.redirect(redirectTo);
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Get('/searchTeacherSuperadmin')
  async searchTeacher(@Query() val: TeacherValDto) {
    return await this.teacherService.searchInTeacher(val.val);
  }

  @Post('/sendNewPassEmail')
  async sendNewPassEmail(@Body() email: EmailDto) {
    let validation = await this.teacherService.checkIfEmailIsValidTeacher(
      email.email,
    );
    if (validation.validateEmail === true) {
      if(validation.verifiedEmail){
        await this.teacherService.sendChangePasswordEmail(email.email);
        return {validateEmail: true, verifiedEmail: true};
      }
      return {validateEmail: true, verifiedEmail: false};
    } else {
      return {validateEmail: false};
    }
  }

  @Get('/changePassword')
  async changePassword(@Query() Token: StringDto, @Res() res: any) {
    var redirectTo = `${env.HOST}/changePass/${Token.token}`;
    res.redirect(redirectTo);
  }

  @Post('/SaveNewPassword')
  async SaveNewPassword(@Body() Info: PassAndTokenDto) {
    let email = await this.teacherService.findEmailByToken(Info.token);
    await this.teacherService.changePasswordWithToken(
      Info.token,
      email,
      Info.password,
    );
  }
}
