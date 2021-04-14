import { Get, Controller, Query, Post, Body } from '@nestjs/common';
import { SchoolService } from './school.service';
import { UseJwtAuth } from '@hilma/auth-nest';
import { AddSchoolInfoDto, DeleteSchoolDto, EditSchoolInfoDto, GetSchoolSkip, SearchValDto } from './school.dtos';

@Controller('api/school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @UseJwtAuth('superAdmin')
  @Post('/deleteSchool')
  async deleteSchool(@Body() val: DeleteSchoolDto) {
    // console.log('val: ', typeof val.schoolId);
    // { schoolId: 53 }
    return await this.schoolService.deleteSchool(val.schoolId)
  }

  @UseJwtAuth('superAdmin')
  @Get('/getSchools')
  async getSchoolsInfo(@Query() skipON: GetSchoolSkip) {
    return await this.schoolService.getSchools(skipON);
  }  

  @UseJwtAuth('superAdmin')
  @Post('/addSchool')
  async addSchool(@Body() info: AddSchoolInfoDto) {
    
    return await this.schoolService.addSchool(info);
  }

  @UseJwtAuth('superAdmin')
  @Post('/editSchool')
  async editSchool(@Body() info:EditSchoolInfoDto) {
    return await this.schoolService.editSchool(info);
  }

  @UseJwtAuth('superAdmin')
  @Get('/getSchoolsNames')
  async getSchoolsNames() {
    return await this.schoolService.getSchoolsNames();
  }

  @UseJwtAuth('superAdmin')
  @Get('/SearchSchools')
  async SearchSchools(@Query() val: SearchValDto) {
    return await this.schoolService.searchSchools(val);
  }
}
