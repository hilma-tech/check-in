import { UserService, RequestUser, Role, UseJwtAuth } from '@hilma/auth-nest';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuperAdmin } from './super-admin.entity';

@Controller('api/super-admin')
export class SuperAdminController {
  constructor(private readonly userService: UserService) {
    // this.register({username: 'shirush@gmail.com', password: 'shiraa123'})
  }

  @UseJwtAuth('teacher', 'superAdmin')
  @Get('/getUserType')
  getUserType(@RequestUser() userInfo) {
    return userInfo.type;
  }

  @Post('/register')
  register(@Body() req) {
    let username = req.username;
    let password = req.password;
    let user: Partial<SuperAdmin> = new SuperAdmin({ username, password });
    let userRole = new Role();
    userRole.id = 1; //you set the role id.
    user.roles = [userRole];

    this.userService.createUser<SuperAdmin>(user);
  }
}
