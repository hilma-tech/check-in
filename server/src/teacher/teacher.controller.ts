import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
  UserService,
  UseLocalAuth,
  RequestUser,
  Role,
  UseJwtAuth,
} from '@hilma/auth-nest';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';

@Controller('api/teacher')
export class TeacherController {
    constructor(
      private readonly userService: UserService,
      private teacherService: TeacherService
      ) {
        // this.register({username: 'teacher1@gmail.com', password: 'teacher1', name: 'שירה גולשטיין'})
    }



  @UseJwtAuth(`$everyone`)
  @Get('/getTeacherClasses')
  async getTeacherClasses(@RequestUser() userinfo) {

    return await this.teacherService.getTeacherClasses(userinfo.id);
  }

  @Post('/register')
  register(@Body() req) {
    let username = req.username;
    let password = req.password;
    let user: Partial<Teacher> = new Teacher({ username, password });
    user.name = req.name
    user.school = 1
    let userRole = new Role();
    userRole.id = 3; //you just the role id.
    user.roles = [userRole];
    this.userService.createUser<Teacher>(user);
  }

  @Get('/getTeachers')
  getStudents(@Req() skipON: any){
    return this.teacherService.getTeacher(skipON.query)
  }
}
