import { Get, Controller, Query, Post, Body } from '@nestjs/common';
import { SchoolService } from './school.service';
import { UseJwtAuth } from '@hilma/auth-nest';
import { AddSchoolInfoDto, DeleteSchoolDto, EditSchoolInfoDto, GetSchoolSkip, SearchValDto } from './school.dtos';
import { UserExist } from 'src/user-exist/user-exist.decorator';

@Controller('api/school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Post('/deleteSchool')
  async deleteSchool(@Body() val: DeleteSchoolDto) {
    // { schoolId: 53 }
    return await this.schoolService.deleteSchool(val.schoolId)
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Get('/getSchools')
  async getSchoolsInfo(@Query() skipON: GetSchoolSkip) {
    return await this.schoolService.getSchools(skipON);
  }  

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Post('/addSchool')
  async addSchool(@Body() info: AddSchoolInfoDto) {
    return await this.schoolService.addSchool(info);
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Post('/editSchool')
  async editSchool(@Body() info:EditSchoolInfoDto) {
    return await this.schoolService.editSchool(info);
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Get('/getSchoolsNames')
  async getSchoolsNames() {
    return await this.schoolService.getSchoolsNames();
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Get('/SearchSchools')
  async SearchSchools(@Query() val: SearchValDto) {
    return await this.schoolService.searchSchools(val);
  }
}
