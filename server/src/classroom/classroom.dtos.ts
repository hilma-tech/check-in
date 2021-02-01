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
    @IsNumber()
    classId: number;
}

export class ClassroomGameDto {
    @IsDefined()
    @IsNumber()
    classId: number;
    @IsDefined()
    @IsNumber()
    gameId: number;
}