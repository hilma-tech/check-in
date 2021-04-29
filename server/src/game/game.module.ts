import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from './game.entity';
import { FieldModule } from 'src/field/field.module';
import { RoleModule, User, UserModule } from '@hilma/auth-nest';
import { ClassroomFieldModule } from "src/classroom-field/classroom-field.module";
import { PermissionModule } from 'src/permission/permission.module';
import { TeacherModule } from 'src/teacher/teacher.module';
@Module({
  imports: [
    FieldModule,
    UserModule,
    ClassroomFieldModule,
    forwardRef(() => TeacherModule),
    TypeOrmModule.forFeature([Game, User]),
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
