import { UserModule } from '@hilma/auth-nest';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdmin } from 'src/super-admin/super-admin.entity';
import { ClassController } from './class.controller';
import { Classs } from './class.entity';
import { ClassService } from './class.service';
import { JwtModule } from "@nestjs/jwt";
import { Game } from 'src/game/game.entity';

@Module({
  imports: [
    JwtModule.register({}),
    UserModule,
    TypeOrmModule.forFeature([Classs]),
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([SuperAdmin]),
  
  ],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
