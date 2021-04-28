import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import {
  RoleModule,
  User,
  UserModule,
  USER_MODULE_OPTIONS,
} from '@hilma/auth-nest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Student } from './student.entity';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { GameModule } from 'src/game/game.module';
import { SchoolModule } from 'src/school/school.module';
import { FieldModule } from 'src/field/field.module';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  imports: [
    SchoolModule,
    UserModule,
    RoleModule,
    GameModule,
    PermissionModule,
    ClassroomModule,
    FieldModule,
    TypeOrmModule.forFeature([Student, User]),
    JwtModule.register({}),
  ],
  providers: [
    {
      provide: 'UserService',
      useExisting: StudentService,
    },
    StudentService,
    {
      provide: USER_MODULE_OPTIONS,
      useValue: {},
    },
  ],
  exports: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
