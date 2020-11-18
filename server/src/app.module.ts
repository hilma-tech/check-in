import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FilesHandlerModule} from '@hilma/fileshandler-server'
// import { SuperAdminModule } from './super-admin/super-admin.module';
// import { FieldModule } from './field/field.module';
import configuration from './config/configuration'
import { ConfigModule } from '@nestjs/config';
import { FieldModule } from './field/field.module';
import { SuperAdminModule } from './super-admin/super-admin.module';


@Module({
  imports: [/*FilesHandlerModule.register({
    folder: "../../filesHandlerUploads"
    }),*/ GameModule, TypeOrmModule.forRoot()],
    //  SuperAdminModule, 
    //  ConfigModule.forRoot({ load: [configuration], isGlobal: true }), FieldModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
