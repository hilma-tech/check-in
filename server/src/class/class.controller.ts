import { RequestUser, UseJwtAuth, UseLocalAuth } from '@hilma/auth-nest';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { request } from 'express';
import { userInfo } from 'os';
import {ClassService} from './class.service'

@Controller('api/class')
export class ClassController {
    constructor(
        private classService: ClassService
        ) {}

    

    @Post('/addGameRelation')
    async addGameRelation(@Body() req: any) {
        return await this.classService.addGameRelation(req);
    }

    @Post('/removeGameRelation')
    async removeGameRelation(@Body() req: any) {
        return await this.classService.removeGameRelation(req)
    }
}
