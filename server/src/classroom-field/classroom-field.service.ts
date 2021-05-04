import { FilesType, ImageService } from '@hilma/fileshandler-typeorm';
import { Body, forwardRef, Inject, Injectable, UploadedFiles } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassroomGameDto } from 'src/classroom/classroom.dtos';
import { FieldService } from 'src/field/field.service';
import { GameService } from 'src/game/game.service';
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
    @Inject(forwardRef(() => GameService))
    private gameService: GameService,
    private readonly imageService: ImageService,
  ) { }

  //! gamefields is an array of classfields(objects)

  async getClassroomGameFields(@Body() data: GetClassGameFieldsDto) {
    let GameFields = await this.classFieldRepository.find({
      where: [{ classroom_id: Number(data.classroom_id), game_id: Number(data.game_id) }],
      relations: ["field_id"]
    })
    return GameFields.map((field) => {
      return { id: field.id, newValue: field.new_value, field_id: field.field_id }
    })
  }

  async removeGameFieldsFromClass(@Body() req: removeFFromCDto) {
    let fields = await this.fieldService.getGameFields(req.gameId);
    fields.forEach(async (field) => {
      if (field.type === 'image') {
        let removeField = await this.classFieldRepository.findOne({
          where: [{ field_id: field.id }]
        })
        if (removeField.new_value !== field.default_value) {
          await this.imageService.delete(removeField.new_value)
        }
      }
      this.classFieldRepository.delete({
        classroom_id: req.classId,
        field_id: field,
      });
    });
  }

  //when the teacher choose a game

  async addGameFieldsToClass(@UploadedFiles() files: FilesType, @Body() req: ClassroomGameDto) {
    let isGameId = await this.gameService.isGameId(req.gameId)
    let reqFields = req.fieldsData.map((field) => { return field.id })
    reqFields.sort(function (a, b) {
      return a - b;
    })
    let ds = await this.fieldService.getGameFields(req.gameId)
    let gameFields = ds.map((field) => { return field.id })
    gameFields.sort(function (a, b) {
      return a - b;
    })
    if (JSON.stringify(reqFields) === JSON.stringify(gameFields) && isGameId !== undefined) {
      let Inp = null;

      req.fieldsData.forEach(async (field) => {
        let emptyField = 0;
        Inp = field.value[0].value;
        if (field.type !== 'image') {
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
              if (field.value[0].value.includes("blob:http")) {
                Inp = await this.imageService.save(files, field.value[0].id);
              } else {
                throw new Error()
              }
            } catch (error) {
              Inp = field.value[0].value
            }
          } else {
            Inp = field.value[0].value
          }
        }

        emptyField = 0;
        let newField: Partial<ClassroomField> = new ClassroomField();
        newField.classroom_id = req.classId;
        newField.field_id = field//field.id;
        newField.new_value = Inp;
        newField.game_id = req.gameId
        try {
          await this.classFieldRepository.save(newField);
        } catch (err) {
          throw new Error('Duplicate values not saved')
        }
      });
    } else {
      throw new Error('game not up to date')
    }
  }

  //when the super admin edit game and add new fields
  async editGameAddFieldsToClass(@Body() req) {
    let newField: Partial<ClassroomField> = new ClassroomField();
    newField.classroom_id = req.classId;
    newField.field_id = req.field//field.id;
    newField.new_value = req.field.default_value;
    newField.game_id = req.gameId
    this.classFieldRepository.save(newField);
  }

  async deleteClassField(@Body() req: number) {
    let deleteFieldAndGetFieldId = await this.fieldService.getGameFields(req);
    let fieldsForDelete = [];
    deleteFieldAndGetFieldId.map(async fieldId => {
      fieldsForDelete.push(fieldId.id);
      if (fieldId.type === 'image') {
        await this.imageService.delete(fieldId.default_value)
      }
      // await this.classFieldRepository.delete({ field_id: fieldId.id });
    });
    if (fieldsForDelete.length > 0) {
      await this.fieldService.deleteField(fieldsForDelete);
    }
  }

  async editGameDeleteClassField(gameID: number, fieldsForDelete: number[]) {
    let deleteFieldAndGetFieldId = await this.fieldService.getGameFields(gameID);

    fieldsForDelete.forEach((fieldId) => {
      deleteFieldAndGetFieldId.map(async field => {
        if (fieldId === field.id && field.type === 'image') {
          await this.imageService.delete(field.default_value)
        }
      });
    })
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
