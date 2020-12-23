import { Injectable, Inject, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConfig, UserService, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import {Teacher} from './teacher.entity'

@Injectable()
export class TeacherService extends UserService {
    constructor(
        @Inject(USER_MODULE_OPTIONS) protected config_options: UserConfig,
        @InjectRepository(Teacher)
        protected readonly userRepository: Repository<Teacher>,
        protected readonly jwtService: JwtService,
        protected readonly configService: ConfigService,
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>
    ) { 
        super(config_options, userRepository, jwtService, configService);
    }

    async getTeacherClasses(@Body() userinfo: any) {
        //use teacherId to find all classes relevant
        
        let currTeacher = await this.teacherRepository.find({
          relations: ['classrooms'],
          where: [{id: userinfo}]
        });
        console.log(currTeacher, "userrrrr");
        let currTeacherClasses = currTeacher[0].classrooms;
        return currTeacherClasses;
      }
}
