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
        // console.log('info: ', info);
        info.map(async (time) => {
            return await this.permissionRepository.save({ start_time: time.startTime, end_time: time.endTime, day: time.day, classroom_id: time.classId })
        })
    }

    async getPermissionByClassId(classId) {
        let permissions = await this.permissionRepository.find({
            where: [{ classroom_id: classId }],
            select: ['start_time', 'end_time', 'day']
        })
        let permissionWODuplicates = permissions.filter((permission, i, arr) => arr.findIndex(perr => (JSON.stringify(perr) === JSON.stringify(permission))) === i)
        return permissionWODuplicates
    }

}