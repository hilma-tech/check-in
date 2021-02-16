import { IsDefined, IsNumberString, IsString } from 'class-validator';

export class GetTeacherSkip {
  @IsDefined()
  @IsString()
  @IsNumberString()
  teachersLength: string;
}

export class GetClassSkip {
  @IsDefined()
  @IsString()
  @IsNumberString()
  classesLength: string;
}

export class TeacherIdDto {
  @IsDefined()
  @IsString()
  teacherId: string;
}
