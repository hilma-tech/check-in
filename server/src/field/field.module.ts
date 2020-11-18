import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { GameService } from 'src/game/game.service';
import { FieldController } from './field.controller';
import { Field } from './field.entity';
import { FieldService } from './field.service';

@Module({
  imports: [TypeOrmModule.forFeature([Field]), TypeOrmModule.forFeature([Game])],
  controllers: [FieldController],
  providers: [FieldService, GameService]
})
export class FieldModule {}
