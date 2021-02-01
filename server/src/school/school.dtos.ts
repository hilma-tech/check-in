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

export class GetSchoolSkip {
    @IsDefined()
    @IsNumber()
    schoolsLength: number;
  }