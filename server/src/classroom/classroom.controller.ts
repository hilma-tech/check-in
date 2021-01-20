import { UseJwtAuth } from '@hilma/auth-nest';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ClassroomService } from './classroom.service';

@Controller('api/classroom')
export class ClassroomController {
    constructor(
        private classroomService: ClassroomService
        ) {}

        @UseJwtAuth('teacher')
        @Get('/getClassroomGames')
        async getClassroomGames(@Req() req: any){
            return await this.classroomService.getClassroomGames(req.query);
        }

        @UseJwtAuth('teacher')
        @Get('/getClassStudents')
        async getClassStudents (@Req() classId: any){
            return await this.classroomService.getClassStudents(classId.query.classId)
        }

        @UseJwtAuth('teacher')
    @Post('/addGameRelation')
    async addGameRelation(@Body() req: any) {
        return await this.classroomService.addGameRelation(req);
    }

    @UseJwtAuth('teacher')
    @Post('/removeGameRelation')
    async removeGameRelation(@Body() req: any) {
        return await this.classroomService.removeGameRelation(req)
    }
}
