import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { allPermissions } from './permission.dto';
import { PermissionService } from './permission.service';



@Controller('api/permission')
export class PermissionController {
    constructor(
        private PermissionService: PermissionService,
    ) {
    }

    @Post('/setClassPermission')
    async setClassPermission(@Body() req: allPermissions) {
        await this.PermissionService.setPermissions(req)
    }

    @Get('/dayPermissions')
    async dayPermissions(@Query() req: any) {
        return await this.PermissionService.getDayClassPermissions(req)
    }
}
