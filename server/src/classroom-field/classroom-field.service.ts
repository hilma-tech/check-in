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

  async removeGameFieldsFromClass(@Body() req: any) {
    let fields = await this.fieldService.getGameFields(req.gameId)
    fields.forEach((field) => {
      this.classFieldRepository.delete({
        classroom_id: req.classId,
        field_id: field.id
      })
    })
  }

  async addGameFieldsToClass(@Body() req: any) {
    let fields = await this.fieldService.getGameFields(req.gameId)
    fields.forEach((field) => {
      let eek = new ClassroomField;
      eek.classroom_id = req.classId
      eek.field_id = field.id
      eek.new_value = field.default_value
      this.classFieldRepository.save(eek)
    });
  }

  async deleteClassField(@Body() req: any) {
    let deleteFieldAndGetFieldId = await this.fieldService.getGameFields(req);
    let fieldsForDelete = []
    deleteFieldAndGetFieldId.map(async (fieldId) => {
      fieldsForDelete.push(fieldId.id)
      await this.classFieldRepository.delete({ field_id: fieldId.id });
    })
    if (fieldsForDelete.length > 0) {
      await this.fieldService.deleteField(fieldsForDelete)
    }

  }

  async checkFieldAltValue(gameId, ClassId) {
    let fields = await this.fieldService.getGameFields(gameId);

   return Promise.all(fields.map(async (field) => {
      let getNewVal = await this.classFieldRepository.findOne({
        where: [{
          classroom_id: ClassId,
          field_id: field.id
        }],
        select: ['new_value']
      })
      if (getNewVal.new_value != null) {
        return { id: field.id, value: getNewVal.new_value }
      }
      else { return {id: field.id, value: field.default_value } }

    })).then((editedField) => { return editedField })

  }
}
