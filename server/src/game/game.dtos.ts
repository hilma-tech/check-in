import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsInstance,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Matches,
} from 'class-validator';
export class ImageDto {
  @IsDefined()
  @IsNumber()
  @IsPositive()
  id: number;
  value: any;
}

export class GameSaveDto {
  @IsDefined()
  @IsString()
  @Length(4, 20)
  @Matches(/[\u0590-\u05FF]{4,20}/)
  game_name: string;

  @IsDefined()
  @IsInstance(ImageDto)
  image: {
    id: number;
    value: any;
  };
  @IsDefined()
  @IsString()
  @Length(4, 150)
  description: string;
  @IsDefined()
  @IsString()
  @Length(4, 150)
  requirements: string;
  @IsDefined()
  @IsBoolean()
  suspended: boolean;
}

export class FieldArrDto {
  @IsDefined()
  @IsString()
  @Length(4, 50)
    name: string;
    @IsDefined()
  @IsString()
  @Length(4, 50)
    selection: string;
    @IsDefined()
  @IsArray()
    value: [{ id: number; value: string }];
    @IsDefined()
    @IsNumber()
    @IsPositive()
    order: number;
}

export class GameSaveReq {
  @IsDefined()
  @IsInstance(GameSaveDto)
  game: GameSaveDto;

  @IsDefined()
  @IsInstance(FieldArrDto)
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
  @IsString()
  gamesLength: number;
}
