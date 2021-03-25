import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ClassroomService } from 'src/classroom/classroom.service';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { permissionInfoSave } from './permission.dto';


@Controller('api/permission')
export class PermissionController {
    constructor(
        private PermissionService: PermissionService,
    ) {
    }

    @Post('/setClassPermission')
    async setClassPermission(@Body() req: permissionInfoSave) {
        await this.PermissionService.setPermissions(req)
    }

}
