import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from './game.entity';
import { Field } from 'src/field/field.entity';
import { FieldService } from 'src/field/field.service';
import { ImageService } from '@hilma/fileshandler-typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), TypeOrmModule.forFeature([Field])],
  controllers: [GameController],
  providers: [GameService, FieldService],
})
export class GameModule {}
