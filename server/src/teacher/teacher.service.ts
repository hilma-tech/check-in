import { Injectable, Inject } from '@nestjs/common';
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
    ) { 
        super(config_options, userRepository, jwtService, configService);
        console.log('SuperAdminService');
    }

    async getTeacher(){
        return await this.userRepository.find({
            relations: ['School']
        })
    }
}
