import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { GameService } from 'src/game/game.service';
import { FieldController } from './field.controller';
import { Field } from './field.entity';
import { FieldService } from './field.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, USER_MODULE_OPTIONS } from '@hilma/auth-nest';
import { SuperAdminService } from 'src/super-admin/super-admin.service';
import { SuperAdmin } from 'src/super-admin/super-admin.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Field]),TypeOrmModule.forFeature([SuperAdmin]),JwtModule.register({}), TypeOrmModule.forFeature([Game])],
  controllers: [FieldController],
  providers: [FieldService, GameService, JwtStrategy,
    {
      provide: 'UserService',
      useExisting: SuperAdminService,
    },
    SuperAdminService,
    {
      provide: USER_MODULE_OPTIONS,
      useValue: {},
    },]
})
export class FieldModule {}
