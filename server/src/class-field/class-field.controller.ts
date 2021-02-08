import { Body, Controller, Post } from '@nestjs/common';
import { ClassFieldService } from './class-field.service';

@Controller('api/class-field')
export class ClassFieldController {
    // constructor(
    //     private classFieldService: ClassFieldService,
    // ){}

    // @Post("/saveGameToClass")
    // saveGameToClass(@Body() req:any){
    //   return this.classFieldService.addGameFieldsToClass(req);
    // }
}
