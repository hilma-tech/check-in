import { User } from '@hilma/auth-nest';
import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class UserExistGuard {
  constructor(

    @InjectRepository(User)
    protected userRepository: Repository<User>,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    let teacher = await this.userRepository.findOne({ id: user.id })

    if(user.type === "Teacher" && teacher === undefined){
      throw new UnauthorizedException()
    }
    return true;
  }
}
