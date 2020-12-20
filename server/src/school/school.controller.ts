import { Get,Req,Controller } from '@nestjs/common';
import {SchoolService} from './school.service'
import { UseJwtAuth } from "@hilma/auth-nest";


@Controller('api/school')
export class SchoolController {
    constructor(
        private schoolService: SchoolService
      ) {}

      @UseJwtAuth("superAdmin")
      @Get("/getSchools")
      async getSchoolsInfo() {
        return await this.schoolService.getSchools()
      }
}
