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
    console.log('req: ', req);
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

  async createAndSaveToken(email, pass) {
    let token = await this.generateVerificationToken();
    console.log('token: ', token);
   let gf= await this.userRepository.createQueryBuilder()
   .update()
   .set({ verificationToken: token })
   .where({ username: email })
   .execute();
   console.log('gf: ', gf);
    return { token: token, password: pass }
  }



  async sendVerificationEmail(email, token) {
    let html =
      `<div style= "direction:rtl; background-color:whitesmoke">
    <h3 style="color:#043163">ברוכים הבאים לצ'ק אין!</h3>
    <p>הסיסמה שלכם לאתר היא:</p>
    <p style="background-color:#dcdcdc;width:max-content">${token.password}</p>
    <h3 style="color:#043163">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</h3>
    <p>על מנת לסיים את ההרשמה שלכם,</p>
    <p>לחצו על הקישור <a href="http://localhost:${env.PORT}/api/teacher/Verify?token=${token.token}">כאן</a> כדי לאמת את כתובת המייל ומעבר לאתר</p>
   <div style="display:flex;flex-direction:row;align-self:center;style="padding-bottom:10px"">
    <img src="cid:checkinlogo" height="20" style="padding:10px"/>
    <img src="cid:hilmalogo" height="40"/>
  </div>

    </div>`
    this.sendEmail(email, "ברוכים הבאים לצ'ק אין", '', html, [{
      fileName: "blueCheckIn.png",
      path: "http://localhost:3000/icons/blueCheckIn.png",
      cid: 'checkinlogo',
    }, {
      fileName: "hilmaIcon.png",
      path: "http://localhost:3000/icons/hilmaIcon.png",
      cid: 'hilmalogo',
    },])
  }

  async IsVerified(token) {
    await this.userRepository.createQueryBuilder()
      .update()
      .set({ emailVerified: true, verificationToken: null })
      .where({ verificationToken: token })
      .execute();
  }

}
