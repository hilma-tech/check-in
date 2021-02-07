import {
    IsDefined,
    IsNumber,
    IsString,
    Length,
    Matches,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ClassroomIdDto {
    @IsDefined()
    @IsString()
    classId: string;

    @IsDefined()
    @IsString()
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
    classesLength: string;
  }