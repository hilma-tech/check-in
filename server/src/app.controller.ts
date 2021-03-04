import { RequestUser, UseLocalAuth, UserService } from '@hilma/auth-nest';
import { Controller, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
) {

}

  @UseLocalAuth()
  @Post('/login')
  login(@RequestUser() userInfo, @Res() res) {
    console.log('userInfo: ', userInfo);
    console.log('res: ', res);
    let body = this.userService.login(userInfo, res);
    res.send(body);
  }
}
