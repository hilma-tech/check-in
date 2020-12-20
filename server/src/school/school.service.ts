import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {School} from './school.entity'

@Injectable()
export class SchoolService {

    constructor(
        @InjectRepository(School)
        private schoolRepository: Repository<School>
      ) {}

    async getSchools(){

        return await this.schoolRepository.find();
    }
}
