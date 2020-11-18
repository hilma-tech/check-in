import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interface } from 'readline';
import { Game } from 'src/game/game.entity';
import { Repository } from 'typeorm';
import { FieldDto } from './field.dto';
import { Field } from './field.entity';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field)
    private fieldRepository: Repository<Field>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async saveField(@Body() req: any) {
    console.log(req);
    
    req.data.map(async fieldObject => {
      let field = new Field();
      field.field_name = fieldObject.name;
      field.type = fieldObject.selection;
      field.default_value = JSON.stringify(fieldObject.value);
      field.order = fieldObject.order;
      field.game_id = req.id;

      let res = await this.fieldRepository.save(field);
    });
  }
}
