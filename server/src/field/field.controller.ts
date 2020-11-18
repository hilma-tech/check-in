import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import {FieldService} from './field.service'

@Controller('field')
export class FieldController {
    constructor(private fieldService: FieldService) {
      }

    @Post('/getFieldsgame')
      getFieldsgame(@Body() gameId: number){
          return this.fieldService.getGamefileds(gameId)
      }
}
