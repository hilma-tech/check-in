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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StudentModule } from './student/student.module';
import { SchoolModule } from './school/school.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassroomModule } from './classroom/classroom.module';
import { RoleModule, UserModule } from '@hilma/auth-nest';
import { ClassroomFieldModule } from './classroom-field/classroom-field.module';

@Module({
  imports: [
    GameModule,
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    FieldModule,
    FilesHandlerModule.register({
      folder: '../../filesHandlerUploads',
      autoAllow: true,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../', 'client/build'),
    // }),
    TeacherModule,
    SuperAdminModule,
    StudentModule,
    UserModule,
    SchoolModule,
    ClassroomModule,
    RoleModule,
    ClassroomFieldModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
