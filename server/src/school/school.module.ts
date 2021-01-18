import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, RoleModule, UserModule, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { School } from './school.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([School]), UserModule],
  providers: [SchoolService],
  controllers: [SchoolController],
})
export class SchoolModule {}
