import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
// import { GameModule } from 'src/game/game.module';
import { FieldController } from './field.controller';
import { Field } from './field.entity';
import { FieldService } from './field.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@hilma/auth-nest';

@Module(
  {
    imports: [
      TypeOrmModule.forFeature([Field]), 
    UserModule, 
    JwtModule.register({})],
    controllers: [FieldController],

    providers: [FieldService],
    exports: [FieldService]
  })
export class FieldModule { }
