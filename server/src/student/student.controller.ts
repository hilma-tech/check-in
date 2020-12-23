import { Body, Controller, Get, Post, Res } from '@nestjs/common';
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

@Controller('api/student')
export class StudentController {
    constructor(
      private readonly userService: UserService,
      private studentService: StudentService
      ) {
      // this.register({username: 'student10@gmail.com', password: 'student11', name: 'רות תשובה'})
    }

    @Post('/register')
    async register(@Body() req) {
    let username = req.username;
    let password = req.password;
    let student: Partial<Student> = new Student({ username, password });
    student.name = req.name
    student.School= 1
    let userRole = new Role();
    userRole.id = 4; //you just the role id.
    student.roles = [userRole];
    this.userService.createUser<Student>(student);
  }


  @Get('/getStudents')
  getStudents(){
    return this.studentService.getStudents()
  }
}
