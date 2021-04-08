import { Body, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/classroom/classroom.entity';
import { ClassroomService } from 'src/classroom/classroom.service';
import { Repository } from 'typeorm';
import { EditSchoolInfoDto, GetSchoolSkip, SearchValDto } from './school.dtos';
import { School } from './school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    private classroomService: ClassroomService
  ) {
    this.dx()
  }
  
  async dx(){
    
    let a = await this.schoolRepository.find({where: [{id: 8}], relations: ['classrooms']})
    // console.log(a);
    
  }

  async deleteSchool(@Body() schoolId: string) {
    await this.schoolRepository.delete(schoolId)
  }

  async addSchool(@Body() info: any) {
    let school = new School();
    school.name = info.schoolName;
    school.city = info.schoolCity;
    let res = await this.schoolRepository.save(school);
    await this.classroomService.addClassesWithSchool(info, res)
    return res;
  }

  async editSchool(@Body() info: EditSchoolInfoDto) {
    let school = new School();
    school.id = info.id
    school.name = info.schoolName;
    school.city = info.schoolCity;
    let res = await this.schoolRepository.save(school);
    if(info.removedClasses.length !== 0){
      await this.classroomService.removeClassesFromSchool(info.removedClasses)
    }
    if(info.existClasses.length === 0){
      await this.classroomService.addClassesWithSchool(info, res)
    } else {
      await this.classroomService.updateSchoolClasses(info.classes, info.existClasses, info.id)
    }
    return res;
  }

  async getSchools(@Req() skipON: GetSchoolSkip) {
    let numSchools = await this.schoolRepository.count();
    let haveMoreSchools =
      numSchools > Number(skipON.schoolsLength) + 50 ? true : false;
    let schools = await this.schoolRepository.find({
      skip: Number(skipON.schoolsLength),
      take: 50,
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

  async searchSchools(val: SearchValDto) {
    let schools = await this.schoolRepository.find({
    });
    let Search = schools.map((school) => {
      if (school.name.includes(val.val.toLowerCase())) {
        return school
      }
    })
    var searchresult = Search.filter(function (school) {
      return school != null;
    });
    return searchresult
  }
}
