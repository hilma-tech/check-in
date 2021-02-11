import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { Game } from "./game.entity";
import { ImageService } from "@hilma/fileshandler-typeorm";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy, USER_MODULE_OPTIONS } from "@hilma/auth-nest";
import { SuperAdminService } from "src/super-admin/super-admin.service";
import { SuperAdmin } from "src/super-admin/super-admin.entity";
import { FieldModule } from "src/field/field.module";
import { UserModule } from '@hilma/auth-nest';
import { ClassroomFieldModule } from "src/classroom-field/classroom-field.module";
@Module({
  imports: [
    FieldModule,
    UserModule,
    ClassroomFieldModule,
    TypeOrmModule.forFeature([Game]),
  ],
  controllers: [GameController],
  providers: [
    GameService,
  ],
  exports:[GameService]
})
export class GameModule {}
