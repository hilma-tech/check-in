import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { JwtModule } from "@nestjs/jwt";

import {School} from './school.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([School])
  ],
  providers: [
    SchoolService,
  ],
  controllers: [SchoolController]
})
export class SchoolModule {}
