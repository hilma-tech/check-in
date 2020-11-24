import { Body, Controller, Post } from '@nestjs/common';
import { FieldDto } from './field.dto';
import { Field } from './field.entity';
import { FieldService } from './field.service';

@Controller('api/field')
export class FieldController {
    constructor(private fieldService: FieldService) {
        // this.getGameField(69)
      }

    // @Post('/save')
    // saveField(@Body() req: any) {
    //     this.fieldService.saveField(req)
    // }

    @Post('/getGameField')
    getGameField(@Body() gameId: any) {
        return this.fieldService.getGamefields(gameId)
    }

}
