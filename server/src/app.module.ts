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
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`]
    }),
    GameModule,
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.DB_HOST,
      "port": 3306,
      "username": process.env.DB_USER,
      "password": process.env.DB_PWD,
      "database": (console.log(process.env.DB_NAME, process.env.NODE_ENV), process.env.DB_NAME),
      "entities": [
        "node_modules/@hilma/auth-nest/dist/**/*.entity{.ts,.js}",
        "dist/**/*.entity{.ts,.js}",
        "node_modules/@hilma/fileshandler-typeorm/**/*.entity.{ts,js}",
      ],
      "synchronize": true,
      "ssl": true
      // "logging": true
    
    }),
    FieldModule,
    FilesHandlerModule.register({
      folder: '../../filesHandlerUploads',
      autoAllow: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client/build'),
    }),
    ClassroomModule,
    TeacherModule,
    SuperAdminModule,
    StudentModule,
    SchoolModule,
    RoleModule,
    ClassroomFieldModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
