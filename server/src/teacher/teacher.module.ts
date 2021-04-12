import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import {
  RoleModule,
  UserModule,
  USER_MODULE_OPTIONS,
  NodeMailerService,
} from '@hilma/auth-nest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Teacher } from './teacher.entity';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { SchoolService } from 'src/school/school.service';
import { SchoolModule } from 'src/school/school.module';
@Module({
  imports: [
    UserModule,
    RoleModule,
    ClassroomModule,
    SchoolModule,
    TypeOrmModule.forFeature([Teacher]),
    JwtModule.register({}),
  ],
  providers: [
    {
      provide: 'UserService',
      useExisting: TeacherService,
    },
    TeacherService,
    {
      provide: USER_MODULE_OPTIONS,
      useValue: { emailVerification: true},
    },
    {
      provide: "MailService",
      useClass: NodeMailerService
    },
  ],
  exports: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule { }
