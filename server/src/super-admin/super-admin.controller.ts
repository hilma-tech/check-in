import {
  UserService,
  UseLocalAuth,
  RequestUser,
  Role,
  UseJwtAuth,
} from '@hilma/auth-nest';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { SuperAdmin } from './super-admin.entity';

@Controller('api/super-admin')
export class SuperAdminController {
  constructor(private readonly userService: UserService) {
    // this.register({username: 'superadmin@gmail.com', password:'superadmin1'})
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
    userRole.id = 1; //you just the role id.
    user.roles = [userRole];

    this.userService.createUser<SuperAdmin>(user);
  }
}
