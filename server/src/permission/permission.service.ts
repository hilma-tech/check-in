import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/classroom/classroom.entity';
import { Repository } from 'typeorm';
import { permissionInfoSave } from './permission.dto';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,

    ) { }

    async setPermissions(info) {
        return await this.permissionRepository.save({ start_time: info.startTime, end_time: info.endTime, classroom_id: info.classId })
    }

    async getPermissionByClassId(classId) {
        let permissions = await this.permissionRepository.find({
            where: [{ classroom_id: classId }],
            select: ['start_time', 'end_time']
        })
        let permissionWODuplicates = permissions.filter((permission, i, arr) => arr.findIndex(perr => (JSON.stringify(perr) === JSON.stringify(permission))) === i)
        return permissionWODuplicates
    }

}