import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { Game } from "./game.entity";
import { Field } from "src/field/field.entity";
import { FieldService } from "src/field/field.service";
import { ImageService } from "@hilma/fileshandler-typeorm";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy, USER_MODULE_OPTIONS } from "@hilma/auth-nest";
import { SuperAdminService } from "src/super-admin/super-admin.service";
import { SuperAdmin } from "src/super-admin/super-admin.entity";
import { FieldModule } from "src/field/field.module";
import { UserModule } from '@hilma/auth-nest';
@Module({
  imports: [
    JwtModule.register({}),
    FieldModule,
    UserModule,
    TypeOrmModule.forFeature([Game]),
  ],
  controllers: [GameController],
  providers: [GameService],
  exports:[GameService]
})
export class GameModule {}
