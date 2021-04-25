import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayReqPermissionsDto } from './permission.dto';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,

    ) { }

    async setPermissions(info) {
        var permissionDay = await this.permissionRepository.find({ where: [{ day: info.day, classroom_id: info.classId }] })
        permissionDay.map(async (per) => {
            await this.permissionRepository.delete(per)
        })

        info.permissions.map(async (per) => {
            await this.permissionRepository.save({ start_time: per.startTime, end_time: per.endTime, classroom_id: info.classId, day: info.day })
        })
    }

    async getDayClassPermissions(req: DayReqPermissionsDto) {
        let Savedpermissions = await this.permissionRepository.find({
            where: [{ classroom_id: req.classId, day: req.day }],
            select: ['start_time', 'end_time', 'day']
        })
        return Savedpermissions
    }
    async getPermissionByClassId(classId) {
        let permissions = await this.permissionRepository.find({
            where: [{ classroom_id: classId }],
            select: ['start_time', 'end_time', 'day']
        })
        return permissions
    }

    async deletePermission(info) {
        return await this.permissionRepository.delete(info)
    }

}