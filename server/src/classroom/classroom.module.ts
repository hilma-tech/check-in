import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule, UserModule } from '@hilma/auth-nest';
import { ClassroomController } from './classroom.controller';
import { Classroom } from './classroom.entity';
import { ClassroomService } from './classroom.service';
import { GameModule } from 'src/game/game.module';
import { ClassroomFieldModule } from 'src/classroom-field/classroom-field.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { TeacherService } from 'src/teacher/teacher.service';

@Module({
  imports: [
    UserModule,
    RoleModule,
    forwardRef(() => GameModule),
    ClassroomFieldModule,
    TypeOrmModule.forFeature([Classroom]),
    forwardRef(() => TeacherModule),
  ],
  providers: [ClassroomService,
  ],
  controllers: [ClassroomController],
  exports: [ClassroomService],
})
export class ClassroomModule {}
