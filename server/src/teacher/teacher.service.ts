import { Injectable, Inject, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConfig, UserService, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import {Teacher} from './teacher.entity'
import { GetTeacherSkip } from './teacher.dtos';

@Injectable()
export class TeacherService extends UserService {
    constructor(
        @Inject(USER_MODULE_OPTIONS) protected config_options: UserConfig,
        @InjectRepository(Teacher)
        protected readonly userRepository: Repository<Teacher>,
        protected readonly jwtService: JwtService,
        protected readonly configService: ConfigService,
    ) { 
        super(config_options, userRepository, jwtService, configService);
    }

    async getTeacher(@Req() skipON: GetTeacherSkip){
        let numTeachers = await this.userRepository.count();
        let haveMoreTeachers = numTeachers > Number(skipON.teachersLength) + 50 ? true : false;
        let teachers = await this.userRepository.find({
            skip: skipON.teachersLength,
            take: 50,
            relations: ['School']
        })
        return { teachersInfo: teachers, haveMoreTeachers: haveMoreTeachers }
    }
}
