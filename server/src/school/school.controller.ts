import { Get, Controller, Query } from '@nestjs/common';
import { SchoolService } from './school.service';
import { UseJwtAuth } from '@hilma/auth-nest';
import { GetSchoolSkip } from './school.dtos';

@Controller('api/school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @UseJwtAuth('superAdmin')
  @Get('/getSchools')
  async getSchoolsInfo(@Query() skipON: GetSchoolSkip) {
    return await this.schoolService.getSchools(skipON);
  }
}
