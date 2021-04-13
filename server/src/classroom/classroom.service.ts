import { Body, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameService } from 'src/game/game.service';
import { ClassroomFieldService } from 'src/classroom-field/classroom-field.service';
import { Repository } from 'typeorm';
import { ClassroomGameDto, RemoveClassroomGameDto } from './classroom.dtos';
import { Classroom } from './classroom.entity';
import { ClassInfoDto, EditSchoolInfoDto } from 'src/school/school.dtos';
import { School } from 'src/school/school.entity';
import { Student } from 'src/student/student.entity';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
    private gameService: GameService,

    // @Inject("TeacherService")
    @Inject(forwardRef(() => TeacherService))
    private teacherService: TeacherService,

    protected classroomfieldService: ClassroomFieldService,
  ) {}


  // res:  School { name: 'לחגדכ', city: 'ךצכלכ', id: 42 }
  // info:  {
  //   schoolNameError: { toShow: 'none', mess: '' },
  //   schoolCityError: { toShow: 'none', mess: '' },
  //   schoolName: 'לחגדכ',
  //   schoolCity: 'ךצכלכ',
  //   classes: [
  //     { id: 1, name: "ג'8", classNameError: [Object] },
  //     { id: 2, name: "צ'3", classNameError: [Object] }
  //   ]
  // }

  async addClassesWithSchool(@Body() info: EditSchoolInfoDto, res: School) {
    let i = 0;
    for (i = 0; i < info.classes.length; i++) {
      let classroom = new Classroom();
      classroom.name = info.classes[i].name;
      classroom.school_id = res.id;
      let classroomInf = await this.classroomRepository.save(classroom)
      console.log('info.classes[i].chosenTeachers: ', info.classes[i].chosenTeachers);
      for (let z = 0; z < info.classes[i].chosenTeachers.length; z++) {
        console.log('info.classes[i].chosenTeachers[z]: ', info.classes[i].chosenTeachers[z]);
        let ans = await this.teacherService.addTeacher({
          first_name: info.classes[i].chosenTeachers[z].first_name ,
          last_name: info.classes[i].chosenTeachers[z].last_name ,
          school_id: res.id ,
          email: info.classes[i].chosenTeachers[z].email,
          password: info.classes[i].chosenTeachers[z].password ,
          rakaz: "false",
          fields_data: [{id: classroomInf.id, value: classroomInf.name, classId: classroomInf.id}]
        })
        console.log('ans: ', ans);
      }
    }
    return true;
  }

  async removeClassesFromSchool(classes: ClassInfoDto[]) {
    for (let i = 0; i < classes.length; i++) {
      await this.classroomRepository.delete({ id: classes[i].id })
    }
    return true;
  }

  async updateSchoolClasses(classes: ClassInfoDto[], existClasses: ClassInfoDto[], schoolId: number) {
    for (let i = 0; i < classes.length; i++) {
      let ifExist = existClasses.filter((classroom) => { return classroom.id === classes[i].id })
      if (ifExist.length === 0) {
        let classroom = new Classroom();
        classroom.name = classes[i].name;
        classroom.school_id = schoolId;
        await this.classroomRepository.save(classroom)
      } else {
        let classroom = new Classroom();
        classroom.name = classes[i].name;
        classroom.id = classes[i].id
        await this.classroomRepository.save(classroom)
      }
    }
    return true;
  }
  async addGameRelation(@Body() req: ClassroomGameDto) {
    let classroomGame = new Classroom();
    classroomGame.games = await this.gameService.getGameById(req.gameId);
    classroomGame.id = req.classId;
    let currClassGameArr = await this.classroomRepository.findOne({
      relations: ['games'],
      where: [{ id: req.classId }],
    });
    currClassGameArr.games.push(classroomGame.games[0]);
    let newlyAddedGame = await this.classroomRepository.save(currClassGameArr);
    return { newlyAddedGame: newlyAddedGame };
  }

  async removeGameRelation(@Body() req: RemoveClassroomGameDto) {
    let ans = await this.classroomRepository.findOne({
      relations: ['games'],
      where: [{ id: req.classId }],
    });
    ans.games = ans.games.filter(game => {
      return game.id !== req.gameId;
    });
    let newRemovedGame = await this.classroomRepository.save(ans);
    return { newRemovedGame: newRemovedGame };
  }
  async getSchoolClasses(schoolId: string) {
    let classes = await this.classroomRepository.find({
      relations: ['teachers'],
      where: { school_id: Number(schoolId) },
    });
    return classes;
  }

  //if the classroom not exist it's will return undifiend
  async getClassroomInfoByName(classroomName: string, schoolId: number) {
    return await this.classroomRepository.findOne({
      select: ["id", "name"],
      where: [{ name: classroomName, school_id: schoolId }],
    })
  }

  async isClassroomInSchool(classroomId: number, schoolId: number) {
    let classroom = await this.classroomRepository.findOne({
      where: [{ id: classroomId, school_id: schoolId }],
    })
    return classroom === undefined ? false : true
  }

  async deleteClassroom(classroom_id: number, student_id: string) {
    let classroomInfo = await this.classroomRepository.findOne({ id: classroom_id })
    classroomInfo.students = classroomInfo.students.filter((student) => {
      return student.id !== student_id
    })
    return await this.classroomRepository.save(classroomInfo)
  }

  async deleteTeacherClassroom(classroom_id: number, teacher_id: string) {
    let classroomInfo = await this.classroomRepository.findOne({ id: classroom_id })
    classroomInfo.teachers = classroomInfo.teachers.filter((teacher) => {
      return teacher.id !== teacher_id
    })
    return await this.classroomRepository.save(classroomInfo)
  }

  async addStudentToClassroom(classroom_id: number, student: Student) {
    let classroomInfo = await this.classroomRepository.findOne({ id: classroom_id })
    classroomInfo.students.push(student)
    return await this.classroomRepository.save(classroomInfo)
  }

  async addTeacherToClassroom(classroom_id, teacher) {
    let classroomInfo = await this.classroomRepository.findOne({ id: classroom_id })
    classroomInfo.teachers.push(teacher)
    return await this.classroomRepository.save(classroomInfo)
  }
}
