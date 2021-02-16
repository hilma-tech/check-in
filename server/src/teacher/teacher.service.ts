import { Injectable, Inject, Body, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConfig, UserService, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { GetTeacherSkip, TeacherIdDto, GetClassSkip } from './teacher.dtos';

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

  // async addTeacherInfo(@Body() teacherInfo: any) {
  //   console.log('teacherInfo: ', teacherInfo);

  // }

  async getTeacherClasses(@Body() userinfo: string, skipON: GetClassSkip) {
    let currTeacher = await this.userRepository.findOne({
      relations: ['classroomTeacher'],
      where: [{ id: userinfo }],
    });
    let currTeacherClasses = currTeacher.classroomTeacher.map(teacherClass => {
      return { id: teacherClass.id, name: teacherClass.name };
    });
    let haveMoreClasses =
      currTeacherClasses.length > Number(skipON.classesLength) + 50
        ? true
        : false;

    if (skipON.classesLength === '0') {
      return {
        currTeacherClasses: currTeacherClasses.slice(
          Number(skipON.classesLength),
          Number(skipON.classesLength) + 50,
        ),
        haveMoreClasses: haveMoreClasses,
        firstName: currTeacher.first_name,
        lastName: currTeacher.last_name,
      };
    } else {
      return {
        currTeacherClasses: currTeacherClasses.slice(
          Number(skipON.classesLength),
          Number(skipON.classesLength) + 50,
        ),
        haveMoreClasses: haveMoreClasses,
      };
    }
  }

  async getTeacher(@Req() skipON: GetTeacherSkip) {
    let numTeachers = await this.userRepository.count();
    let haveMoreTeachers =
      numTeachers > Number(skipON.teachersLength) + 50 ? true : false;
    let teachers = await this.userRepository.find({
      skip: Number(skipON.teachersLength),
      take: 50,
      relations: ['school', 'classroomTeacher'],
    });
    return { teachersInfo: teachers, haveMoreTeachers: haveMoreTeachers };
  }

  async getTeacherInfo(@Req() req: TeacherIdDto) {
    let teacherInfo = await this.userRepository.findOne({
      where: [{ id: req.teacherId }],
      relations: ['school', 'classroomTeacher'],
    });
    return teacherInfo;
  }

  async getTeacherName(@Req() req: TeacherIdDto) {
    let teacherInfo = await this.userRepository.findOne({
      where: [{ id: req.teacherId }],
      select: ['first_name'],
    });
    return teacherInfo;
  }
}
