import { Injectable, Inject, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConfig, UserService, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Student } from './student.entity'
import { GetStudentSkip } from './student.dtos';

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


    async getStudents(@Req() skipON: GetStudentSkip) {
        // console.log('skipON: ', skipON);
        let numStudents = await this.userRepository.count();
        // console.log('numStudents: ', numStudents);
        let haveMoreStudents = numStudents > Number(skipON.studentsLength) + 50 ? true : false;
        let students = await this.userRepository.find({
            relations: ['school','classroomStudent'],
            skip: skipON.studentsLength,
            take: 50,
        })
        console.log('students: ', students);
        return { studentsInfo: students, haveMoreStudents: haveMoreStudents }
    }
}
