import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldService } from 'src/field/field.service';
import { Repository } from 'typeorm';
import { ClassroomField } from './classroom-field.entity';
const { mustValid } = require('../serverTools/ServerValid');

@Injectable()
export class ClassroomFieldService {
  constructor(
    @InjectRepository(ClassroomField)
    private classFieldRepository: Repository<ClassroomField>,
    private fieldService: FieldService,
  ) {}

  async removeGameFieldsFromClass(@Body() req: any) {
    let fields = await this.fieldService.getGameFields(req.gameId);
    fields.forEach(field => {
      this.classFieldRepository.delete({
        classroom_id: req.classId,
        field_id: field.id,
      });
    });
  }

  async addGameFieldsToClass(@Body() req: any) {
    let Inp = null;
    // let fields = await this.fieldService.getGameFields(req.gameId)
    req.fieldsData.forEach(field => {
      let emptyField = 0;
      if (field.type !== 'image') {
        Inp = field.value[0].value;
        if (field.type === 'text') {
          let valid = mustValid(Inp);
          if (valid.length !== 0) {
            throw new Error();
          }
        }
        if (field.type !== 'text') {
          let newArr = field.value.map(obj => {
            return obj.value;
          });
          newArr.map(singularInp => {
            let val = singularInp;
            if (mustValid(val).length !== 0) {
              if (field.type === 'text') {
                throw new Error();
              } else {
                emptyField++;
              }
            }
          });
          if (emptyField > 4) {
            throw new Error();
          }
          Inp = JSON.stringify(newArr);
        }
      } else {
        Inp = field.value[0].value;
      }

      emptyField = 0;
      let newField = new ClassroomField();
      newField.classroom_id = req.classId;
      newField.field_id = field.id;
      newField.new_value = Inp;
      this.classFieldRepository.save(newField);
    });
  }

  async deleteClassField(@Body() req: any) {
    let deleteFieldAndGetFieldId = await this.fieldService.getGameFields(req);
    let fieldsForDelete = [];
    deleteFieldAndGetFieldId.map(async fieldId => {
      fieldsForDelete.push(fieldId.id);
      await this.classFieldRepository.delete({ field_id: fieldId.id });
    });
    if (fieldsForDelete.length > 0) {
      await this.fieldService.deleteField(fieldsForDelete);
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
      return { id: field.id, value: getNewVal.new_value }
    })).then((editedField) => { return editedField })

  }
}
