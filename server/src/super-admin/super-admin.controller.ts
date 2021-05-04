import { UserService, RequestUser, Role, UseJwtAuth, UseLocalAuth } from '@hilma/auth-nest';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserExist } from 'src/user-exist/user-exist.decorator';
import { SuperAdmin } from './super-admin.entity';
import { SuperAdminService } from './super-admin.service'

@Controller('api/super-admin')
export class SuperAdminController {
  constructor(private readonly userService: UserService,
    private superadminService: SuperAdminService) {
    // this.register({username: 'shirush@gmail.com', password: 'shiraa123'})
  }

  @UserExist()
  @UseJwtAuth('teacher', 'superAdmin')
  @Get('/getUserType')
  getUserType(@RequestUser() userInfo) {
    return userInfo.type;
  }

  // @Post('/register')
  // register(@Body() req: any) {
  //   let username = req.username;
  //   let password = req.password;
  //   let user: Partial<SuperAdmin> = new SuperAdmin({ username, password });
  //   let userRole = new Role();
  //   userRole.id = 1; //you set the role id.
  //   user.roles = [userRole];

  //   this.userService.createUser<SuperAdmin>(user);
  // }

  @UseLocalAuth()
  @Post('/login')
  login(@RequestUser() userInfo, @Res() res) {
    let body = this.superadminService.login(userInfo, res);
    res.send(body);
  }
}
