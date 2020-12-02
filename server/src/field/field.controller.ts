import { UseJwtAuth } from '@hilma/auth-nest';
import { Body, Controller, Post } from '@nestjs/common';
import { FieldService } from './field.service';

@Controller('api/field')
export class FieldController {
    constructor(private fieldService: FieldService) {
      }

    //   @UseJwtAuth('superAdmin')
    // @Post('/getGameField')
    // getGameField(@Body() gameId: any) {
    //     return this.fieldService.getGamefields(gameId.id)
    // }

}
