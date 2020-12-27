import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { Classroom } from './classroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { SuperAdmin } from 'src/super-admin/super-admin.entity';
import { RoleModule, UserModule } from '@hilma/auth-nest';
import { JwtModule } from "@nestjs/jwt";


@Module({
  imports: [
    JwtModule.register({}),
    UserModule,
    RoleModule,
    TypeOrmModule.forFeature([Classroom]),
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([SuperAdmin]),
  
  ],
  providers: [ClassroomService],
  controllers: [ClassroomController]
})
export class ClassroomModule {}
