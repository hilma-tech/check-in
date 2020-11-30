import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService, UseLocalAuth, RequestUser } from '@hilma/auth-nest'; 

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
