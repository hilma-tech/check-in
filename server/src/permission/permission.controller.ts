import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { allPermissions, DayReqPermissionsDto, PermissionDelete } from './permission.dto';
import { PermissionService } from './permission.service';
import { ClassroomService } from 'src/classroom/classroom.service';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { UseJwtAuth } from '@hilma/auth-nest';


@Controller('api/permission')
export class PermissionController {
    constructor(
        private PermissionService: PermissionService,
    ) {
    }
    @UseJwtAuth('teacher')
    @Post('/setClassPermission')
    async setClassPermission(@Body() req: allPermissions) {
        await this.PermissionService.setPermissions(req)
    }

    @UseJwtAuth('teacher')
    @Get('/dayPermissions')
    async dayPermissions(@Query() req: DayReqPermissionsDto) {
        return await this.PermissionService.getDayClassPermissions(req)
    }

    @UseJwtAuth('teacher')
    @Post('/deletePermission')
    async deletePermission(@Body() req: PermissionDelete) {
        await this.PermissionService.deletePermission(req)
    }

}
