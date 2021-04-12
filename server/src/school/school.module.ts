import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { UserModule } from '@hilma/auth-nest';
import { School } from './school.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomService } from 'src/classroom/classroom.service';
import { ClassroomModule } from 'src/classroom/classroom.module';

@Module({
  imports: [TypeOrmModule.forFeature([School]), ClassroomModule, UserModule],
  providers: [SchoolService],
  controllers: [SchoolController],
  exports: [SchoolService],
})
export class SchoolModule {}
