import { Body, forwardRef, Inject, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/classroom/classroom.entity';
import { ClassroomService } from 'src/classroom/classroom.service';
import { Like, Repository } from 'typeorm';
import { EditSchoolInfoDto, GetSchoolSkip, SearchValDto } from './school.dtos';
import { School } from './school.entity';
const { GetInfoLength } = require('../serverTools/GlobalVarbs');
const { fixString } = require('../serverTools/HelpFunc');

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,

    @Inject(forwardRef(() => ClassroomService))
    private classroomService: ClassroomService
  ) {}

  async deleteSchool(@Body() schoolId: number) {
    await this.schoolRepository.delete(schoolId)
  }

  async addSchool(@Body() info: any) {
    let school = new School();
    school.name = info.schoolName;
    school.city = info.schoolCity;
    let res = await this.schoolRepository.save(school);
    let teachers = await this.classroomService.addClassesWithSchool(info, res)


    return {...res, teachers: teachers.map((teacher)=>{
        return {
          id: teacher.data.id,
          first_name: teacher.data.first_name,
          last_name: teacher.data.last_name,
          username: teacher.data.username
        }
    })};
  }

  async editSchool(@Body() info: EditSchoolInfoDto) {
    let school = new School();
    school.id = info.id
    school.name = info.schoolName;
    school.city = info.schoolCity;
    let res = await this.schoolRepository.save(school);
    if (info.removedClasses.length !== 0) {
      await this.classroomService.removeClassesFromSchool(info.removedClasses)
    }
    await this.classroomService.updateSchoolClasses(info.classes, info.existClasses, info.id)
    return res;
  }

  async getSchools(@Req() skipON: GetSchoolSkip) {
    let numSchools = await this.schoolRepository.count();
    let haveMoreSchools =
      numSchools > Number(skipON.schoolsLength) + GetInfoLength ? true : false;
    let schools = await this.schoolRepository.find({
      skip: Number(skipON.schoolsLength),
      take: GetInfoLength,
      relations: ['teachers']
    });
    return { schoolsInfo: schools, haveMoreSchools: haveMoreSchools };
  }

  async getSchoolsNames() {
    return await this.schoolRepository.find({
      select: ["id", "name"]
    })
  }

  //if the school not exist it's will return undifiend
  async getSchoolIdByName(schoolName: string) {
    return await this.schoolRepository.findOne({
      select: ["id"],
      where: [{ name: schoolName }]
    })
  }

  async getSchoolNameById(Id) {
    return await this.schoolRepository.findOne({
      select: ["name"],
      where: [{ id: Id }]
    })
  }
  async getSchoolInfoById(Id) {
    return await this.schoolRepository.findOne({
      where: [{ id: Id }]
    })
  }
  async searchSchools(val: SearchValDto) {
    let searchresult = await this.schoolRepository.find({
      where: [{ city: Like("%" + fixString(val.val.toLowerCase()) + "%") }, { name: Like("%" + fixString(val.val.toLowerCase()) + "%") }]
    });
    return searchresult
  }
}
