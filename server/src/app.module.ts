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
import { ClassFieldController } from './class-field/class-field.controller';
import { ClassFieldService } from './class-field/class-field.service';
import { ClassFieldModule } from './class-field/class-field.module';
import { JwtStrategy, RoleModule, UserModule, USER_MODULE_OPTIONS } from '@hilma/auth-nest';

@Module({
  imports: [
    GameModule,
    TypeOrmModule.forRoot(),
    SuperAdminModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    FieldModule,
    FilesHandlerModule.register({folder: "../../filesHandlerUploads", autoAllow: true}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client/build'),
    }),
    StudentModule,
    SchoolModule,
    TeacherModule,
    ClassroomModule,
    ClassFieldModule,
    UserModule, RoleModule
  ],
  controllers: [AppController],
  providers: [AppService,
    JwtStrategy,
    {
      provide: USER_MODULE_OPTIONS,
      useValue: {},
    }],
})
export class AppModule {}
