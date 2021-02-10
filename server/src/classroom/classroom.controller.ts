import { RequestUser, UseJwtAuth } from '@hilma/auth-nest';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomIdDto, ClassroomGameDto, GetClassSkip } from './classroom.dtos';
import { SchoolIdDto } from 'src/school/school.dtos';
import { ClassroomFieldService } from 'src/classroom-field/classroom-field.service';


@Controller('api/classroom')
export class ClassroomController {
    constructor(
        private classroomService: ClassroomService,
        private classroomFieldService: ClassroomFieldService
        ) {}

      

        @UseJwtAuth('teacher')
    @Post('/addGameRelation')
    async addGameRelation(@Body() req: ClassroomGameDto) {
        await this.classroomFieldService.addGameFieldsToClass(req)
        return await this.classroomService.addGameRelation(req);
    }

    @UseJwtAuth('teacher')
    @Post('/removeGameRelation')
    async removeGameRelation(@Body() req: ClassroomGameDto) {
        return await this.classroomService.removeGameRelation(req)
    }

    @UseJwtAuth('superAdmin')
    @Get('/getSchoolClasses')
    async getSchoolClasses(@Query() req: SchoolIdDto) {
        return await this.classroomService.getSchoolClasses(req.schoolId)
    }
}
