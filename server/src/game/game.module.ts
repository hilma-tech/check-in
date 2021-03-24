import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from './game.entity';
import { FieldModule } from 'src/field/field.module';
import { UserModule } from '@hilma/auth-nest';
import { ClassroomFieldModule } from "src/classroom-field/classroom-field.module";
import { PermissionModule } from 'src/permission/permission.module';
@Module({
  imports: [
    FieldModule,
    UserModule,
    ClassroomFieldModule,
    TypeOrmModule.forFeature([Game]),
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
