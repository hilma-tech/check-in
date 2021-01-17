import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { RoleModule, UserModule } from '@hilma/auth-nest';
import { ClassroomController } from './classroom.controller';
import { Classroom } from './classroom.entity';
import { ClassroomService } from './classroom.service';

@Module({
  imports: [
    UserModule,
    RoleModule,
    TypeOrmModule.forFeature([Classroom]),
    TypeOrmModule.forFeature([Game]),
  
  ],
  providers: [ClassroomService],
  controllers: [ClassroomController]
})
export class ClassroomModule {}
