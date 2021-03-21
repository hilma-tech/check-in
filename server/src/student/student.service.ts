import { Injectable, Inject, Req, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User, UserConfig, UserService, USER_MODULE_OPTIONS, SALT } from '@hilma/auth-nest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getConnection, Repository } from 'typeorm';
import { Student } from './student.entity';
import { GetStudentSkip, SearchValDto, UserRegisterDto } from './student.dtos';
import * as bcrypt from 'bcrypt';
import { Classroom } from 'src/classroom/classroom.entity';
import { ClassroomService } from 'src/classroom/classroom.service';

@Injectable()
export class StudentService extends UserService {
  constructor(
    @Inject(USER_MODULE_OPTIONS) protected config_options: UserConfig,
    @InjectRepository(Student)
    protected readonly userRepository: Repository<Student>,
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
    private classroomService: ClassroomService,
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

      let Class = await this.userRepository.findOne({
        relations: ['classroomStudent'],
        where: [{ id: findUser.id }]
      })
      if (pass) {
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
        if(this.classroomService !== undefined){
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

    student.school = req.schoolId
    let userRole = new Role();
    userRole.id = 4; //you set the role id.
    student.roles = [userRole];
    return await this.createUser<Student>(student);
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
      if (fullname.includes(val.toLowerCase())) {
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

  async deleteStudent(@Body() studentId: string){
    await this.userRepository.delete(studentId)
  }

}
