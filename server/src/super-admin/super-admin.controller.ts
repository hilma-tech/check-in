import {
  UserService,
  UseLocalAuth,
  RequestUser,
  UserModule,
  User,
  Role,
} from '@hilma/auth-nest';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { SuperAdmin } from './super-admin.entity';

@Controller('api/super-admin')
export class SuperAdminController {
  constructor(private readonly userService: UserService) {}

  //   @UseLocalAuth()
  //   @Post('/login')
  //   login(@RequestUser() userInfo, @Res() res) {
  //     console.log('userInfo', userInfo, 'res', res);
  //     let body = this.userService.login(userInfo, res);
  //     console.log('body', body);

  //     res.send(body);
  //   }

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
