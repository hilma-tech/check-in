import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsObject,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
export class ImageDto {
  @IsDefined()
  @IsNumber()
  id: number;
  @IsDefined()
  value: any; //! CHANGE THIS
}

export class FieldValueDto {
  @IsDefined()
  @IsNumber()
  id: number;
  @IsDefined()
  @IsString()
  // @Length(1, 30)
  value: string;
}

export class GameSaveDto {
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/[\u0590-\u05FF]/)
  game_name: string;

  @IsDefined()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  image: ImageDto;
  @IsDefined()
  @IsString()
  @Length(1, 260)
  description: string;
  @IsDefined()
  @IsString()
  @Length(1, 260)
  requirements: string;
  @IsDefined()
  @IsBoolean()
  suspended: boolean;
}

export class FieldArrDto {
  @IsDefined()
  @IsString()
  @Length(1, 30)
  name: string;
  @IsDefined()
  @IsString()
  @Length(1, 30)
  selection: string;
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
