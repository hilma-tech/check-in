import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { RoleModule, UserModule, JwtStrategy, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import {Student} from './student.entity'
import { School } from 'src/school/school.entity';

@Module({
  imports: [UserModule, RoleModule, TypeOrmModule.forFeature([Student]), JwtModule.register({})],
  providers: [
    JwtStrategy,
    {
      provide:"UserService",
      useExisting: StudentService
    },
    StudentService,
    {
      provide: USER_MODULE_OPTIONS,
      useValue: {},
    }],
    exports: [StudentService],
    controllers: [StudentController],
})
export class StudentModule {}
