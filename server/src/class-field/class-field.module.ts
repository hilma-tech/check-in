import { RoleModule, UserModule } from '@hilma/auth-nest';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from 'src/game/game.module';
import { ClassFieldController } from './class-field.controller';
import { ClassField } from './class-field.entity';
import { ClassFieldService } from './class-field.service';

@Module({
    imports: [
      UserModule,
      RoleModule,
      GameModule,
      TypeOrmModule.forFeature([ClassField]),
    ],
    providers: [ClassFieldService],
    controllers: [ClassFieldController],
    exports: [ClassFieldService]
  })
export class ClassFieldModule {}
