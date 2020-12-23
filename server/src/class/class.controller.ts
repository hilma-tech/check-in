import { Body, Controller, Post } from '@nestjs/common';
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
