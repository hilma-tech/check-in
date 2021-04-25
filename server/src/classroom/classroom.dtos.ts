import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GameType } from 'src/field/game.type.enum';

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

export class RemoveClassroomGameDto {
  @IsDefined()
  @IsNumber()
  classId: number;
  @IsDefined()
  @IsNumber()
  gameId: number;
}

export class ClassroomGameDto {
  @IsDefined()
  @IsNumber()
  classId: number;
  @IsDefined()
  @IsNumber()
  gameId: number;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ClassroomFieldsDataDto)
  fieldsData: ClassroomFieldsDataDto[];
}

export class ErrorMessDto {
  @IsDefined()
  @IsString()
  mess: string
}

export class ValueArrayDto {
  @IsDefined()
  @IsNumber()
  id: number
  @IsDefined()
  @IsString()
  value: string
}

export class ClassroomFieldsDataDto {
  @IsDefined()
  @IsNumber()
  id: number;
  @IsDefined()
  @IsString()
  field_name: string;
  @IsDefined()
  @IsEnum(GameType)
  type: GameType;
  @IsDefined()
  @IsString()
  default_value: string;
  @IsDefined()
  @IsNumber()
  order: number;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ValueArrayDto)
  value: ValueArrayDto[];
  @IsDefined()
  @IsString()
  name: string;
  @IsDefined()
  @IsEnum(GameType)
  selection: GameType;
  @IsDefined()
  errorMessage: ErrorMessDto;
}

export class GetClassSkip {
  @IsDefined()
  @IsString()
  @IsNumberString()
  classesLength: string;
}
