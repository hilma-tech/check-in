import { UseJwtAuth } from '@hilma/auth-nest';
import { Body, Controller, Get, Post, Query, UploadedFiles, } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import {
  ClassroomGameDto, RemoveClassroomGameDto,
} from './classroom.dtos';
import { SchoolIdDto } from 'src/school/school.dtos';
import { ClassroomFieldService } from 'src/classroom-field/classroom-field.service';
import { FilesType, UseFilesHandler } from '@hilma/fileshandler-typeorm';
import { UserExist } from 'src/user-exist/user-exist.decorator';

@Controller('api/classroom')
export class ClassroomController {
  constructor(
    private classroomService: ClassroomService,
    private classroomFieldService: ClassroomFieldService,
  ) {}

  @UserExist()
  @UseJwtAuth('teacher')
  @Post('/addGameRelation')
  @UseFilesHandler(100)
  async addGameRelation(@UploadedFiles() files: FilesType, @Body() req: ClassroomGameDto) {
    await this.classroomFieldService.addGameFieldsToClass(files, req);
    return await this.classroomService.addGameRelation(req);
  }

  @UserExist()
  @UseJwtAuth('teacher')
  @Post('/removeGameRelation')
  async removeGameRelation(@Body() req: RemoveClassroomGameDto) {
    await this.classroomFieldService.removeGameFieldsFromClass(req);
    return await this.classroomService.removeGameRelation(req);
  }

  @UserExist()
  @UseJwtAuth('superAdmin')
  @Get('/getSchoolClasses')
  async getSchoolClasses(@Query() req: SchoolIdDto) {
    return await this.classroomService.getSchoolClasses(req.schoolId);
  }
}
