import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import {
    UserService,
    UseLocalAuth,
    RequestUser,
    Role,
  } from '@hilma/auth-nest';
  import {Teacher} from './teacher.entity'

@Controller('api/teacher')
export class TeacherController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/register')
    register(@Body() req) {
    let username = req.username;
    let password = req.password;
    let user: Partial<Teacher> = new Teacher({ username, password });
    user.name = req.name
    let userRole = new Role();
    userRole.id = 3; //you just the role id.
    user.roles = [userRole];

    this.userService.createUser<Teacher>(user);
  }
}
