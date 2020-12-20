import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import {
    UserService,
    UseLocalAuth,
    RequestUser,
    Role,
  } from '@hilma/auth-nest';
  import {Student} from "./student.entity"

@Controller('api/student')
export class StudentController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/register')
    register(@Body() req) {
    let username = req.username;
    let password = req.password;
    let user: Partial<Student> = new Student({ username, password });
    user.name = req.name
    let userRole = new Role();
    userRole.id = 4; //you just the role id.
    user.roles = [userRole];

    this.userService.createUser<Student>(user);
  }
}
