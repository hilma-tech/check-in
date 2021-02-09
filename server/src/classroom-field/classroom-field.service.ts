import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldService } from 'src/field/field.service';
import { Repository } from 'typeorm';
import { ClassroomField } from './classroom-field.entity';

@Injectable()
export class ClassroomFieldService {
    constructor(
        @InjectRepository(ClassroomField)
        private classFieldRepository: Repository<ClassroomField>,
        private fieldService: FieldService,
      ) {}
    
      async addGameFieldsToClass(@Body() req: any) {
        let fields = await this.fieldService.getGameFields(req.gameId)
        fields.forEach((field) => {  
          let eek = new ClassroomField;
          eek.classroom_id = req.classId
          eek.field_id = field.id
          eek.new_value = field.default_value
          this.classFieldRepository.save(eek)
        });
        return "hoi";
      }
}
