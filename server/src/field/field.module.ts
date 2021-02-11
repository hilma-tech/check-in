import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldController } from './field.controller';
import { Field } from './field.entity';
import { FieldService } from './field.service';
import { UserModule } from '@hilma/auth-nest';

@Module({
  imports: [TypeOrmModule.forFeature([Field]), UserModule],
  controllers: [FieldController],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule {}
