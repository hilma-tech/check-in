import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { FieldModule } from './field/field.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { FilesHandlerModule } from '@hilma/fileshandler-typeorm';

@Module({
  imports: [
    GameModule,
    TypeOrmModule.forRoot(),
    SuperAdminModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    FieldModule,
    FilesHandlerModule.register({folder: "../../filesHandlerUploads", autoAllow: true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
