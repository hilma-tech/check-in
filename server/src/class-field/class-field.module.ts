import { RoleModule, UserModule } from '@hilma/auth-nest';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldModule } from 'src/field/field.module';
import { ClassFieldController } from './class-field.controller';
import { ClassField } from './class-field.entity';
import { ClassFieldService } from './class-field.service';

@Module({
    imports: [
      UserModule,
      RoleModule,
      FieldModule,
      TypeOrmModule.forFeature([ClassField]),
    ],
    providers: [ClassFieldService],
    controllers: [ClassFieldController],
    exports: [ClassFieldService]
  })
export class ClassFieldModule {}
