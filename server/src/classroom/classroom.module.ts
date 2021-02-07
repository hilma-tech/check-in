import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { RoleModule, UserModule } from '@hilma/auth-nest';
import { ClassroomController } from './classroom.controller';
import { Classroom } from './classroom.entity';
import { ClassroomService } from './classroom.service';
import { GameModule } from 'src/game/game.module';
import { ClassFieldService } from 'src/class-field/class-field.service';
import { ClassFieldModule } from 'src/class-field/class-field.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    GameModule,
    TypeOrmModule.forFeature([Classroom]),
    ClassFieldModule
  ],
  providers: [ClassroomService],
  controllers: [ClassroomController],
  exports:[ClassroomService]
})
export class ClassroomModule {}
