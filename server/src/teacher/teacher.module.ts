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
import { SchoolModule } from 'src/school/school.module';
import { GameModule } from 'src/game/game.module';
@Module({
  imports: [
    UserModule,
    RoleModule,
    forwardRef(() => SchoolModule),
    TypeOrmModule.forFeature([Teacher]),
    JwtModule.register({}),
    forwardRef(() => ClassroomModule),
    forwardRef(() => GameModule)
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
