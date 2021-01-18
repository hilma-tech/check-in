import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ClassroomService } from './classroom.service';

@Controller('api/classroom')
export class ClassroomController {
    constructor(
        private classroomService: ClassroomService
        ) {}

        @Get('/getClassroomGames')
        async getClassroomGames(@Req() req: any){
            return await this.classroomService.getClassroomGames(req.query);
        }

        @Get('/getClassStudents')
        async getClassStudents (@Req() classId: any){
            return await this.classroomService.getClassStudents(classId.query.classId)
        }

    @Post('/addGameRelation')
    async addGameRelation(@Body() req: any) {
        return await this.classroomService.addGameRelation(req);
    }

    @Post('/removeGameRelation')
    async removeGameRelation(@Body() req: any) {
        return await this.classroomService.removeGameRelation(req)
    }
}
