import {
    IsBoolean,
    IsDefined,
    IsEnum,
    IsNumber,
    IsNumberString,
    IsObject,
    IsString,
    Length,
    Matches,
    ValidateNested,
  } from 'class-validator';

export class GetSchoolSkip {
    @IsDefined()
    @IsString()
    @IsNumberString()
    schoolsLength: string;
  }

  export class SchoolIdDto {
    @IsDefined()
    @IsString()
    @IsNumberString()
    schoolId: string;
  }