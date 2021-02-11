import {
  IsDefined,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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

export class ClassroomGameDto {
  @IsDefined()
  @IsNumber()
  classId: number;
  @IsDefined()
  @IsNumber()
  gameId: number;
}

export class GetClassSkip {
  @IsDefined()
  @IsString()
  @IsNumberString()
  classesLength: string;
}
