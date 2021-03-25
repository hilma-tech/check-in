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
        let isPermssion = await this.permissionRepository.find({ where: [{ classroom_id: info.classId }] })
        if (isPermssion.length>0) {
            let yu = await this.permissionRepository.createQueryBuilder()
                .update(Permission)
                .set({ start_time: info.startTime, end_time: info.endTime, classroom_id: info.classId })
                .where({ classroom_id: info.classId })
                .execute();
        }
        else {
            return await this.permissionRepository.save({ start_time: info.startTime, end_time: info.endTime, classroom_id: info.classId })
        }
    }



    async getPermissionByClassId(classId) {
        let permissions = await this.permissionRepository.find({
            where: [{ classroom_id: classId }],
            select: ['start_time', 'end_time']
        })
        return permissions
    }

}