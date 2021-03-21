import {
  IsBoolean,
  IsDefined,
  IsEnum,
  isNumber,
  IsNumber,
  IsNumberString,
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
  @Matches(/^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/)
  game_name: string;

  @IsDefined()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  image: ImageDto;
  
  @Length(0, 255)
  @Matches(/^$|^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/)
  description: string;

  @Length(0, 255)
  @Matches(/^$|^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/)
  requirements: string;

  @Length(0, 255)
  @Matches(/^$|(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi)
  gameLink: string

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
  @IsString()
  @IsNumberString()
  gamesLength: string;
}

export class GameIdDto {
  @IsDefined()
  @IsString()
  @IsNumberString()
  id: string;
}

export class GetGameDto {
  @IsDefined()
  @IsNumber()
  skipON: number;

  @IsDefined()
  @IsNumber()
  numOfGames: number;
}

export class ClassroomIdDto {
  @IsDefined()
  @IsString()
  @IsNumberString()
  classId: string;
  @IsDefined()
  @IsString()
  @IsNumberString()
  dataLength: string;
}

export class showGameDto {
  @IsDefined()
  @IsString()
  @IsNumberString()
  game_id: string;

  @IsDefined()
  @IsString()
  @IsNumberString()
  classroom_id: string;
}

export class IdeDto { 
  @IsDefined()
  @IsString()
  @IsNumberString()
  id: string
 }

 export class DeleteGameIdDto {
   @IsDefined()
   @IsNumber()
   Id: number
 }

 
