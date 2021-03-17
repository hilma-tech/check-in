import {
  RoleModule,
  UserModule,
  USER_MODULE_OPTIONS
} from '@hilma/auth-nest';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdminController } from './super-admin.controller';
import { SuperAdmin } from './super-admin.entity';
import { SuperAdminService } from './super-admin.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    RoleModule,
    TypeOrmModule.forFeature([SuperAdmin]),
    JwtModule.register({}),
  ],
  providers: [
    {
      provide: 'UserService',
      useExisting: SuperAdminService,
    },
    SuperAdminService,
    {
      provide: USER_MODULE_OPTIONS,
      useValue: {},
    },
  ],
  exports: [SuperAdminService],
  controllers: [SuperAdminController],
})
export class SuperAdminModule {}
