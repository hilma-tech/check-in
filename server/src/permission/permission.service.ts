import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/classroom/classroom.entity';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,

    ) { }

    async setPermissions(info) {
        info.permissions.map(async (time) => {
            let isPermission = await this.permissionRepository.find({ where: [{ start_time: time.startTime, end_time: time.endTime, classroom_id: info.classId, day: info.day }] })
            if (isPermission.length > 0) {
                return ''
            }
            else {
                return await this.permissionRepository.save({ start_time: time.startTime, end_time: time.endTime, classroom_id: info.classId, day: info.day })
            }
        })
    }

    async getDayClassPermissions(req) {
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
        let permissionWODuplicates = permissions.filter((permission, i, arr) => arr.findIndex(perr => (JSON.stringify(perr) === JSON.stringify(permission))) === i)
        return permissionWODuplicates
    }

    async deletePermission(info) {
        return await this.permissionRepository.delete(info)
    }

}