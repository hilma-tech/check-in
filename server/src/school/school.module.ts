import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy, USER_MODULE_OPTIONS } from "@hilma/auth-nest";
import {School} from './school.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperAdminModule } from 'src/super-admin/super-admin.module';
import { SuperAdminService } from "src/super-admin/super-admin.service";

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([School]),
    SuperAdminModule
  ],
  providers: [
    SchoolService,
    JwtStrategy,
    {
      provide: "UserService",
      useExisting: SuperAdminService
    },
    {
      provide: USER_MODULE_OPTIONS,
      useValue: {}
    }
  ],
  controllers: [SchoolController]
})
export class SchoolModule {}
