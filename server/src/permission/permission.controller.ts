import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ClassroomService } from 'src/classroom/classroom.service';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { permissionInfoSave,  getpermission} from './permission.dto';


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

    @Get('/getClassPermissions')
    async getClassPermissions(@Query() req: any) {
      return  await this.PermissionService.getPermissionByClassId(req.classId)
    }

}
