import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
    UserService,
    UseLocalAuth,
    RequestUser,
    Role,
  } from '@hilma/auth-nest';
  import {Student} from "./student.entity"
import { StudentService } from './student.service';
import { School } from 'src/school/school.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetStudentSkip } from './student.dtos';

@Controller('api/student')
export class StudentController {
    constructor(
      private readonly userService: UserService,
      private studentService: StudentService
      ) {
      // this.register({username: 'student101@gmail.com', password: 'student11', name: 'פז גלבולגבגבצקי'})
    }

    @Post('/register')
    async register(@Body() req) {
    let username = req.username;
    let password = req.password;
    let student: Partial<Student> = new Student({ username, password });
    student.name = req.name
    student.school= 1
    let userRole = new Role();
    userRole.id = 4; //you just the role id.
    student.roles = [userRole];
    this.userService.createUser<Student>(student);
  }


  @Get('/getStudents')
  getStudents(@Req() skipON: any){
    return this.studentService.getStudents(skipON.query)
  }
}
