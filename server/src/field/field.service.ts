import { Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from './field.entity';

@Injectable()
export class FieldService {
    constructor(
        @InjectRepository(Field)
        private gameRepository: Repository<Field>
      ) {}

      async getGamefileds(@Body() gameId: number) {
        let fields = await this.gameRepository.find({where: {game_id: gameId}})
        return fields
      }
      
}
