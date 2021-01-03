import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {School} from './school.entity'

@Injectable()
export class SchoolService {

    constructor(
        @InjectRepository(School)
        private schoolRepository: Repository<School>
      ) {}

    async getSchools(@Req() skipON: any){
      let numSchools = await this.schoolRepository.count();
      let haveMoreSchools = numSchools > Number(skipON.schoolsLength) + 50 ? true : false;
        let schools = await this.schoolRepository.find({
          skip: skipON.schoolsLength,
          take: 50,
      });
      console.log(schools);
      return { schoolsInfo: schools, haveMoreSchools: haveMoreSchools }    }
}

