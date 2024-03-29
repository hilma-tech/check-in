import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsDefined,
  IsEmail,
  isNumber,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

export class EmailDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string
}

export class StringDto {
  @IsDefined()
  @IsString()
  token: string
}

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
  @IsUUID()
  teacherId: string;
}

export class TeacherRegisterDto {
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/^[A-Za-z\u0590-\u05EA"'-\s]+$/)
  first_name: string;
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/^[A-Za-z\u0590-\u05EA"'-\s]+$/)
  last_name: string;
  @IsDefined()
  @IsNumber()
  school_id: number;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => TeacherFieldsDataDto)
  fields_data: TeacherFieldsDataDto[];
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;
  @IsDefined()
  @IsString()
  @Length(8, 15)
  @Matches(/^[A-Za-z\u0590-\u05EA0-9!@#$"%^,.&*()_+=[\]{}'-;:\\|<>/?~`]+$/)
  password: string;
  @IsDefined()
  @IsString()
  @IsBooleanString()
  rakaz: string;
}

export class TeacherFieldsDataDto {
  @IsDefined()
  @IsNumber()
  id: number;
  @IsDefined()
  @IsString()
  value: string;
  @IsDefined()
  @IsNumber()
  classId: number;
}

export class PassAndTokenDto {
  @IsDefined()
  @IsString()
  @Length(8, 15)
  password: string
  @IsDefined()
  @IsString()
  token: string
}

export class TeacherValDto {
  @IsDefined()
  @IsString()
  val: string;
}

export class TeacherEditClassesDto {
  @IsDefined()
  @IsNumber()
  id: number;
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/[A-Za-z\u0590-\u05EA0-9"'-\s]/)
  name: string;
}

export class EditTeacherDto {
  @IsDefined()
  @IsString()
  @IsUUID()
  id: string;
  @IsDefined()
  @IsString()
  @IsEmail()
  username: string;
  @IsOptional()
  @IsString()
  password: string;
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/^[A-Za-z\u0590-\u05EA"'-\s]+$/)
  firstName: string;
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/^[A-Za-z\u0590-\u05EA"'-\s]+$/)
  lastName: string;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => TeacherEditClassesDto)
  classrooms: TeacherEditClassesDto[];
  @IsDefined()
  @IsNumber()
  schoolId: number;
}

