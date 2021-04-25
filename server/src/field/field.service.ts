import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { ClassroomFieldService } from 'src/classroom-field/classroom-field.service';
import { Repository } from 'typeorm';
import { SaveFieldDto } from './field.dtos';
import { Field } from './field.entity';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field)
    private fieldRepository: Repository<Field>,
    // private classroomFieldService: ClassroomFieldService,
  ) { }

  async saveField(@Body() req: SaveFieldDto) {
    req.data.map(async fieldObject => {
      let field = new Field();
      field.field_name = fieldObject.name;
      field.type = fieldObject.selection;
      if (
        fieldObject.selection === 'image' ||
        fieldObject.selection === 'text'
      ) {
        field.default_value = fieldObject.value[0].value;
      } else {
        let tempValue = fieldObject.value.map(valField => {
          return valField === null ? '' : valField.value;
        })
        field.default_value = JSON.stringify(
          tempValue.filter(valField => {
            return valField.length !== 0;
          }),
        );
      }
      field.order = fieldObject.order;
      field.game = req.id;

      await this.fieldRepository.save(field);
    });
  }

  async saveFieldAndAddToClasses(@Body() req) {
      let field = new Field();
      field.field_name = req.data.name;
      field.type = req.data.selection;
      if (
        req.data.selection === 'image' ||
        req.data.selection === 'text'
      ) {
        field.default_value = req.data.value[0].value;
      } else {
        let tempValue = req.data.value.map(valField => {
          return valField === null ? '' : valField.value;
        })
        field.default_value = JSON.stringify(
          tempValue.filter(valField => {
            return valField.length !== 0;
          }),
        );
      }
      field.order = req.data.order;
      field.game = req.id;

      let temp = await this.fieldRepository.save(field);
      console.log('temp: ', temp);
      return temp
  }

  async deleteField(fields) {
    return await this.fieldRepository.delete(fields)
  }

  async getGameFields(gameId) {
    let fields = await this.fieldRepository
      .createQueryBuilder('Field')
      .innerJoinAndSelect('Field.game', 'Game')
      .select('Field.id')
      .addSelect('Field.default_value')
      .addSelect('Field.type')
      .where('Game.id = :id', { id: Number(gameId) })
      .getMany();
    return fields;
  }

  
}
