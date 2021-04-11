import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,

    ) { }

    async setPermissions(info) {
        // let nottosave = info.permissions.map(async (time) => {
        //     var permissionDay = await this.permissionRepository.find({ where: [{ day: info.day, classroom_id: info.classId }] })
        //     let save = permissionDay.map(async (savedTime, index) => {
        //         let savedStart = savedTime.start_time
        //         let savedEnd = savedTime.end_time
        //         let SavedTimes = { startTime: savedStart, endTime: savedEnd }
        //         console.log('SavedTimes: ', SavedTimes);
        //         if (JSON.stringify(time) !== JSON.stringify({ startTime: savedStart, endTime: savedEnd })) {
        //             this.deletePermission(savedTime);
        //             console.log(' no need to save, already there!');
        //             await this.permissionRepository.save({ start_time: time.startTime, end_time: time.endTime, classroom_id: info.classId, day: info.day })
        //         }
                // else {
                //     console.log('savedTime delete: ', savedTime);

                // }
        //     })
        //     if (save.length === 0) {

        //         console.log('save: ', save);
        //     }
        //     //     var isPermission = await this.permissionRepository.find({ start_time: time.startTime, end_time: time.endTime, classroom_id: info.classId, day: info.day })
        //     //     console.log('isPermission: ', isPermission);
        //     //     if (permissionDay.length > 0) {
        //     //         permissionDay.map((per) => {
        //     //             this.deletePermission(per)
        // })
        // console.log(nottosave, "nottosave");
        // }
        //     if (isPermission.length===0) {
        //         console.log('isPermission: not!');
        //         return await this.permissionRepository.save({ start_time: time.startTime, end_time: time.endTime, classroom_id: info.classId, day: info.day })
        //     }
        // })
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
        return permissions
    }

    async deletePermission(info) {
        return await this.permissionRepository.delete(info)
    }

}