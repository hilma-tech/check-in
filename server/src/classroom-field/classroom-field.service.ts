import { FilesType, ImageService } from '@hilma/fileshandler-typeorm';
import { Body, Injectable, UploadedFiles } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassroomGameDto } from 'src/classroom/classroom.dtos';
import { FieldService } from 'src/field/field.service';
import { Repository } from 'typeorm';
import { getCGFDto, GetClassGameFieldsDto, removeFFromCDto } from './classroom-field.dtos';
import { ClassroomField } from './classroom-field.entity';
const { mustValid } = require('../serverTools/ServerValid');

@Injectable()
export class ClassroomFieldService {
  constructor(
    @InjectRepository(ClassroomField)
    private classFieldRepository: Repository<ClassroomField>,
    private fieldService: FieldService,
    private readonly imageService: ImageService,
  ) {}

  async getClassroomGameFields(@Body() data: GetClassGameFieldsDto) {
    let GameFields = await this.classFieldRepository.find({
      where: [{classroom_id: Number(data.classroom_id), game_id: Number(data.game_id)}],
      relations: ["field_id"]
    })
    return GameFields.map((field)=>{
      return {id: field.id, newValue: field.new_value, field: field.field_id}
    })
  }

  async removeGameFieldsFromClass(@Body() req: removeFFromCDto) {
    let fields = await this.fieldService.getGameFields(req.gameId);
    fields.forEach(async (field) => {
      if(field.type === 'image'){
        let removeField = await this.classFieldRepository.findOne({
          where: [{field_id: field.id}]
        })
        if(removeField.new_value !== field.default_value){
          await this.imageService.delete(removeField.new_value)
        }
      }
      this.classFieldRepository.delete({
        classroom_id: req.classId,
        field_id: field.id,
      });
    });
  }

  async addGameFieldsToClass(@UploadedFiles() files: FilesType, @Body() req: ClassroomGameDto) {
    let Inp = null;
    req.fieldsData.forEach( async (field) => {
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
        if (files.length !== 0) {
          try {
            Inp = await this.imageService.save(files, field.value[0].id) ;
          } catch (error) {
            Inp = field.value[0].value
          }
        } else {
          Inp = field.value[0].value
        }

        
      }

      emptyField = 0;
      let newField = new ClassroomField();
      newField.classroom_id = req.classId;
      newField.field_id = field.id;
      newField.new_value = Inp;
      newField.game_id = req.gameId
      this.classFieldRepository.save(newField);
    });
  }

  async deleteClassField(@Body() req: number) {
    let deleteFieldAndGetFieldId = await this.fieldService.getGameFields(req);
    let fieldsForDelete = [];
    deleteFieldAndGetFieldId.map(async fieldId => {
      console.log('fieldId: ', fieldId);
      fieldsForDelete.push(fieldId.id);
      if(fieldId.type === 'image'){
        await this.imageService.delete(fieldId.default_value)
      }
      await this.classFieldRepository.delete({ field_id: fieldId.id });
    });
    if (fieldsForDelete.length > 0) {
      await this.fieldService.deleteField(fieldsForDelete);
    }
  }

  //!
  async checkFieldAltValue(gameId: any, ClassId: any) {
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
