import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import {FilesHandlerModule} from '@hilma/fileshandler-server'
// import { UserModule } from '@hilma/auth-nest';


@Module({
  imports: [/*FilesHandlerModule.register({
    folder: "../../filesHandlerUploads"
    }),*/ GameModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
