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
    @IsString()
    schoolsLength: string;
  }

  export class SchoolIdDto {
    @IsDefined()
    @IsString()
    schoolId: string;
  }