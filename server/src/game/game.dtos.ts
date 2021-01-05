import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GameType } from 'src/field/game.type.enum';
export class ImageDto {
  @IsDefined()
  @IsNumber()
  id: number;
  @IsDefined()
  @IsString()
  value: string;
}

export class FieldValueDto {
  @IsDefined()
  @IsNumber()
  id: number;
  @IsDefined()
  @IsString()
  value: string;
}

export class GameSaveDto {
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/^[\u0590-\u05FFa-zA-Z0-9 /s]+$/)
  game_name: string;

  @IsDefined()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  image: ImageDto;

  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/)
  description: string;

  @Length(0, 255)
  @Matches(/^$|^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/)
  requirements: string;
  @IsDefined()
  @IsBoolean()
  suspended: boolean;
}

export class FieldArrDto {
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/)
  name: string;
  @IsDefined()
  @IsEnum(GameType)
  selection: GameType;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FieldValueDto)
  value: FieldValueDto[];
  @IsDefined()
  @IsNumber()
  order: number;
}

export class GameSaveReq {
  @IsDefined()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => GameSaveDto)
  game: GameSaveDto;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FieldArrDto)
  field: [
    {
      name: string;
      selection: string;
      value: [{ id: number; value: string }];
      order: number;
    },
  ];
}

export class GetGameSkip {
  @IsDefined()
  @IsNumber()
  gamesLength: number;
}