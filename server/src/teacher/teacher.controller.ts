import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import {
    UserService,
    UseLocalAuth,
    RequestUser,
    Role,
  } from '@hilma/auth-nest';
  import {Teacher} from './teacher.entity'
import { TeacherService } from './teacher.service';

@Controller('api/teacher')
export class TeacherController {
    constructor(
      private readonly userService: UserService,
      private teacherService: TeacherService
      ) {
        // this.register({username: 'teacher4@gmail.com', password: 'teacher1', name: 'חגית פינגלין'})
    }

    @Post('/register')
    register(@Body() req) {
    let username = req.username;
    let password = req.password;
    let user: Partial<Teacher> = new Teacher({ username, password });
    user.name = req.name
    user.School = 3
    let userRole = new Role();
    userRole.id = 2; //you just the role id.
    user.roles = [userRole];
    this.userService.createUser<Teacher>(user);
  }

  @Get('/getTeachers')
  getStudents(){
    return this.teacherService.getTeacher()
  }
}
