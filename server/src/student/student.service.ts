import { Injectable, Inject, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConfig, UserService, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Student } from './student.entity'
import { GetStudentSkip } from './student.dtos';
import * as bcrypt from 'bcrypt'

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
        let numStudents = await this.userRepository.count();
        let haveMoreStudents = numStudents > Number(skipON.studentsLength) + 50 ? true : false;
        let students = await this.userRepository.find({
            relations: ['school', 'classroomStudent'],
            skip: Number(skipON.studentsLength),
            take: 50,
        })
        return { studentsInfo: students, haveMoreStudents: haveMoreStudents }
    }

    async getStudentsClassrooms(@Req() studentId: string) {
        let studentsClassroom = await this.userRepository.findOne({
            relations: ['classroomStudent'],
            where: [{ id: studentId }],
        })
        let classes = studentsClassroom.classroomStudent.map((studentClass)=>{
            return {id: studentClass.id, name: studentClass.name}
        })
        return classes
    }

    async CheckUserInfoAndGetClassId(username:string, password:string, classId:string) {
        let findUser = await this.userRepository.findOne({
            where: [{ username: username }],
            select: ['id', 'password']
        })
        let pass = bcrypt.compareSync(password, findUser.password)

        let Class = await this.userRepository.findOne({
            relations: ['classroomStudent'],
            where: [{ id: findUser.id }],
        })

        const classID = () => {
            Class.classroomStudent.map(IsInClass => {
                if (IsInClass.id !== Number(classId)) {
                    return true
                }
            })
        }
        if (findUser && pass && classID) {
            return true
        } else {
            return false
        }
    }
}

