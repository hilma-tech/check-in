import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from './field.entity';

@Injectable()
export class FieldService {
    constructor(
        @InjectRepository(Field)
        private gameRepository: Repository<Field>
      ) {}
}
