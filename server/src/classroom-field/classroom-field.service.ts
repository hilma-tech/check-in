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
  ) { }

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

  async deleteFieldAndClassField(@Body() req: any) {
    let deleteFieldAndGetFieldId = await this.fieldService.deleteField(req);
    deleteFieldAndGetFieldId.map(async (fieldId) => {
      let changedFields = await this.classFieldRepository.find({
        where: [{ field_id: fieldId }],
      })
      changedFields.map((field) => {
        this.classFieldRepository.delete(field.id)
      })
    })
  }
}
