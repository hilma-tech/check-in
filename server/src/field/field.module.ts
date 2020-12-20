import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
// import { GameModule } from 'src/game/game.module';
import { FieldController } from './field.controller';
import { Field } from './field.entity';
import { FieldService } from './field.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { SuperAdminService } from 'src/super-admin/super-admin.service';
import { SuperAdmin } from 'src/super-admin/super-admin.entity';
import { GameModule } from 'src/game/game.module';
import { SuperAdminModule } from 'src/super-admin/super-admin.module';

@Module(
  {
    imports: [
      TypeOrmModule.forFeature([Field]), 
    SuperAdminModule, 
    JwtModule.register({})],
    controllers: [FieldController],

    providers: [
      FieldService, JwtStrategy,
      {
        provide: 'UserService',
        useExisting: SuperAdminService,
      },
     ],
    exports: [FieldService]
  })
export class FieldModule { }
