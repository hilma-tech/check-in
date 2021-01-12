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
import { Classroom } from 'src/classroom/classroom.entity';

@Controller('api/student')
export class StudentController {
    constructor(
      private readonly userService: UserService,
      private studentService: StudentService
      ) {
      // this.register({username: 'student1@gmail.com', password: 'student11', name: 'בת ציון רוז'})
    }

    @Post('/register')
    async register(@Body() req) {
    let username = req.username;
    let password = req.password;
    let fullName = req.name.split(' ')
    let student: Partial<Student> = new Student({ username, password });
    student.first_name = fullName[0]
    student.last_name = fullName[1]
    let classroom = new Classroom()
    classroom.id=2
    classroom.name="א'1"
    classroom.school_id=1
    student.classroomStudent = [classroom]
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
