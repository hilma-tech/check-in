import { Injectable, Inject, Body, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConfig, UserService, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
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

  async getTeacherClasses(@Body() userinfo: any) {
    //use teacherId to find all classes relevant

    let currTeacher = await this.userRepository.find({
      relations: ['classroomTeacher'],
      where: [{ id: userinfo }],
    });
    let currTeacherClasses = currTeacher[0].classroomTeacher;

    return currTeacherClasses;
  }
  async getTeacher(@Req() skipON: GetTeacherSkip) {
    let numTeachers = await this.userRepository.count();
    let haveMoreTeachers =
      numTeachers > Number(skipON.teachersLength) + 50 ? true : false;
    let teachers = await this.userRepository.find({
      skip: skipON.teachersLength,
      take: 50,
      relations: ['school', 'classroomTeacher'],
    });
    return { teachersInfo: teachers, haveMoreTeachers: haveMoreTeachers };
  }
  async getTeacherInfo(@Req() req: any) {
    let teacherInfo = await this.userRepository.findOne({
      where: [{ id: req.teacherId }],
      relations: ['school', 'classroomTeacher'],
    });
    return teacherInfo;
  }
}
