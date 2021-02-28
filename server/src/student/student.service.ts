import { Injectable, Inject, Req, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User, UserConfig, UserService, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getConnection, Repository } from 'typeorm';
import { Student } from './student.entity';
import { GetStudentSkip, UserRegisterDto } from './student.dtos';
import * as bcrypt from 'bcrypt';
import { Classroom } from 'src/classroom/classroom.entity';

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
    let haveMoreStudents =
      numStudents > Number(skipON.studentsLength) + 50 ? true : false;
    let students = await this.userRepository.find({
      relations: ['school', 'classroomStudent'],
      skip: Number(skipON.studentsLength),
      take: 50,
    });
    return { studentsInfo: students, haveMoreStudents: haveMoreStudents };
  }

  async getStudentsClassrooms(@Req() studentId: string) {
    let studentsClassroom = await this.userRepository.findOne({
      relations: ['classroomStudent'],
      where: [{ id: studentId }],
    });
    let classes = studentsClassroom.classroomStudent.map(studentClass => {
      return { id: studentClass.id, name: studentClass.name };
    });
    return classes;
  }

  async CheckUserInfoAndGetClassId(username: string, password: string, classId: string) {
    let findUser = await this.userRepository.findOne({
      where: [{ username: username }],
      select: ['id', 'password']
    })
    if (findUser) {
      let pass = bcrypt.compareSync(password, findUser.password)

      let Class = await this.userRepository.findOne({
        relations: ['classroomStudent'],
        where: [{ id: findUser.id }]
      })

      let classID = Class.classroomStudent.map(IsInClass => {
        if (Number(IsInClass.id) === Number(classId)) {
          return true
        }
      })

      if (pass && classID.includes(true)) {
        return true
      }
    }
  }


  async changeStudentPassword(userInfo) {
    const hash = bcrypt.hashSync(userInfo.password, 10);
    this.userRepository.createQueryBuilder()
      .update(User)
      .set({ password: hash })
      .where("username = :username", { username: userInfo.username })
      .execute();
  }


  async getClassStudents(classId: string, studentLength: number) {
    let students = await this.userRepository
      .createQueryBuilder('Student')
      .innerJoinAndSelect('Student.classroomStudent', 'Classroom')
      .select('Student.id')
      .addSelect('Student.first_name')
      .addSelect('Student.last_name')
      .addSelect('Student.username')
      .groupBy('Student.id')
      .where('Classroom.id = :id', { id: classId })
      .take(50)
      .skip(studentLength)
      .getManyAndCount();

    return {
      students: students[0],
      haveMoreStudents: students[1] > studentLength + 50 ? true : false,
    };
  }

  async addStudent(@Body() req: UserRegisterDto) {
    console.log('req: ', req);
    let username = req.username;
    let password = req.password;
    let student: Partial<Student> = new Student({ username, password });
    student.first_name = req.firstName;
    student.last_name = req.lastName;

    if (req.classrooms !== undefined || req.classrooms.length !== 0) {
      student.classroomStudent = req.classrooms.map((classroom) => {
        console.log('classroom: ', classroom);
        let studentClassroom = new Classroom()
        studentClassroom.id = classroom.id
        studentClassroom.name = classroom.name
        studentClassroom.school_id = req.schoolId
        return studentClassroom
      })
    }

    student.school = req.schoolId
    console.log('student.classroomStudent: ', student.classroomStudent);
    let userRole = new Role();
    userRole.id = 4; //you set the role id.
    student.roles = [userRole];
    this.createUser<Student>(student);
  }
}
