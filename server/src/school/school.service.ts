import { Body, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassroomService } from 'src/classroom/classroom.service';
import { Repository } from 'typeorm';
import { GetSchoolSkip } from './school.dtos';
import { School } from './school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    private classroomService: ClassroomService
  ) { }

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
}
