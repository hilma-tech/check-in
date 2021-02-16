import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule, UserModule } from '@hilma/auth-nest';
import { ClassroomController } from './classroom.controller';
import { Classroom } from './classroom.entity';
import { ClassroomService } from './classroom.service';
import { GameModule } from 'src/game/game.module';
import { ClassroomFieldModule } from 'src/classroom-field/classroom-field.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    GameModule,
    ClassroomFieldModule,
    TypeOrmModule.forFeature([Classroom]),
  ],
  providers: [ClassroomService],
  controllers: [ClassroomController],
  exports: [ClassroomService],
})
export class ClassroomModule {}
