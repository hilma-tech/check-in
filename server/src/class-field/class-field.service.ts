import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassField } from './class-field.entity';

@Injectable()
export class ClassFieldService {
  constructor(
    @InjectRepository(ClassField)
    private classFieldRepository: Repository<ClassField>,
  ) {}

  async addGameFieldsToClass(@Body() req: any) {
      let eek = new ClassField;
    return "hoi";
  }
}
