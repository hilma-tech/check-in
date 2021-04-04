import { Injectable, Inject, Body, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerInterface, User, UserConfig, UserService, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { GetTeacherSkip, TeacherIdDto, GetClassSkip } from './teacher.dtos';
import { env } from 'process';

@Injectable()
export class TeacherService extends UserService {
  constructor(
    @Inject(USER_MODULE_OPTIONS) protected config_options: UserConfig,
    @InjectRepository(Teacher)
    protected readonly userRepository: Repository<Teacher>,
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
    @Inject('MailService')
    protected readonly mailer: MailerInterface
  ) {
    super(config_options, userRepository, jwtService, configService, mailer);
  }

  async deleteTeacher(@Body() teacherId: string){
    await this.userRepository.delete(teacherId)
  }

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
      order: { created: "DESC" }
    });
    return { teachersInfo: teachers, haveMoreTeachers: haveMoreTeachers };
  }

  async getTeacherInfo(@Req() req: TeacherIdDto) {
    let teacherInfo = await this.userRepository.findOne({
      where: [{ id: req.teacherId }],
      relations: ['school', 'classroomTeacher', 'roles'],
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

  async sendVerificationEmail(email, token, user) {
    let html =
      `<div style= "direction:rtl; background-color:whitesmoke;">
    <h3 style="color:#043163; font-size:17px">ברוכים הבאים לצ'ק אין!</h3>
    <p style="font-size:17px">הסיסמה שלכם לאתר היא:</p>
    <p style="background-color:#dcdcdc;width:max-content; font-size:17px;">${user.password}</p>
    <h3 style="color:#043163">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</h3>
    <p style="font-size:17px">על מנת לסיים את ההרשמה שלכם,</p>
    <p style="font-size:17px; margin-top:-3px">לחצו על הקישור <a href="http://${env.DOMAIN}/api/teacher/Verify?token=${token}">כאן</a> כדי לאמת את כתובת המייל ומעבר לאתר</p>
   <div style="display:flex;flex-direction:row;align-self:center;style="padding-bottom:10px"">
    <img src="cid:checkinlogo" height="20" style="padding:10px"/>
    <img src="cid:hilmalogo" height="40"/>
  </div>

    </div>`
    this.sendEmail(email, "ברוכים הבאים לצ'ק אין", '', html, [{
      fileName: "blueCheckIn.png",
      path: `http://${env.HOST}/icons/blueCheckIn.png`,
      cid: 'checkinlogo',
    }, {
      fileName: "hilmaIcon.png",
      path: `http://${env.HOST}/icons/hilmaIcon.png`,
      cid: 'hilmalogo',
    },])
  }

  async searchInTeacher(val: string) {
    let teachers = await this.userRepository.find({ relations: ['school', 'classroomTeacher'] })
    let Search = teachers.map((teacher) => {
      let fullname = (teacher.first_name + ' ' + teacher.last_name).toLowerCase()
      if (fullname.includes(val.toLowerCase())) {
        return teacher
      }
    })
    var searchresult = Search.filter(function (teacher) {
      return teacher != null;
    });
    return searchresult
  }

}
