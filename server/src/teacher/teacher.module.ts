import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import {
  RoleModule,
  UserModule,
  JwtStrategy,
  USER_MODULE_OPTIONS,
} from '@hilma/auth-nest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Teacher } from './teacher.entity';
@Module({
  imports: [
    UserModule,
    RoleModule,
    TypeOrmModule.forFeature([Teacher]),
    JwtModule.register({}),
  ],
  providers: [
    JwtStrategy,
    {
      provide: 'UserService',
      useExisting: TeacherService,
    },
    TeacherService,
    {
      provide: USER_MODULE_OPTIONS,
      useValue: {},
    },
  ],
  exports: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {}
