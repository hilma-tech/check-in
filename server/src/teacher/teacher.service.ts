import { Injectable, Inject, Body, Req, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MailerInterface,
  Role,
  SALT,
  User,
  UserConfig,
  UserService,
  USER_MODULE_OPTIONS,
} from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Like, Repository, Unique } from 'typeorm';
import { Teacher } from './teacher.entity';
import { GetTeacherSkip, TeacherIdDto, GetClassSkip, TeacherRegisterDto } from './teacher.dtos';
import { env } from 'process';
import * as bcrypt from 'bcrypt';
import { ClassroomService } from 'src/classroom/classroom.service';
import { Classroom } from 'src/classroom/classroom.entity';
import { parse } from 'path';
import { School } from 'src/school/school.entity';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class TeacherService extends UserService {
  constructor(
    @Inject(USER_MODULE_OPTIONS) protected config_options: UserConfig,
    @InjectRepository(Teacher)
    protected readonly userRepository: Repository<Teacher>,
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,

    @Inject(forwardRef(() => ClassroomService))
    private classroomService: ClassroomService,
    @Inject(forwardRef(() => SchoolService))
    private readonly schoolService: SchoolService,
    @Inject('MailService')
    protected readonly mailer: MailerInterface,

  ) {
    super(config_options, userRepository, jwtService, configService, mailer);
  }

  async addTeacher(@Body() req: TeacherRegisterDto) {
    let username = req.email;
    let password = req.password;
    let user: Partial<Teacher> = new Teacher({ username, password });
    user.first_name = req.first_name
    user.last_name = req.last_name
    if (req.fields_data !== undefined || req.fields_data.length !== 0) {
      user.classroomTeacher = req.fields_data.map((classroom) => {
        if (!this.classroomService.isClassroomInSchool(classroom.classId, req.school_id)) {
          throw new Error()
        }
        let classroomTeacher = new Classroom()
        classroomTeacher.id = classroom.classId
        return classroomTeacher
      })
    }
    let school = await this.schoolService.getSchoolInfoById(req.school_id)
    user.school = school
    let userRole = new Role();
    userRole.id = req.rakaz === "true" ? 2 : 3; //you set the role id.
    user.roles = [userRole];
    return await this.createUser<Teacher>(user);
  }

  async changeTeacherPassword(username, password) {
    const hash = bcrypt.hashSync(password, SALT);
    return await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: hash })
      .where({ username: username })
      .execute();
  }

  async editTeacher(@Body() req: any) {
    if (req.password !== '') {
      await this.sendUpdatePasswordEmail(req.username, req.password);
    }
    let teacher = await this.userRepository.findOne({
      where: [{ id: req.id }],
      relations: ['classroomTeacher'],
    });
    if (teacher.username !== req.username) {
      this.EditTeacherEmail(req)
    }
    let username = req.username;
    let password = bcrypt.hashSync(req.password, SALT);
    let teacherInfo: Partial<Teacher> = new Teacher({ username, password });
    if (req.password.length === 0) {
      teacherInfo = { username };
    }
    teacherInfo.first_name = req.firstName;
    teacherInfo.last_name = req.lastName;
    teacherInfo.school = req.schoolId;
    if (teacher.classroomTeacher.length !== 0) {
      for (let i = 0; i < teacher.classroomTeacher.length; i++) {
        let a = await this.classroomService.deleteTeacherClassroom(
          teacher.classroomTeacher[i].id,
          req.id,
        );
      }
    }

    if (req.classrooms.length !== 0) {
      for (let i = 0; i < req.classrooms.length; i++) {
        let a = await this.classroomService.addTeacherToClassroom(
          req.classrooms[i].id,
          teacher,
        );
      }
    }

    return await this.userRepository.update({ id: req.id }, teacherInfo);
  }

  async deleteTeacher(@Body() teacherId: string) {
    await this.userRepository.delete(teacherId);
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
      order: { created: 'DESC' },
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

  async sendUpdatePasswordEmail(email, password) {
    let html =
      `<div style= "direction:rtl; background-color:whitesmoke;">
  <div style="padding:10px;" >
  <h3 style="color:#043163; font-size:17px">שלום לך!</h3>
  <h3 style="color:#043163; font-size:17px">הסיסמה שלך עודכנה.</h3>
  <p style="font-size:17px">הסיסמה החדשה שלך לאתר היא:</p>
  <p style="background-color:#dcdcdc;width:max-content; font-size:17px;">${password}</p>
  <h3 style="color:#043163">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</h3>
  <div style="display:flex;flex-direction:row;align-self:center;style="padding-bottom:10px"">
  <img src="cid:checkinlogo" height="20" style="padding:10px"/>
  <img src="cid:hilmalogo" height="40"/>
  </div>
  </div>
  </div>`
    this.sendEmail(email, "עדכון סיסמא לצ'ק אין", '', html, [
      {
        fileName: 'blueCheckIn.png',
        path: `${env.HOST}/icons/blueCheckIn.png`,
        cid: 'checkinlogo',
      },
      {
        fileName: 'hilmaIcon.png',
        path: `${env.HOST}/icons/hilmaIcon.png`,
        cid: 'hilmalogo',
      },
    ]);
  }

  async EditTeacherEmail(val) {
    let newToken = this.generateVerificationToken()
    await this.userRepository.createQueryBuilder()
      .update(Teacher)
      .set({ verificationToken: newToken, emailVerified: 0 })
      .where({ id: val.id })
      .execute();

    let html = `<div style= "direction:rtl; background-color:whitesmoke;">
    <div style="padding:10px;" >
        <h3 style="color:#043163; font-size:17px">ברוכים השבים לצ'ק אין!</h3>
        <p style="font-size:17px">כתובת המייל שלכם שונתה</p>
        <p style="font-size:17px; margin-top:-3px">לחצו על הקישור <a href="${env.DOMAIN}/api/teacher/Verify?token=${newToken}">כאן</a> על מנת לאמת את כתובת המייל החדשה ומעבר לאתר</p>
        <p style="font-size:17px">*שימו לב, סיסמתכם נשארה זהה</p>
        <h3 style="color:#043163">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</h3>
       <div style="display:flex;flex-direction:row;align-self:center;style="padding-bottom:10px"">
        <img src="cid:checkinlogo" height="20" style="padding:10px"/>
        <img src="cid:hilmalogo" height="40"/>
      </div>
      <div/>
        </div>`;
    this.sendEmail(val.username, "כתובת המייל שלכם שונתה עבור אתר צ'ק אין", '', html, [
      {
        fileName: 'blueCheckIn.png',
        path: `${env.HOST}/icons/blueCheckIn.png`,
        cid: 'checkinlogo',
      },
      {
        fileName: 'hilmaIcon.png',
        path: `${env.HOST}/icons/hilmaIcon.png`,
        cid: 'hilmalogo',
      },
    ]);
  }


  async sendVerificationEmail(email, token, user) {
    let html = `<div style= "direction:rtl; background-color:whitesmoke;">
    <div style="padding:10px;" >
    <h3 style="color:#043163; font-size:17px">ברוכים הבאים לצ'ק אין!</h3>
    <p style="font-size:17px">הסיסמה שלכם לאתר היא:</p>
    <p style="background-color:#dcdcdc;width:max-content; font-size:17px;">${user.password}</p>
    <h3 style="color:#043163">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</h3>
    <p style="font-size:17px">על מנת לסיים את ההרשמה שלכם,</p>
    <p style="font-size:17px; margin-top:-3px">לחצו על הקישור <a href="${env.DOMAIN}/api/teacher/Verify?token=${token}">כאן</a> כדי לאמת את כתובת המייל ומעבר לאתר</p>
   <div style="display:flex;flex-direction:row;align-self:center;style="padding-bottom:10px"">
    <img src="cid:checkinlogo" height="20" style="padding:10px"/>
    <img src="cid:hilmalogo" height="40"/>
  </div>
<div/>
    </div>`;
    this.sendEmail(email, "ברוכים הבאים לצ'ק אין", '', html, [
      {
        fileName: 'blueCheckIn.png',
        path: `${env.HOST}/icons/blueCheckIn.png`,
        cid: 'checkinlogo',
      },
      {
        fileName: 'hilmaIcon.png',
        path: `${env.HOST}/icons/hilmaIcon.png`,
        cid: 'hilmalogo',
      },
    ]);
  }

  async searchInTeacher(val) {
    let teachers = await this.userRepository.find({
      relations: ['school', 'classroomTeacher'],
    });
    let Search = teachers.map(teacher => {
      let fullname = (teacher.first_name + ' ' + teacher.last_name).toLowerCase();
      let classes = teacher.classroomTeacher.map((classroom) => { return classroom.name })
      if (fullname.includes(val.toLowerCase()) || classes.join(' ').includes(val.toLowerCase()) || teacher.school.name.includes(val.toLowerCase())) {
        return teacher;
      }
    });
    var searchresult = Search.filter(function (teacher) {
      return teacher != null;
    });
    return searchresult;
  }


  async sendUpdateOnGameChangeEmail(email, gamename) {
    let html =
      ` <div style="direction: rtl; background-color: whitesmoke;">
    <div style="padding: 10px;">
    <h3 style="color: #043163; font-size: 17px;">שלום לך!</h3>
    <h3 style="color: #043163; font-size: 17px;">המשחק ${gamename} נערך</h3>
    <p style="font-size: 17px;">אנא הכנס לאתר על מנת לראות את השינויים:</p>
    <p style="font-size: 17px;">${env.HOST}</p>
    <h3 style="color: #043163;">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</h3>
    <div style="display: flex; flex-direction: row; align-self: center;"><img style="padding: 10px;" src="cid:checkinlogo" height="20" /> <img src="cid:hilmalogo" height="40" /></div>
    </div>
    </div>`
    this.sendEmail(email, "משחק שהוספת לכיתה שלך נערך", '', html, [
      {
        fileName: 'blueCheckIn.png',
        path: `${env.HOST}/icons/blueCheckIn.png`,
        cid: 'checkinlogo',
      },
      {
        fileName: 'hilmaIcon.png',
        path: `${env.HOST}/icons/hilmaIcon.png`,
        cid: 'hilmalogo',
      },
    ]);
  }
  async getTeacherByClassId(classIds, GameInfo) {
    console.log('classIds: ', classIds);


    let getTeacherEmailsPerClass = await Promise.all(classIds.map(async (classroom) => {
      let getTeachers = await this.userRepository
        .createQueryBuilder('Teacher')
        .innerJoinAndSelect('Teacher.classroomTeacher', 'Classroom')
        .select('Teacher.id')
        .addSelect('Teacher.username')
        .groupBy('Teacher.id')
        .where('Classroom.id = :id', { id: Number(classroom.id) })
        .execute()

      var TeacherEmails = getTeachers.map((teacherInfo) => {
        return teacherInfo.Teacher_username
      })
      return TeacherEmails
    })).then((email) => { return email })

    var flatten = (arr) => {
      return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
      }, []);
    }
    var TeachersEmails = flatten(getTeacherEmailsPerClass)
    var uniqueTeacherEmail = [...new Set(await TeachersEmails)];
    uniqueTeacherEmail.map((email) => {
      this.sendUpdateOnGameChangeEmail(email, GameInfo.game_name)
    })



  }
}
