import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from './game.entity';
import { FieldModule } from 'src/field/field.module';
import { UserModule } from '@hilma/auth-nest';
@Module({
  imports: [FieldModule, UserModule, TypeOrmModule.forFeature([Game])],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
