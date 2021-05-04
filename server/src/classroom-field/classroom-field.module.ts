import { forwardRef, Module } from '@nestjs/common';
import { ClassroomFieldService } from './classroom-field.service';
import { ClassroomFieldController } from './classroom-field.controller';
import { RoleModule, UserModule } from '@hilma/auth-nest';
import { FieldModule } from 'src/field/field.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomField } from './classroom-field.entity';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    FieldModule,
    forwardRef(() => GameModule),
    TypeOrmModule.forFeature([ClassroomField]),
  ],
  providers: [ClassroomFieldService],
  controllers: [ClassroomFieldController],
  exports: [ClassroomFieldService],
})
export class ClassroomFieldModule {}
