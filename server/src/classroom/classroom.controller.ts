import { RequestUser, UseJwtAuth, UseLocalAuth } from '@hilma/auth-nest';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { request } from 'express';
import { userInfo } from 'os';
import { ClassroomService } from './classroom.service';

@Controller('api/classroom')
export class ClassroomController {
    constructor(
        private classroomService: ClassroomService
        ) {}

    

    @Post('/addGameRelation')
    async addGameRelation(@Body() req: any) {
        return await this.classroomService.addGameRelation(req);
    }

    @Post('/removeGameRelation')
    async removeGameRelation(@Body() req: any) {
        return await this.classroomService.removeGameRelation(req)
    }
}
