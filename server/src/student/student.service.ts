import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConfig, UserService, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Student } from './student.entity' 

@Injectable()
export class StudentService extends UserService {
    constructor(
        @Inject(USER_MODULE_OPTIONS) protected config_options: UserConfig,
        @InjectRepository(Student)
        protected readonly userRepository: Repository<Student>,
        protected readonly jwtService: JwtService,
        protected readonly configService: ConfigService,
    ) { 
        super(config_options, userRepository, jwtService, configService);
    }
}
