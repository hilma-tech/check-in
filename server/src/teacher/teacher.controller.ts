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
import { Classroom } from 'src/classroom/classroom.entity';

@Controller('api/teacher')
export class TeacherController {
    constructor(
      private readonly userService: UserService,
      private teacherService: TeacherService
      ) {
        // this.register({username: 'teacher100@gmail.com', password: 'teacher1', name: 'יונה בן ראובן'})
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
    let fullName = req.name.split(' ')
    let user: Partial<Teacher> = new Teacher({ username, password });
    user.first_name = fullName[0]
    user.last_name = fullName[1]
    user.school = 1
    let classroom = new Classroom()
    classroom.id=2
    classroom.name="א'1"
    classroom.school_id=1
    user.classroomTeacher = [classroom]
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
