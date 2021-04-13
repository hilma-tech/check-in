import { forwardRef, Module } from '@nestjs/common';
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
import { ClassroomService } from 'src/classroom/classroom.service';

@Module({
  imports: [
    UserModule,
    RoleModule,
    TypeOrmModule.forFeature([Teacher]),
    JwtModule.register({}),
    forwardRef(() => ClassroomModule),
  ],
  providers: [
    {
      provide: 'UserService',
      useExisting: TeacherService,
    },
    TeacherService,
    {
      provide: USER_MODULE_OPTIONS,
      useValue: { emailVerification: true },
    },
    {
      provide: "MailService",
      useClass: NodeMailerService
    }
  ],
  exports: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule { }
