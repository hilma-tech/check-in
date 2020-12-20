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

const {mustValid} = require("../server-tools/serverValidate")


mustValid('hello');
@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([Field]),
    TypeOrmModule.forFeature([SuperAdmin]),
    // mustValid
  ],
  controllers: [GameController],
  providers: [
    GameService,
    FieldService,
    JwtStrategy,
    {
      provide: "UserService",
      useExisting: SuperAdminService
    },
    SuperAdminService,
    {
      provide: USER_MODULE_OPTIONS,
      useValue: {}
    }
  ]
})
export class GameModule {}
