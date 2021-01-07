import { Injectable, Inject, Body, Req } from '@nestjs/common';
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
        // console.log(currTeacher, "userrrrr");
        let currTeacherClasses = currTeacher[0].classrooms;
        // console.log(currTeacherClasses);
        
        return currTeacherClasses;
      }
    async getTeacher(@Req() skipON: GetTeacherSkip){
        let numTeachers = await this.userRepository.count();
        let haveMoreTeachers = numTeachers > Number(skipON.teachersLength) + 50 ? true : false;
        let teachers = await this.userRepository.find({
            skip: skipON.teachersLength,
            take: 50,
            relations: ['school','classrooms']
        })
        // console.log('teachers: ', teachers);
        return { teachersInfo: teachers, haveMoreTeachers: haveMoreTeachers }
    }
}
