import { Body, Controller, Post } from '@nestjs/common';
import { FieldDto } from './field.dto';
import { Field } from './field.entity';
import { FieldService } from './field.service';

@Controller('api/field')
export class FieldController {
    constructor(private fieldService: FieldService) {}
}
