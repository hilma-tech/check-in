import { UseJwtAuth } from '@hilma/auth-nest';
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
    req.data.map(async fieldObject => {  
      let field = new Field();
      field.field_name = fieldObject.name;
      field.type = fieldObject.selection;
      if (fieldObject.selection === 'image' || fieldObject.selection === 'text'){
        field.default_value = fieldObject.value[0].value
      } else {
        field.default_value = JSON.stringify(fieldObject.value.map((valField) => {return valField.value}));
      }
      field.order = fieldObject.order;
      field.game = req.id;

      let res = await this.fieldRepository.save(field);
    });
  }

  async getGamefields(@Body() gameId: any) {
      let res = await this.fieldRepository.find({where:{game_id: gameId.id}})
      return res;
  }
}
