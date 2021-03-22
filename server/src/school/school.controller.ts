import { Get, Controller, Query, Post, Body } from '@nestjs/common';
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

  @UseJwtAuth('superAdmin')
  @Post('/addSchool')
  async addSchool(@Body() info:any) {
    return await this.schoolService.addSchool(info.info);
  }

  @UseJwtAuth('superAdmin')
  @Get('/getSchoolsNames')
  async getSchoolsNames() {
    return await this.schoolService.getSchoolsNames();
  }

  @UseJwtAuth('superAdmin')
  @Get('/SearchSchools')
  async SearchSchools(@Query() val: any) {
    return await this.schoolService.searchSchools(val);
    
  }
}
