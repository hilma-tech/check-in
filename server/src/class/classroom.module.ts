import { RoleModule, UserModule } from '@hilma/auth-nest';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdmin } from 'src/super-admin/super-admin.entity';
import { ClassroomController } from './classroom.controller';
import { Classroom } from './classroom.entity';
import { ClassroomService } from './classroom.service';
import { JwtModule } from "@nestjs/jwt";
import { Game } from 'src/game/game.entity';

@Module({
  imports: [
    JwtModule.register({}),
    UserModule,
    RoleModule,
    TypeOrmModule.forFeature([Classroom]),
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([SuperAdmin]),
  
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService]
})
export class ClassroomModule {}
