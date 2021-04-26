import { Injectable, Inject, Req, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User, UserConfig, UserService, USER_MODULE_OPTIONS, SALT } from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Any, getConnection, Repository } from 'typeorm';
import { Student } from './student.entity';
import { GetStudentSkip, SearchValDto, UserEditDto, UserRegisterDto } from './student.dtos';
import * as bcrypt from 'bcrypt';
import { Classroom } from 'src/classroom/classroom.entity';
import { ClassroomService } from 'src/classroom/classroom.service';
import { FieldService } from 'src/field/field.service';
import { GameService } from 'src/game/game.service';
import { School } from 'src/school/school.entity';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class StudentService extends UserService {
  constructor(
    @Inject(USER_MODULE_OPTIONS) protected config_options: UserConfig,
    @InjectRepository(Student)
    protected readonly userRepository: Repository<Student>,
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
    @Inject("ClassroomService")
    private readonly classroomService: ClassroomService,
    protected readonly schoolService: SchoolService
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
      order: { created: "DESC" }
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

  async CheckUserInfoAndGetClassId(username: string, password: string) {
    let findUser = await this.userRepository.findOne({
      where: [{ username: username }],
      select: ['id', 'password']
    })
    if (findUser) {
      let pass = bcrypt.compareSync(password, findUser.password)

      var Class = await this.userRepository.findOne({
        relations: ['classroomStudent', 'school'],
        where: [{ id: findUser.id }],
        select: ['id', "school", "first_name", "last_name"]
      })
      if (pass) {
        //returns id, first name, last name, classes, and school info
        return Class
      }
    }
  }


  async changeStudentPassword(userInfo) {
    const hash = bcrypt.hashSync(userInfo.password, SALT);
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
    let username = req.username;
    let password = req.password;
    let student: Partial<Student> = new Student({ username, password });
    student.first_name = req.firstName;
    student.last_name = req.lastName;
    student.classroomStudent = []
    if (req.classrooms.length !== 0) {
      for (let i = 0; i < req.classrooms.length; i++) {
        if (this.classroomService !== undefined) {
          if (!this.classroomService.isClassroomInSchool(req.classrooms[i].id, req.schoolId)) {
            throw new Error()
          }
        }
        let studentClassroom = new Classroom()
        studentClassroom.id = req.classrooms[i].id
        studentClassroom.name = req.classrooms[i].name
        studentClassroom.school_id = req.schoolId
        student.classroomStudent[i] = studentClassroom
      }
    }

    student.school = await this.schoolService.getSchoolInfoById(req.schoolId)
    let userRole = new Role();
    userRole.id = 4; //you set the role id.
    student.roles = [userRole];
    return await this.createUser<Student>(student);
  }

  async editStudent(req: UserEditDto) {
    let student = await this.userRepository.findOne({ where: [{ id: req.id }], relations: ["classroomStudent"] })
    let username = req.username;
    let password = bcrypt.hashSync(req.password, SALT);;
    let studentInfo: Partial<Student> = new Student({ username, password });
    if (req.password.length === 0) {
      studentInfo = { username }
    }
    studentInfo.first_name = req.firstName
    studentInfo.last_name = req.lastName
    studentInfo.school = await this.schoolService.getSchoolInfoById(req.schoolId)
    for (let i = 0; i < student.classroomStudent.length; i++) {
      let a = await this.classroomService.deleteClassroom(student.classroomStudent[i].id, req.id)
    }

    for (let i = 0; i < req.classrooms.length; i++) {
      let a = await this.classroomService.addStudentToClassroom(req.classrooms[i].id, student)
    }

    return await this.userRepository.update({ id: req.id }, studentInfo);
  }

  async isStudentExist(username: string) {
    let user = await this.userRepository.findOne({
      where: [{ username: username }]
    })
    return user === undefined ? false : true
  }

  //superadmn student search
  async searchInStudent(val) {
    let students = await this.userRepository.find({ relations: ['school', 'classroomStudent'] })
    let Search = students.map((student) => {
      let fullname = (student.first_name + ' ' + student.last_name).toLowerCase()
      let classes = student.classroomStudent.map((classroom) => { return classroom.name })
      if (fullname.includes(val.toLowerCase()) || classes.join(' ').includes(val.toLowerCase()) || student.school.name.includes(val.toLowerCase())
      ) {
        return student
      }
    })
    var searchresult = Search.filter(function (student) {
      return student != null;
    });
    return searchresult
  }

  //teacher student search
  async searchStudents(@Body() val: string, classId: SearchValDto) {
    let Searchstudents = await this.userRepository
      .createQueryBuilder('Student')
      .innerJoinAndSelect('Student.classroomStudent', 'Classroom')
      .select('Student.id')
      .addSelect('Student.first_name')
      .addSelect('Student.last_name')
      .addSelect('Student.username')
      .groupBy('Student.id')
      .where('Classroom.id = :id', { id: classId })
      .execute()

    let Search = Searchstudents.map((student) => {
      let fullname = (student.Student_first_name + ' ' + student.Student_last_name).toLowerCase()

      if (fullname.includes(val.toLowerCase())) {
        return student
      }
    })
    var searchresult = Search.filter(function (student) {
      return student != null;
    });
    return searchresult
  }

  async deleteStudent(@Body() studentId: string) {
    await this.userRepository.delete(studentId)
  }

}
