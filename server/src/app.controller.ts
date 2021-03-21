import { RequestUser, UseLocalAuth, UserService } from '@hilma/auth-nest';
import { Controller, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
