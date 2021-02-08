import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldService } from 'src/field/field.service';
import { Repository } from 'typeorm';
import { ClassField } from './class-field.entity';

@Injectable()
export class ClassFieldService {
  constructor(
    @InjectRepository(ClassField)
    private classFieldRepository: Repository<ClassField>,
    private fieldService: FieldService,
  ) {}

  async addGameFieldsToClass(@Body() req: any) {
    let fields = await this.fieldService.getGameFields(req.gameId)
    fields.forEach((field) => {  
      let eek = new ClassField;
      eek.class_id = req.classId
      eek.field_id = field.id
      eek.new_value = field.default_value
      this.classFieldRepository.save(eek)
    });
    return "hoi";
  }
}
