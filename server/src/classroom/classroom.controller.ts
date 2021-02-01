import { UseJwtAuth } from '@hilma/auth-nest';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomIdDto, ClassroomGameDto } from './classroom.dtos';
import { SchoolIdDto } from 'src/school/school.dtos';


@Controller('api/classroom')
export class ClassroomController {
    constructor(
        private classroomService: ClassroomService
        ) {}

        @UseJwtAuth('teacher')
        @Get('/getClassroomGames')
        async getClassroomGames(@Query() req: ClassroomIdDto){
            return await this.classroomService.getClassroomGames(req);
        }

        @UseJwtAuth('teacher')
        @Get('/getClassStudents')
        async getClassStudents (@Query() classId: ClassroomIdDto){
            return await this.classroomService.getClassStudents(classId.classId)
        }

        @UseJwtAuth('teacher')
    @Post('/addGameRelation')
    async addGameRelation(@Body() req: ClassroomGameDto) {
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
