import { IsDefined, IsNumberString, IsString } from 'class-validator';

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
